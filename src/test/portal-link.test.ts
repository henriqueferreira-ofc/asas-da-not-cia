import { describe, it, expect } from "vitest";
import { getPortalUrl, PORTAL_URL_KEY } from "@/lib/portal-link";

describe("Portal do Associado", () => {
  it("usa exatamente o link cadastrado pelo admin no banco", () => {
    expect(getPortalUrl({ [PORTAL_URL_KEY]: "https://aafab.com.br/" })).toBe(
      "https://aafab.com.br/"
    );
  });

  it("esconde o acesso quando o admin não preencheu o link", () => {
    expect(getPortalUrl({ [PORTAL_URL_KEY]: "" })).toBeNull();
    expect(getPortalUrl({ [PORTAL_URL_KEY]: "   " })).toBeNull();
    expect(getPortalUrl({ [PORTAL_URL_KEY]: null })).toBeNull();
    expect(getPortalUrl({})).toBeNull();
    expect(getPortalUrl(undefined)).toBeNull();
  });
});
