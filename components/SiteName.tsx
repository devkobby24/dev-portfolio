"use client";

import { useSiteStar } from "./SiteStarProvider";

/**
 * The site's name as its owner set it in Site Star, read at runtime from the
 * platform rather than bundled. Renders nothing until the facts load, or when
 * the owner has not published a name.
 */
const SiteName = () => {
  const connection = useSiteStar();
  if (connection.status !== "ready") {
    return null;
  }

  const siteName = connection.sitestar.site.name;
  if (siteName === undefined) {
    return null;
  }

  return <p>Site Star &middot; {siteName}</p>;
};

export default SiteName;
