import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ebook_id } = await req.json();

    if (!ebook_id) {
      throw new Error("ebook_id é obrigatório");
    }

    // Fetch ebook from database using service role
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { data: ebook, error: ebookError } = await supabase
      .from("ebooks")
      .select("id, title, description, price, cover_url, pdf_url, stripe_price_id, published")
      .eq("id", ebook_id)
      .eq("published", true)
      .single();

    if (ebookError || !ebook) {
      throw new Error("E-book não encontrado ou não publicado");
    }

    if (!ebook.pdf_url) {
      throw new Error("Este e-book não possui PDF disponível para download");
    }

    if (!ebook.stripe_price_id) {
      throw new Error("Este e-book não possui um preço configurado no Stripe");
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const origin = req.headers.get("origin") || "http://localhost:5173";

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: ebook.stripe_price_id,
          quantity: 1,
        },
      ],
      mode: "payment",
      payment_method_types: ["card", "pix"],
      success_url: `${origin}/pagamento-sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/ebook/${ebook_id}?cancelado=1`,
      metadata: {
        ebook_id: ebook.id,
        pdf_url: ebook.pdf_url,
        ebook_title: ebook.title,
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Erro ao criar sessão de pagamento:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
