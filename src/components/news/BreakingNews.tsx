import { AlertCircle, Radio } from "lucide-react";
import { useSiteSetting } from "@/hooks/useSiteSettings";

const DEFAULT_TEXT = "FAB realiza maior exercício de defesa aérea da história • Ministro da Defesa anuncia novos investimentos em tecnologia militar • AAFAB completa 25 anos de atuação institucional • Brasil assina acordo de cooperação em defesa com países do BRICS";

export function BreakingNews() {
  const { data: setting } = useSiteSetting("breaking_news_text");
  const text = setting?.value || DEFAULT_TEXT;
  const items = text.split("•").map(s => s.trim()).filter(Boolean);

  return (
    <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white shadow-md">
      <div className="container py-2.5">
        <div className="flex items-center gap-4 overflow-hidden">
          <div className="flex items-center gap-2 shrink-0 bg-red-800/50 px-3 py-1 rounded-full">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span className="font-bold text-xs uppercase tracking-wider">Ao Vivo</span>
          </div>
          <div className="h-4 w-px bg-white/30 shrink-0" />
          <div className="overflow-hidden whitespace-nowrap flex-1">
            <div className="animate-marquee inline-flex text-sm font-medium">
              {[0, 1].map((copy) => (
                <span key={copy} className="inline-flex items-center gap-3 pr-6">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {items.map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-3">
                      <span>{item}</span>
                      <span className="text-white/50">•</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
