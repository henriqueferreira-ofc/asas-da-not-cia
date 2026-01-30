import { MessageCircle } from "lucide-react";
import { useSiteSettingsMap } from "@/hooks/useSiteSettings";
import { cn } from "@/lib/utils";

export function FloatingCommunityButton() {
  const { data: settings, isLoading } = useSiteSettingsMap();

  if (isLoading) return null;

  const isEnabled = settings.floating_button_enabled === 'true';
  const link = settings.floating_button_link || '#';
  const text = settings.floating_button_text || 'Entrar na nossa comunidade';
  const position = settings.floating_button_position || 'bottom-right';

  if (!isEnabled) return null;

  const positionClasses: Record<string, string> = {
    'bottom-right': 'bottom-24 right-6',
    'bottom-left': 'bottom-24 left-6',
    'top-right': 'top-24 right-6',
    'top-left': 'top-24 left-6',
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed z-50 flex items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group animate-fade-in",
        positionClasses[position] || positionClasses['bottom-right']
      )}
    >
      <MessageCircle className="w-6 h-6" />
      <span className="font-semibold text-sm hidden sm:inline">
        {text}
      </span>
      <span className="font-semibold text-sm sm:hidden">
        Comunidade
      </span>
    </a>
  );
}
