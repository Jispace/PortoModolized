import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { faqsList } from "../data/portfolioData";
import { useHslTheme } from "../context/HslThemeContext";
import { ScrollReveal } from "./ScrollReveal";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

interface FAQSectionProps {
  onOpenBooking: () => void;
}

const easeCurve = [0.16, 1, 0.3, 1] as const;

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenBooking }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { hue, saturation, lightness } = useHslTheme();

  return (
    <section
      id="faq"
      className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#EAE3D8] scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E6DDD0] text-xs font-semibold uppercase tracking-wider text-[#7A583E] mb-3 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-[var(--primary-hsl)]" />
            <span>Transparence Totale</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2D241E] tracking-tight">
            Questions fréquentes
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#635345] leading-relaxed">
            Tout ce que vous devez savoir avant de réserver votre créneau de diagnostic.
          </p>
        </ScrollReveal>

        {/* FAQ Accordion with progressive cascade */}
        <div className="space-y-3.5">
          {faqsList.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: easeCurve }}
                className="rounded-2xl bg-white border border-[#ECE5DB] overflow-hidden shadow-2xs transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF7F2]/60 transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg text-[#2D241E] font-bold">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border border-[#E8DFC8] transition-transform duration-200 ${
                      isOpen
                        ? "rotate-180 bg-[#2D241E] text-white"
                        : "bg-[#FAF7F2] text-[#7A6C5E]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: easeCurve }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#635345] leading-relaxed border-t border-[#F4EFEA]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Final CTA inside FAQ */}
        <ScrollReveal delay={0.25} distance={20} className="mt-12 text-center p-6 rounded-3xl bg-white border border-[#ECE5DB] shadow-2xs">
          <p className="text-xs text-[#7A6C5E] mb-3 font-medium">
            Une question spécifique ou des besoins particuliers pour votre équipe ?
          </p>
          <button
            type="button"
            onClick={onOpenBooking}
            style={{
              backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
              color: lightness > 55 ? "hsl(var(--theme-h), 28%, 14%)" : "#FFFFFF",
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold shadow-xs hover:brightness-95 active:scale-95 transition-all cursor-pointer min-h-[44px]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Réserver un échange de 30 min (Offert)</span>
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
};
