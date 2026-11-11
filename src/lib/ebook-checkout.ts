import { FunctionsHttpError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

// Reserve the tab during the click, before the asynchronous request loses
// browser user activation. Never navigate the embedded blog to Checkout.
export async function openEbookCheckout(ebookId: string): Promise<void> {
  const checkoutTab = window.open("about:blank", "_blank");
  if (!checkoutTab) {
    throw new Error("Permita abrir uma nova aba para continuar o pagamento. Se estiver no Portal do Associado, abra o blog em uma nova aba.");
  }
  checkoutTab.opener = null;

  try {
    const { data, error } = await supabase.functions.invoke("create-payment", {
      body: { ebook_id: ebookId },
    });
    if (error) {
      if (error instanceof FunctionsHttpError) {
        const details = await error.context.json().catch(() => null);
        throw new Error(details?.error || "Erro ao criar sessão de pagamento. Tente novamente.");
      }
      throw error;
    }
    const checkoutUrl = new URL(data?.url || "");
    if (checkoutUrl.protocol !== "https:" || checkoutUrl.hostname !== "checkout.stripe.com" || checkoutUrl.username || checkoutUrl.password) {
      throw new Error("Link de pagamento inválido. Tente novamente.");
    }
    if (checkoutTab.closed) {
      throw new Error("A aba de pagamento foi fechada. Clique em adquirir novamente.");
    }
    checkoutTab.location.replace(checkoutUrl.href);
  } catch (error) {
    checkoutTab.close();
    throw error;
  }
}