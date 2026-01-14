import { AlertCircle } from "lucide-react";

export function BreakingNews() {
  return (
    <div className="bg-red-600 text-white">
      <div className="container py-2">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center gap-2 shrink-0">
            <AlertCircle className="w-4 h-4" />
            <span className="font-bold text-sm uppercase tracking-wide">Urgente</span>
          </div>
          <div className="h-4 w-px bg-white/30 shrink-0" />
          <div className="overflow-hidden whitespace-nowrap">
            <p className="animate-marquee text-sm">
              FAB realiza maior exercício de defesa aérea da história • Ministro da Defesa anuncia novos investimentos em tecnologia militar • AAFAB completa 25 anos de atuação institucional
            </p>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
