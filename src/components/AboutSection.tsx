import React from "react";
import { motion } from "motion/react";
import { portfolioProfile, coreValues } from "../data/portfolioData";
import { useHslTheme } from "../context/HslThemeContext";
import { ScrollReveal } from "./ScrollReveal";
import {
  Heart,
  CheckCircle2,
  Zap,
  Sparkles,
  Quote,
  Compass,
  ShieldCheck,
} from "lucide-react";

const easeCurve = [0.16, 1, 0.3, 1] as const;

export const AboutSection: React.FC = () => {
  const { hue, saturation, lightness } = useHslTheme();

  return (
    <section
      id="a-propos"
      className="relative py-16 sm:py-24 bg-gradient-to-b from-[#FDFBF7] via-[#FFFDF9] to-[#F7F3EB]/60 border-t border-[#EAE3D8] scroll-mt-20 overflow-hidden"
    >
      {/* Background ambient lighting with fade-in */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{
          background: `radial-gradient(circle, hsla(${hue}, ${saturation}%, 65%, 0.12) 0%, transparent 70%)`,
        }}
        className="pointer-events-none absolute top-10 left-0 w-[min(90vw,34rem)] h-[min(75vw,28rem)] rounded-full blur-[100px] transition-all duration-300"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E6DDD0] text-xs font-semibold uppercase tracking-wider text-[#7A583E] mb-3 shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-[var(--primary-hsl)]" />
            <span>À Propos & Philosophie</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2D241E] tracking-tight">
            Apporter de l'ordre là où tout semble déborder
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#635345] leading-relaxed">
            Une implication humaine sincère, de la douceur dans les échanges et une rigueur sans faille.
          </p>
        </ScrollReveal>

        {/* 2-Column Split: Editorial Bio vs Values */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Editorial Bio Monograph */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal delay={0.1} distance={20}>
              <div className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-[#ECE5DB] shadow-2xs space-y-4">
                <p className="text-sm sm:text-base text-[#3E3228] leading-relaxed">
                  {portfolioProfile.about.bioParagraph1}
                </p>
                <p className="text-sm sm:text-base text-[#5A4B3D] leading-relaxed">
                  {portfolioProfile.about.bioParagraph2}
                </p>
                <p className="text-sm sm:text-base text-[#5A4B3D] leading-relaxed">
                  {portfolioProfile.about.bioParagraph3}
                </p>

                {/* Personal Note */}
                <div className="pt-4 mt-4 border-t border-[#F0EAE0] flex items-start gap-3.5">
                  <span className="text-2xl select-none">✈️</span>
                  <p className="text-xs sm:text-sm text-[#635345] leading-relaxed">
                    <strong className="text-[#2D241E] font-bold">Côté perso : </strong>
                    {portfolioProfile.about.personalNote}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Mantra Card */}
            <ScrollReveal delay={0.2} distance={20}>
              <div
                style={{
                  borderColor: `hsla(${hue}, ${saturation}%, 85%, 0.8)`,
                  backgroundColor: `hsla(${hue}, ${saturation}%, 97%, 0.7)`,
                }}
                className="p-6 rounded-3xl border shadow-2xs flex items-start gap-4 transition-all duration-300"
              >
                <Quote className="w-6 h-6 text-[var(--primary-hsl)] shrink-0 mt-0.5" />
                <div>
                  <p className="font-serif text-sm sm:text-base italic text-[#2D241E] leading-relaxed">
                    {portfolioProfile.about.mantra}
                  </p>
                  <span className="text-xs font-semibold text-[#7A6C5E] mt-2 block">
                    — Candya Randriamanarina
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* The Ultimate Outcome */}
            <ScrollReveal delay={0.3} distance={20}>
              <div className="p-6 rounded-3xl bg-[#2D241E] text-white shadow-md relative overflow-hidden">
                <div
                  style={{
                    background: `radial-gradient(circle, hsla(${hue}, ${saturation}%, 60%, 0.25) 0%, transparent 70%)`,
                  }}
                  className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-2xl pointer-events-none"
                />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[11px] font-semibold text-[#E0A97E] mb-3">
                    <Sparkles className="w-3 h-3" />
                    <span>La finalité ultime</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#EFEAE2] leading-relaxed">
                    {portfolioProfile.about.ultimateOutcome}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Values & Engagement */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3.5">
              <ScrollReveal delay={0.1} distance={15}>
                <div className="flex items-center gap-2 pb-1">
                  <Heart className="w-4 h-4 text-[var(--primary-hsl)]" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#4A3B2F]">
                    Ce qui guide mon accompagnement
                  </h3>
                </div>
              </ScrollReveal>

              {coreValues.map((val, idx) => {
                const Icon = idx === 0 ? Heart : idx === 1 ? CheckCircle2 : Zap;
                return (
                  <motion.div
                    key={val.title}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 + idx * 0.08, ease: easeCurve }}
                    className="p-5 rounded-3xl bg-white border border-[#ECE5DB] shadow-2xs hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          style={{
                            backgroundColor: `hsla(${hue}, ${saturation}%, 94%, 1)`,
                            color: `hsl(${hue}, ${saturation}%, 38%)`,
                          }}
                          className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border border-[#E8DFC8]"
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="font-serif text-base font-bold text-[#2D241E]">
                          {val.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-semibold text-[#8C7A68] bg-[#FAF7F2] px-2.5 py-0.5 rounded-full border border-[#EAE3D8] shrink-0">
                        {val.sublabel}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#635345] leading-relaxed pl-0 sm:pl-13">
                      {val.description}
                    </p>
                  </motion.div>
                );
              })}

              {/* Complementary trust card */}
              <ScrollReveal delay={0.35} distance={15}>
                <div className="p-5 rounded-3xl bg-[#FAF7F2] border border-[#E8DFC8] shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#2D241E]">
                    <ShieldCheck className="w-4 h-4 text-[var(--primary-hsl)]" />
                    <span>Fiabilité & Engagement quotidien</span>
                  </div>
                  <p className="text-xs text-[#635345] leading-relaxed">
                    Chaque message, chaque client et chaque facture sont traités avec le même soin que s'il s'agissait des miens. Vous gardez un œil sur tout sans avoir à vous soucier des détails.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
