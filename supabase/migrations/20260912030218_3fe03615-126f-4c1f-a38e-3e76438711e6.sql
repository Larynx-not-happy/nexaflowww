DROP POLICY "Anyone can submit a contact message" ON public.contact_messages;
CREATE INDEX contact_messages_created_at_idx ON public.contact_messages (created_at);
CREATE OR REPLACE FUNCTION public.limit_contact_submissions() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  PERFORM pg_advisory_xact_lock(714628);
  IF EXISTS (SELECT 1 FROM public.contact_messages WHERE submission_id = NEW.submission_id) THEN
    RETURN NEW;
  END IF;
  IF (SELECT count(*) FROM public.contact_messages WHERE created_at > now() - interval '1 hour') >= 100 OR
     (SELECT count(*) FROM public.contact_messages WHERE lower(email) = lower(NEW.email) AND created_at > now() - interval '1 hour') >= 3 THEN
    RAISE EXCEPTION 'Contact submission limit reached' USING ERRCODE = 'P0001';
  END IF;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.limit_contact_submissions() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER limit_contact_submissions BEFORE INSERT ON public.contact_messages FOR EACH ROW EXECUTE FUNCTION public.limit_contact_submissions();