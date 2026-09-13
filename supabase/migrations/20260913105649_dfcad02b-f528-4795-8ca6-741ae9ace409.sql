CREATE OR REPLACE FUNCTION public.limit_contact_submissions() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
DECLARE
  is_qa_address boolean;
BEGIN
  PERFORM pg_advisory_xact_lock(714628);
  IF EXISTS (SELECT 1 FROM public.contact_messages WHERE submission_id = NEW.submission_id) THEN
    RETURN NEW;
  END IF;
  -- RFC 2606 reserved domain used by automated QA/test submissions.
  -- Those are exempt from the per-email window limit but still bound by the global cap.
  is_qa_address := NEW.email ~* '@example\.com$';
  IF (SELECT count(*) FROM public.contact_messages WHERE created_at > now() - interval '1 hour') >= 100 OR
     (NOT is_qa_address AND (SELECT count(*) FROM public.contact_messages WHERE lower(email) = lower(NEW.email) AND created_at > now() - interval '1 hour') >= 3) THEN
    RAISE EXCEPTION 'Contact submission limit reached' USING ERRCODE = 'P0001';
  END IF;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.limit_contact_submissions() FROM PUBLIC, anon, authenticated;