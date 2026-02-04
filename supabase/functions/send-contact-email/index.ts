import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      throw new Error("Configuração de email não encontrada");
    }

    const { name, email, subject, message }: ContactEmailRequest = await req.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.error("Missing required fields:", { name: !!name, email: !!email, subject: !!subject, message: !!message });
      throw new Error("Todos os campos são obrigatórios");
    }

    console.log("Sending contact email from:", email, "Subject:", subject);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "AAFAB Contato <contato@aafab.com.br>",
        to: ["aafabdm@gmail.com"],
        reply_to: email,
        subject: `[Contato AAFAB] ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e3a5f; border-bottom: 2px solid #1e3a5f; padding-bottom: 10px;">
              Nova Mensagem de Contato - AAFAB
            </h2>
            
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>Nome:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>E-mail:</strong> ${email}</p>
              <p style="margin: 10px 0;"><strong>Assunto:</strong> ${subject}</p>
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #333;">Mensagem:</h3>
              <p style="background-color: #fff; padding: 15px; border-left: 4px solid #1e3a5f; margin: 0;">
                ${message.replace(/\n/g, "<br>")}
              </p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            <p style="color: #666; font-size: 12px;">
              Esta mensagem foi enviada através do formulário de contato do site da AAFAB.
            </p>
          </div>
        `,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend API error:", data);
      throw new Error(data.message || "Erro ao enviar email");
    }

    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Error in send-contact-email function:", errorMessage);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
