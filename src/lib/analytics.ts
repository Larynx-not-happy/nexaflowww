/**
 * Consent-gated GA4. Nothing is loaded or sent until the visitor accepts
 * analytics cookies. The measurement ID comes from configuration, never
 * hardcoded secrets.
 */
export const CONSENT_STORAGE_KEY = "nexaflow.cookie-consent.v1";
export const CONSENT_EVENT = "nexaflow:consent-change";

export type ConsentValue = "accepted" | "rejected";

const MEASUREMENT_ID =
  (import.meta.env["VITE_GA_MEASUREMENT_ID"] as string | undefined) ?? "G-XXXXXXXXXX";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let loaded = false;

export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return value === "accepted" || value === "rejected" ? value : null;
}

export function setConsent(value: ConsentValue) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
  if (value === "accepted") loadAnalytics();
  else clearAnalyticsCookies();
}

export function loadAnalytics() {
  if (typeof window === "undefined" || loaded) return;
  if (getConsent() !== "accepted") return;
  loaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: true,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

function clearAnalyticsCookies() {
  if (typeof document === "undefined") return;
  document.cookie
    .split(";")
    .map((c) => c.split("=")[0]?.trim())
    .filter((name): name is string => !!name && (name.startsWith("_ga") || name === "_gid"))
    .forEach((name) => {
      document.cookie = `${name}=; Max-Age=0; path=/`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${window.location.hostname}`;
    });
}

/** Fire a conversion/interaction event. No-ops without consent. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || getConsent() !== "accepted") return;
  window.gtag?.("event", name, params);
}

export function trackPageView(path: string) {
  if (typeof window === "undefined" || getConsent() !== "accepted") return;
  window.gtag?.("event", "page_view", { page_path: path, page_location: window.location.href });
}
