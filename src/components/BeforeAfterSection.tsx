import React from "react";
import { motion } from "motion/react";
import { beforeAfterData } from "../data/portfolioData";
import { ScrollReveal } from "./ScrollReveal";
import { Sparkles, ArrowRight, Check, X } from "lucide-react";

const easeCurve = [0.16, 1, 0.3, 1] as const;

export const BeforeAfterSection: React.FC = () => {
  return (
    <section
      id="avant-apres"
      className="py-16 sm:py-24 bg-[#FDFBF7] border-t border-[#EAE3D8] scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E6DDD0] text-xs font-semibold uppercase tracking-wider text-[#7A583E] mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[var(--primary-hsl)]" />
            <span>Transformation Concrète</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2D241E] tracking-tight">
            Avant / Après mon intervention
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#635345] leading-relaxed">
            Ce qui change concrètement au quotidien quand vous me déléguez votre administratif et votre support.
          </p>
        </ScrollReveal>

        {/* 4 Paired Comparison Cards with staggered cascade */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {beforeAfterData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: easeCurve }}
              className="grid grid-cols-1 md:grid-cols-11 gap-3 p-4 sm:p-5 rounded-3xl bg-white border border-[#ECE5DB] shadow-2xs hover:shadow-md hover:border-[#D5C7B7] items-center transition-all duration-300"
            >
              {/* Before Card */}
              <div className="md:col-span-5 flex items-start gap-3 sm:gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-[#FFFDF9] border border-amber-200/60 shadow-2xs">
                <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A7969] block mb-1">
                    Avant • Charge mentale
                  </span>
                  <p className="text-xs sm:text-sm text-[#635345] font-medium leading-relaxed">
                    {item.before}
                  </p>
                </div>
              </div>

              {/* Arrow Transition */}
              <div className="md:col-span-1 flex items-center justify-center text-[#8C7A68]">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#FAF7F2] border border-[#E8DFC8]">
                  <ArrowRight className="w-4 h-4 rotate-90 md:rotate-0 text-[var(--primary-hsl)]" />
                </span>
              </div>

              {/* After Card */}
              <div className="md:col-span-5 flex items-start gap-3 sm:gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-emerald-50/70 border border-emerald-300/70 shadow-2xs">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                    Après • Sérénité retrouvée
                  </span>
                  <p className="text-xs sm:text-sm text-[#2D241E] font-bold leading-relaxed">
                    {item.after}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
