import React from "react";
import { motion } from "motion/react";
import { competencies, getCalendlyUrl } from "../data/portfolioData";
import { useHslTheme } from "../context/HslThemeContext";
import { ScrollReveal } from "./ScrollReveal";
import {
  Inbox,
  Calendar,
  ListTodo,
  Users,
  CreditCard,
  MessageSquare,
  ShieldAlert,
  KeyRound,
  Receipt,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

interface BentoGridProps {
  onOpenBooking: (plan?: string) => void;
}

const easeCurve = [0.16, 1, 0.3, 1] as const;

export const BentoGrid: React.FC<BentoGridProps> = ({ onOpenBooking }) => {
  const { hue, saturation, lightness } = useHslTheme();

  const adminIcons = [Inbox, Calendar, ListTodo, Users, CreditCard];
  const supportIcons = [MessageSquare, ShieldAlert, KeyRound, Receipt];

  return (
    <section
      id="services"
      className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#EAE3D8] scroll-mt-20 overflow-hidden relative"
    >
      <span id="expertise" className="absolute -top-24 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E6DDD0] text-xs font-semibold uppercase tracking-wider text-[#7A583E] mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[var(--primary-hsl)]" />
            <span>Offres & Périmètre</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2D241E] tracking-tight">
            Deux piliers d'excellence opérationnelle
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#635345] leading-relaxed">
            Déléguez en toute confiance votre back-office administratif et l'accompagnement écrit de vos apprenants.
          </p>
        </ScrollReveal>

        {/* 2 Main Pillar Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Pillar 1: Organisation Administrative */}
          <ScrollReveal delay={0.1} direction="up" distance={30}>
            <motion.div
              whileHover={{ y: -6, transition: { duration: 0.28, ease: easeCurve } }}
              className="group relative p-6 sm:p-8 rounded-3xl bg-white border border-[#ECE5DB] shadow-2xs hover:shadow-xl hover:shadow-[#D3A376]/10 hover:border-[var(--primary-hsl)]/50 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden"
            >
              {/* Subtle top shimmer accent on card hover */}
              <div
                style={{
                  background: `linear-gradient(90deg, transparent, hsl(${hue}, ${saturation}%, ${lightness}%), transparent)`,
                }}
                className="pointer-events-none absolute top-0 inset-x-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              <div>
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      style={{
                        backgroundColor: `hsla(${hue}, ${saturation}%, 94%, 1)`,
                      }}
                      className="w-11 h-11 rounded-2xl flex items-center justify-center border border-[#E8DFC8] shrink-0 group-hover:scale-105 group-hover:rotate-1 transition-all duration-300"
                    >
                      <Inbox className="w-5 h-5 text-[var(--primary-hsl)]" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2D241E] group-hover:text-[var(--primary-hsl)] transition-colors duration-200">
                        Organisation Administrative
                      </h3>
                      <p className="text-xs text-[#7A6C5E] mt-0.5">
                        Rigueur, clarté & maîtrise des plannings
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#8C7A68] bg-[#FAF7F2] px-2.5 py-1 rounded-full border border-[#EAE3D8] shrink-0 group-hover:bg-white group-hover:shadow-2xs transition-all">
                    Essentiel
                  </span>
                </div>

                {/* Items with staggered entrance & interactive hover states */}
                <div className="space-y-3">
                  {competencies.administrative.map((item, idx) => {
                    const ItemIcon = adminIcons[idx % adminIcons.length] ?? Inbox;
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.15 + idx * 0.06, ease: easeCurve }}
                        whileHover={{ x: 6, scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => onOpenBooking("Organisation Administrative")}
                        className="p-3.5 rounded-2xl bg-[#FAF7F2]/80 border border-[#ECE5DB] hover:border-[var(--primary-hsl)]/50 hover:bg-white hover:shadow-xs flex items-start gap-3 transition-all duration-200 cursor-pointer group/item"
                      >
                        <div className="w-8 h-8 rounded-xl bg-white text-[#7A583E] flex items-center justify-center shrink-0 mt-0.5 border border-[#EAE3D8] group-hover/item:bg-[var(--primary-hsl)] group-hover/item:text-white group-hover/item:scale-105 transition-all duration-200 shadow-2xs">
                          <ItemIcon className="w-4 h-4 text-[var(--primary-hsl)] group-hover/item:text-white transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-bold text-[#2D241E] group-hover/item:text-[var(--primary-hsl)] transition-colors">
                              {item.label}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-[var(--primary-hsl)] opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all duration-200" />
                          </div>
                          <p className="text-xs text-[#635345] mt-0.5 leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Gold rule highlight card with hover pulse */}
                <motion.div
                  whileHover={{ scale: 1.015, y: -2 }}
                  style={{
                    backgroundColor: `hsla(${hue}, ${saturation}%, 97%, 0.85)`,
                    borderColor: `hsla(${hue}, ${saturation}%, 88%, 0.9)`,
                  }}
                  className="p-4 rounded-2xl border mt-5 flex items-start gap-3 transition-all duration-200 shadow-2xs cursor-default"
                >
                  <CheckCircle2 className="w-4 h-4 text-[var(--primary-hsl)] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#5C4D3E] leading-relaxed">
                    <strong className="text-[#2D241E] font-bold">Inbox Zero quotidien :</strong> Tous les messages sont triés, archivés ou répondus pour que vous commenciez chaque journée avec l'esprit totalement libre.
                  </p>
                </motion.div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-8 pt-5 border-t border-[#F0EAE0] flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-[#7A6C5E]">
                  Idéal pour coachs débordés par les emails & la paperasse
                </span>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => onOpenBooking("Organisation Administrative")}
                    style={{
                      backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                      color: lightness > 55 ? "hsl(var(--theme-h), 28%, 14%)" : "#FFFFFF",
                    }}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold shadow-xs hover:brightness-95 active:scale-95 transition-all cursor-pointer whitespace-nowrap min-h-[44px]"
                  >
                    <span>Choisir cette formule</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                  <motion.a
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    href={getCalendlyUrl("Organisation Administrative")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-[#FAF7F2] border border-[#E8DFC8] text-[#7A583E] hover:bg-[#F2ECE2] hover:border-[var(--primary-hsl)]/40 transition-colors"
                    title="Réserver directement sur Calendly"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Pillar 2: Support Client Écrit */}
          <ScrollReveal delay={0.2} direction="up" distance={30}>
            <motion.div
              whileHover={{ y: -6, transition: { duration: 0.28, ease: easeCurve } }}
              className="group relative p-6 sm:p-8 rounded-3xl bg-white border border-[#ECE5DB] shadow-2xs hover:shadow-xl hover:shadow-[#D3A376]/10 hover:border-[var(--primary-hsl)]/50 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden"
            >
              {/* Subtle top shimmer accent on card hover */}
              <div
                style={{
                  background: `linear-gradient(90deg, transparent, hsl(${hue}, ${saturation}%, ${lightness}%), transparent)`,
                }}
                className="pointer-events-none absolute top-0 inset-x-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              <div>
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      style={{
                        backgroundColor: `hsla(${hue}, ${saturation}%, 94%, 1)`,
                      }}
                      className="w-11 h-11 rounded-2xl flex items-center justify-center border border-[#E8DFC8] shrink-0 group-hover:scale-105 group-hover:rotate-1 transition-all duration-300"
                    >
                      <MessageSquare className="w-5 h-5 text-[var(--primary-hsl)]" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2D241E] group-hover:text-[var(--primary-hsl)] transition-colors duration-200">
                        Support Client Écrit
                      </h3>
                      <p className="text-xs text-[#7A6C5E] mt-0.5">
                        Bienveillance, réactivité & désescalade des litiges
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#8C7A68] bg-[#FAF7F2] px-2.5 py-1 rounded-full border border-[#EAE3D8] shrink-0 group-hover:bg-white group-hover:shadow-2xs transition-all">
                    Relation Élèves
                  </span>
                </div>

                {/* Items with staggered entrance & interactive hover states */}
                <div className="space-y-3">
                  {competencies.clientSupport.map((item, idx) => {
                    const ItemIcon = supportIcons[idx % supportIcons.length] ?? MessageSquare;
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.15 + idx * 0.06, ease: easeCurve }}
                        whileHover={{ x: 6, scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => onOpenBooking("Support Client Écrit")}
                        className="p-3.5 rounded-2xl bg-[#FAF7F2]/80 border border-[#ECE5DB] hover:border-[var(--primary-hsl)]/50 hover:bg-white hover:shadow-xs flex items-start gap-3 transition-all duration-200 cursor-pointer group/item"
                      >
                        <div className="w-8 h-8 rounded-xl bg-white text-[#7A583E] flex items-center justify-center shrink-0 mt-0.5 border border-[#EAE3D8] group-hover/item:bg-[var(--primary-hsl)] group-hover/item:text-white group-hover/item:scale-105 transition-all duration-200 shadow-2xs">
                          <ItemIcon className="w-4 h-4 text-[var(--primary-hsl)] group-hover/item:text-white transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-bold text-[#2D241E] group-hover/item:text-[var(--primary-hsl)] transition-colors">
                              {item.label}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-[var(--primary-hsl)] opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all duration-200" />
                          </div>
                          <p className="text-xs text-[#635345] mt-0.5 leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Gold rule highlight card with hover pulse */}
                <motion.div
                  whileHover={{ scale: 1.015, y: -2 }}
                  style={{
                    backgroundColor: `hsla(${hue}, ${saturation}%, 97%, 0.85)`,
                    borderColor: `hsla(${hue}, ${saturation}%, 88%, 0.9)`,
                  }}
                  className="p-4 rounded-2xl border mt-5 flex items-start gap-3 transition-all duration-200 shadow-2xs cursor-default"
                >
                  <Sparkles className="w-4 h-4 text-[var(--primary-hsl)] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#5C4D3E] leading-relaxed">
                    <strong className="text-[#2D241E] font-bold">Règle des 24h ouvrées :</strong> Aucun élève ni prospect n'attend dans le flou. Les situations délicates sont désamorcées avec empathie et respect de votre marque.
                  </p>
                </motion.div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-8 pt-5 border-t border-[#F0EAE0] flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-[#7A6C5E]">
                  Parfait pour les formateurs ayant des dizaines d'élèves à choyer
                </span>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => onOpenBooking("Support Client Écrit")}
                    style={{
                      backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                      color: lightness > 55 ? "hsl(var(--theme-h), 28%, 14%)" : "#FFFFFF",
                    }}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold shadow-xs hover:brightness-95 active:scale-95 transition-all cursor-pointer whitespace-nowrap min-h-[44px]"
                  >
                    <span>Choisir cette formule</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                  <motion.a
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    href={getCalendlyUrl("Support Client Écrit")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-[#FAF7F2] border border-[#E8DFC8] text-[#7A583E] hover:bg-[#F2ECE2] hover:border-[var(--primary-hsl)]/40 transition-colors shrink-0"
                    title="Réserver directement sur Calendly"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>

        {/* Formula Duo: Full width featured banner with hover micro-interaction */}
        <ScrollReveal delay={0.25} distance={20}>
          <motion.div
            whileHover={{ y: -4, scale: 1.006, transition: { duration: 0.25 } }}
            className="mt-8 p-6 sm:p-8 rounded-3xl bg-[#2D241E] text-white shadow-md hover:shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group"
          >
            {/* Ambient light pulse */}
            <div
              style={{
                backgroundColor: `hsla(${hue}, ${saturation}%, 60%, 0.12)`,
              }}
              className="pointer-events-none absolute -right-20 -top-20 w-[min(80vw,20rem)] h-[min(80vw,20rem)] rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500"
            />

            <div className="space-y-2 text-center md:text-left relative z-10 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[11px] font-semibold text-[#E0A97E] group-hover:bg-white/15 transition-colors">
                <Sparkles className="w-3 h-3 shrink-0" />
                <span>Formule Duo • 100% Sérénité</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">
                Formule Complète : Duo Admin & Support
              </h3>
              <p className="text-xs sm:text-sm text-[#D5C7B7] max-w-xl">
                Prise en charge intégrale de votre back-office administratif et de toute votre relation apprenants. La solution ultime pour vous décharger à 100%.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 relative z-10 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => onOpenBooking("Formule Complète : Duo Admin & Support")}
                style={{
                  backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                  color: lightness > 55 ? "hsl(var(--theme-h), 28%, 14%)" : "#FFFFFF",
                }}
                className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-semibold shadow-md hover:brightness-95 active:scale-95 transition-all cursor-pointer sm:whitespace-nowrap text-center min-h-[44px]"
              >
                Réserver la Formule Duo
              </motion.button>
            </div>
          </motion.div>
        </ScrollReveal>

        {/* 3 Trust Commitments Strip with Hover Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ScrollReveal delay={0.3} distance={15}>
            <motion.div
              whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
              className="p-4 rounded-2xl bg-white border border-[#ECE5DB] shadow-2xs hover:border-[var(--primary-hsl)]/50 hover:shadow-md flex items-center gap-3 h-full transition-all duration-200 cursor-default group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] text-[#7A583E] flex items-center justify-center shrink-0 border border-[#EAE3D8] group-hover:bg-[var(--primary-hsl)] group-hover:text-white transition-all shadow-2xs">
                <Clock className="w-4 h-4 text-[var(--primary-hsl)] group-hover:text-white transition-colors" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#2D241E] block">
                  SLA &lt; 24h ouvrées
                </span>
                <span className="text-[11px] text-[#7A6C5E]">
                  Prise en charge quotidienne garantie
                </span>
              </div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.38} distance={15}>
            <motion.div
              whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
              className="p-4 rounded-2xl bg-white border border-[#ECE5DB] shadow-2xs hover:border-[var(--primary-hsl)]/50 hover:shadow-md flex items-center gap-3 h-full transition-all duration-200 cursor-default group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] text-[#7A583E] flex items-center justify-center shrink-0 border border-[#EAE3D8] group-hover:bg-[var(--primary-hsl)] group-hover:text-white transition-all shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[var(--primary-hsl)] group-hover:text-white transition-colors" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#2D241E] block">
                  100% Écrit & Traçable
                </span>
                <span className="text-[11px] text-[#7A6C5E]">
                  Historiques clairs sans interruption d'appel
                </span>
              </div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.46} distance={15}>
            <motion.div
              whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
              className="p-4 rounded-2xl bg-white border border-[#ECE5DB] shadow-2xs hover:border-[var(--primary-hsl)]/50 hover:shadow-md flex items-center gap-3 h-full transition-all duration-200 cursor-default group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] text-[#7A583E] flex items-center justify-center shrink-0 border border-[#EAE3D8] group-hover:bg-[var(--primary-hsl)] group-hover:text-white transition-all shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[var(--primary-hsl)] group-hover:text-white transition-colors" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#2D241E] block">
                  Sécurité & Confidentialité
                </span>
                <span className="text-[11px] text-[#7A6C5E]">
                  Mots de passe cryptés & secret professionnel
                </span>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
