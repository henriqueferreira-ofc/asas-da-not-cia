import { beforeEach, describe, expect, it, vi } from "vitest";

const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { functions: { invoke } } }));

import { openEbookCheckout } from "@/lib/ebook-checkout";

describe("pagamento de e-book fora da página incorporada", () => {
  beforeEach(() => { vi.restoreAllMocks(); invoke.mockReset(); });

  it("reserva uma aba no clique e abre o Stripe nela após a resposta", async () => {
    const tab = { opener: window, closed: false, location: { replace: vi.fn() }, close: vi.fn() };
    const open = vi.spyOn(window, "open").mockReturnValue(tab as unknown as Window);
    invoke.mockImplementation(async () => {
      expect(open).toHaveBeenCalledWith("about:blank", "_blank");
      return { data: { url: "https://checkout.stripe.com/c/pay/session" }, error: null };
    });
    await openEbookCheckout("ebook-id");
    expect(invoke).toHaveBeenCalledWith("create-payment", { body: { ebook_id: "ebook-id" } });
    expect(tab.opener).toBeNull();
    expect(tab.location.replace).toHaveBeenCalledWith("https://checkout.stripe.com/c/pay/session");
  });

  it("não cria sessão nem navega o blog quando a aba é bloqueada", async () => {
    vi.spyOn(window, "open").mockReturnValue(null);
    const originalUrl = window.location.href;
    await expect(openEbookCheckout("ebook-id")).rejects.toThrow("Permita abrir uma nova aba");
    expect(invoke).not.toHaveBeenCalled();
    expect(window.location.href).toBe(originalUrl);
  });

  it("fecha a aba vazia se a criação da sessão falha", async () => {
    const tab = { opener: window, close: vi.fn() };
    vi.spyOn(window, "open").mockReturnValue(tab as unknown as Window);
    invoke.mockResolvedValue({ data: null, error: new Error("Falha de pagamento") });
    await expect(openEbookCheckout("ebook-id")).rejects.toThrow("Falha de pagamento");
    expect(tab.close).toHaveBeenCalledOnce();
  });

  it("rejeita destinos que não são o Checkout seguro do Stripe", async () => {
    const tab = { opener: window, location: { replace: vi.fn() }, close: vi.fn() };
    vi.spyOn(window, "open").mockReturnValue(tab as unknown as Window);
    invoke.mockResolvedValue({ data: { url: "https://outro-site.example/pay" }, error: null });
    await expect(openEbookCheckout("ebook-id")).rejects.toThrow("Link de pagamento inválido");
    expect(tab.location.replace).not.toHaveBeenCalled();
    expect(tab.close).toHaveBeenCalledOnce();
  });
});