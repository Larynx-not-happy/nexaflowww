/** Basic consent mode: no Google connection before opt-in. */
export const CONSENT_STORAGE_KEY = "nexaflow.cookie-consent.v1";
export const CONSENT_EVENT = "nexaflow:consent-change";
export type ConsentValue = "accepted" | "rejected";
const MEASUREMENT_ID = import.meta.env["VITE_GA_MEASUREMENT_ID"] ?? "G-XXXXXXXXXX";
const configured = /^G-[A-Z0-9]+$/.test(MEASUREMENT_ID) && MEASUREMENT_ID !== "G-XXXXXXXXXX";
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
let loaded = false;
let consent: ConsentValue | null = null;
let lastPath = "";
export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    consent = stored === "accepted" || stored === "rejected" ? stored : null;
  } catch {
    /* Storage may be blocked; default to no consent. */
  }
  return consent;
}
function disableAnalytics(disabled: boolean) {
  Reflect.set(window, `ga-disable-${MEASUREMENT_ID}`, disabled);
}
export function setConsent(value: ConsentValue) {
  consent = value;
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    /* Session-only choice. */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
  if (value === "accepted") loadAnalytics();
  else {
    disableAnalytics(true);
    window.gtag?.("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    document.getElementById("nexaflow-ga")?.remove();
    clearAnalyticsCookies();
    // Unload Google's listeners too, so revocation stops automatic measurement.
    if (loaded) window.location.reload();
  }
}
export function loadAnalytics() {
  if (typeof window === "undefined" || loaded || !configured || getConsent() !== "accepted") return;
  loaded = true;
  disableAnalytics(false);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: window.location.origin + window.location.pathname,
    page_referrer: "",
  });
  trackPageView(window.location.pathname);
  const script = document.createElement("script");
  script.id = "nexaflow-ga";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}
function clearAnalyticsCookies() {
  const parts = window.location.hostname.split(".");
  const domains = parts.map((_, i) => parts.slice(i).join("."));
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name || !(name.startsWith("_ga") || name === "_gid")) continue;
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    for (const domain of domains)
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}; SameSite=Lax`;
  }
}
export function trackEvent(name: string, params: Record<string, string> = {}) {
  if (typeof window === "undefined" || !configured || getConsent() !== "accepted") return;
  // Callers pass only fixed labels, never form content, email or arbitrary query strings.
  window.gtag?.("event", name, params);
}
export function trackPageView(path: string) {
  if (!loaded || getConsent() !== "accepted" || path === lastPath) return;
  lastPath = path;
  window.gtag?.("event", "page_view", {
    page_path: path,
    page_location: window.location.origin + path,
    page_referrer: "",
    page_title: document.title,
  });
}
