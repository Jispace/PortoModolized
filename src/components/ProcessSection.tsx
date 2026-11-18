import React from "react";
import { motion } from "motion/react";
import { processSteps } from "../data/portfolioData";
import { useHslTheme } from "../context/HslThemeContext";
import { ScrollReveal } from "./ScrollReveal";
import { Sparkles, Calendar, ArrowRight } from "lucide-react";

interface ProcessSectionProps {
  onOpenBooking: (plan?: string) => void;
}

const easeCurve = [0.16, 1, 0.3, 1] as const;

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenBooking }) => {
  const { hue, saturation, lightness } = useHslTheme();

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#EAE3D8] scroll-mt-20 overflow-hidden relative"
    >
      <span id="methode" className="absolute -top-24 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E6DDD0] text-xs font-semibold tracking-wide text-[#7A583E] mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[var(--primary-hsl)]" aria-hidden="true" />
            <span>Processus d&apos;onboarding en 4 étapes</span>
          </div>
          <h2
            id="process-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2D241E] tracking-tight"
          >
            Méthode de collaboration : du diagnostic à la délégation
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#635345] leading-relaxed">
            Un parcours fluide, transparent et sécurisant pour confier votre administratif et votre relation client dès notre premier échange.
          </p>
        </ScrollReveal>

        {/* 4 Steps Grid with progressive entrance */}
        <ol
          aria-label="Les 4 étapes de mise en place de notre collaboration"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {processSteps.map((step, idx) => (
            <motion.li
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: easeCurve }}
              className="p-6 rounded-3xl bg-white border border-[#ECE5DB] shadow-2xs hover:shadow-md hover:border-[#D5C7B7] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-3xl font-extrabold text-[#CBBCA9]/70 tabular-nums">
                    0{step.step}
                  </span>
                  <span className="text-[10px] font-bold text-[#7A583E] bg-[#FAF7F2] border border-[#E8E1D5] px-2.5 py-1 rounded-full">
                    {step.badge}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#2D241E] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[#635345] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-3.5 border-t border-[#F0EAE0] flex items-center justify-between text-[11px] text-[#A87C51] font-semibold">
                <span>Étape {step.step}/4</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </motion.li>
          ))}
        </ol>

        {/* Action Callout */}
        <ScrollReveal delay={0.25} distance={15} className="mt-12 text-center">
          <button
            type="button"
            onClick={() => onOpenBooking()}
            aria-label="Réserver l'appel découverte gratuit de 30 minutes"
            style={{
              backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
              color: lightness > 55 ? "hsl(var(--theme-h), 28%, 14%)" : "#FFFFFF",
            }}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm hover:brightness-95 active:scale-95 transition-all cursor-pointer min-h-[44px]"
          >
            <Calendar className="w-4 h-4" aria-hidden="true" />
            <span>Réserver l&apos;appel découverte de 30 min (Offert)</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-80" aria-hidden="true" />
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
};
