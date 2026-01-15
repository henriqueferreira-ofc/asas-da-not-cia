import { AlertCircle, Radio } from "lucide-react";

export function BreakingNews() {
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
            <p className="animate-marquee text-sm font-medium">
              <span className="inline-flex items-center gap-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>FAB realiza maior exercício de defesa aérea da história</span>
                <span className="text-white/50">•</span>
                <span>Ministro da Defesa anuncia novos investimentos em tecnologia militar</span>
                <span className="text-white/50">•</span>
                <span>AAFAB completa 25 anos de atuação institucional</span>
                <span className="text-white/50">•</span>
                <span>Brasil assina acordo de cooperação em defesa com países do BRICS</span>
              </span>
            </p>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(50%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
