export const PORTAL_URL_KEY = "portal_associado_url";

/**
 * Portal do Associado link is managed in the admin panel (site_settings).
 * Returns the configured URL, or null when the admin left it empty
 * (the access point is then hidden everywhere on the site).
 */
export function getPortalUrl(
  settings: Record<string, string | null> | undefined | null
): string | null {
  const value = (settings?.[PORTAL_URL_KEY] ?? "").trim();
  return value.length > 0 ? value : null;
}
