import { MessageCircle } from "lucide-react";

export function FloatingCommunityButton() {
  const whatsappLink = "https://wa.me/5561999999999"; // TODO: Substituir pelo link real do grupo

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group animate-fade-in"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="font-semibold text-sm hidden sm:inline">
        Entrar na nossa comunidade
      </span>
      <span className="font-semibold text-sm sm:hidden">
        Comunidade
      </span>
    </a>
  );
}
