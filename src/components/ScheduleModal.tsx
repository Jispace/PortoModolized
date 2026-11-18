import React from "react";
import { candyaSchedule, portfolioProfile, getCalendlyUrl } from "../data/portfolioData";
import { useHslTheme } from "../context/HslThemeContext";
import {
  X,
  Clock,
  Globe2,
  Calendar,
  Sparkles,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: (plan?: string) => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const { hue, saturation, lightness } = useHslTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-[#FDFBF7] border border-[#E8DFC8] rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl max-h-[90dvh] overflow-y-auto overflow-x-hidden overscroll-contain">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#7A6C5E] hover:text-[#2D241E] hover:bg-black/5 transition-colors cursor-pointer"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with active green pulse */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs font-bold shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Active & Disponible pour de nouvelles missions</span>
          </span>
        </div>

        <h3 className="font-serif text-2xl font-bold text-[#2D241E] tracking-tight">
          Créneaux d'activité & Disponibilités
        </h3>
        <p className="text-xs sm:text-sm text-[#635345] mt-1 leading-relaxed">
          Consultez les plages horaires hebdomadaires dédiées aux diagnostics, appels découverte et sessions de synchronisation.
        </p>

        {/* Timezone badge */}
        <div className="mt-4 p-3 rounded-2xl bg-white border border-[#E8DFC8] flex flex-wrap items-center justify-between gap-2 text-xs text-[#4A3B2F]">
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-[var(--primary-hsl)] shrink-0" />
            <span className="font-semibold">Fuseau horaire :</span>
          </div>
          <span className="font-mono font-bold bg-[#FAF7F2] px-2.5 py-0.5 rounded-full border border-[#E8DFC8]">
            {candyaSchedule.timezone} ({candyaSchedule.timezoneOffset})
          </span>
        </div>

        {/* Schedule Cards */}
        <div className="mt-4 space-y-2.5">
          {candyaSchedule.activeDays.map((item) => (
            <div
              key={item.day}
              className="p-3.5 rounded-2xl bg-white border border-[#E8DFC8] flex flex-wrap items-center justify-between gap-2 shadow-2xs hover:border-[#C4B3A1] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-[#2D241E] block">
                    {item.day}
                  </span>
                  <span className="text-[11px] text-[#7A6C5E]">
                    Appels & consultations en direct
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                {item.hours}
              </span>
            </div>
          ))}
        </div>

        {/* Off-days clarification */}
        <div className="mt-4 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D8] text-xs text-[#635345] space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-[#2D241E]">
            <Sparkles className="w-3.5 h-3.5 text-[var(--primary-hsl)]" />
            <span>Lundis, Vendredis & Samedis :</span>
          </div>
          <p className="text-[11px] leading-relaxed text-[#5C4D3E]">
            Ces créneaux sont réservés aux opérations de fond (boîtes mail Inbox Zero, facturation, suivi des élèves) pour garantir un SLA rapide et sans retard.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 pt-4 border-t border-[#EAE3D8] flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenBooking("Diagnostic Découverte (30 min offertes)");
            }}
            style={{
              backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
              color: lightness > 55 ? "hsl(var(--theme-h), 28%, 14%)" : "#FFFFFF",
            }}
            className="w-full sm:flex-1 py-3 px-5 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs hover:brightness-95 active:scale-95 transition-all cursor-pointer min-h-[44px]"
          >
            <Calendar className="w-4 h-4" />
            <span>Réserver un créneau (30 min offertes)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={portfolioProfile.links.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto p-3 rounded-full bg-white border border-[#E6DDD0] hover:bg-[#F2ECE2] text-[#4A3B2F] text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Calendly direct</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#8F6544]" />
          </a>
        </div>
      </div>
    </div>
  );
};
