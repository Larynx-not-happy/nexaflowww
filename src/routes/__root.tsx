import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CookieConsent } from "@/components/site/CookieConsent";
import { Toaster } from "@/components/ui/sonner";
import { trackPageView } from "@/lib/analytics";
import { NAV_LINKS, SITE } from "@/lib/site";

function NotFoundComponent() {
  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6">
      <title>Page not found | NexaFlow</title>
      <meta name="robots" content="noindex, follow" />
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Error 404</p>
      <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        The page you're looking for doesn't exist or has moved. Here are the places people usually
        need.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {[{ to: "/", label: "Home" }, ...NAV_LINKS].map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="panel block px-4 py-4 text-sm font-medium transition-colors hover:bg-secondary"
            >
              {link.label}
              <span className="mt-1 block text-xs font-normal text-muted-foreground">
                {SITE.url.replace("https://", "")}
                {link.to === "/" ? "" : link.to}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <main id="main" className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0a0a0a" },
      { name: "twitter:site", content: SITE.twitter },
      { property: "og:locale", content: "en_US" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&family=Space+Grotesk:wght@500;700&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.png", type: "image/png", sizes: "64x64" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
          logo: `${SITE.url}/favicon.png`,
          email: SITE.email,
          description: SITE.description,
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    trackPageView(pathname);
    document.querySelector('main')?.setAttribute('tabindex', '-1');
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <Header />
      {/* Required: nested routes render here. */}
      <Outlet />
      <Footer />
      <CookieConsent />
      <Toaster />
    </QueryClientProvider>
  );
}
