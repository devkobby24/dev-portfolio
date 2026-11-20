"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createSiteStar, type SiteStar } from "@sitestar/sdk";

export type SiteStarConnection =
  | { status: "starting" }
  | { status: "ready"; sitestar: SiteStar }
  | { status: "failed" };

const SiteStarContext = createContext<SiteStarConnection | null>(null);

/**
 * Starts the Site Star SDK once per page and shares the instance with the
 * components that need it. It starts in an effect, never during the static
 * export: the SDK talks to /api/v1 on the page's own origin, which only exists
 * once Site Star serves the files. From the moment it resolves, pageviews and
 * uncaught errors are reported with no further code.
 */
const SiteStarProvider = ({ children }: { children: ReactNode }) => {
  const [connection, setConnection] = useState<SiteStarConnection>({
    status: "starting",
  });

  useEffect(() => {
    let isMounted = true;

    // createSiteStar() hands back the page's one instance on every call, so
    // Strict Mode's second effect run shares the first run's startup.
    createSiteStar().then(
      (sitestar) => {
        if (isMounted) {
          setConnection({ status: "ready", sitestar });
        }
      },
      (startupError: unknown) => {
        console.error("[Site Star] The SDK failed to start", startupError);
        if (isMounted) {
          setConnection({ status: "failed" });
        }
      }
    );

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SiteStarContext.Provider value={connection}>
      {children}
    </SiteStarContext.Provider>
  );
};

export const useSiteStar = (): SiteStarConnection => {
  const connection = useContext(SiteStarContext);
  if (connection === null) {
    throw new Error("useSiteStar() must be called inside <SiteStarProvider>.");
  }
  return connection;
};

export default SiteStarProvider;
