import React from "react";
import { motion } from "motion/react";
import { portfolioProfile, candyaPortraitImg } from "../data/portfolioData";
import { useHslTheme } from "../context/HslThemeContext";
import {
  Calendar,
  ArrowDown,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  HeartHandshake,
} from "lucide-react";

interface HeroProps {
  onOpenBooking: (plan?: string) => void;
  onOpenSchedule: () => void;
}

const easeCurve = [0.16, 1, 0.3, 1] as const;

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenSchedule }) => {
  const { hue, saturation, lightness } = useHslTheme();

  return (
    <section
      id="accueil"
      className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden"
    >
      {/* Ambient background glow responding dynamically to HSL hue */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          background: `radial-gradient(circle, hsla(${hue}, ${saturation}%, 60%, 0.14) 0%, hsla(${hue}, ${saturation}%, 75%, 0.05) 55%, transparent 75%)`,
        }}
        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-[min(95vw,47rem)] h-[clamp(18rem,45vw,31rem)] rounded-full blur-[110px] transition-all duration-300"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeCurve }}
              className="inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 px-3.5 py-1.5 rounded-2xl sm:rounded-full bg-white/90 border border-[#E6DDD0] shadow-2xs text-xs max-w-full"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span className="font-semibold text-[#2D241E]">
                {portfolioProfile.shortName}
              </span>
              <span className="text-[#C2B5A5]">·</span>
              <span className="text-[#635345]">
                {portfolioProfile.title}
              </span>
              <span className="hidden sm:inline text-[#C2B5A5]">·</span>
              <span className="hidden sm:inline text-[#7A6C5E]">
                {portfolioProfile.targetAudience}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: easeCurve }}
              className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#2D241E] leading-[1.12]"
            >
              Vous créez, vendez, coachez.{" "}
              <span
                style={{
                  color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                  fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif",
                }}
                className="font-serif italic font-normal block mt-1 transition-colors duration-200 catchphrase-font"
              >
                Je fais tourner le reste.
              </span>
            </motion.h1>

            {/* Lead copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: easeCurve }}
              className="text-sm sm:text-base lg:text-lg text-[#635345] leading-relaxed max-w-xl"
            >
              Organisation administrative rigoureuse & Support client écrit d'exception. J'apporte de l'ordre, de la sérénité et une attention profondément humaine pour que vous puissiez vous consacrer pleinement à ce qui vous fait vibrer.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: easeCurve }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
            >
              <button
                type="button"
                onClick={() => onOpenBooking()}
                style={{
                  backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                  color: lightness > 55 ? "hsl(var(--theme-h), 28%, 14%)" : "#FFFFFF",
                }}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm hover:brightness-95 active:scale-95 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Réserver un échange 30 min • Gratuit</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-80" />
              </button>

              <a
                href="#projets"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white border border-[#E2D8CC] hover:bg-[#FAF7F2] text-[#4A3B2F] text-xs sm:text-sm font-medium transition-colors shadow-2xs"
              >
                <span>Explorer mes cas concrets</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#8C7A68]" />
              </a>
            </motion.div>

            {/* Quote excerpt */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.32, ease: easeCurve }}
              className="pt-2 flex items-center gap-3 text-xs text-[#7A6C5E] italic"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--primary-hsl)] shrink-0" />
              <span>
                « Je gère déjà l'administratif d'une agence de 5 coachs avec rigueur et réactivité. »
              </span>
            </motion.div>
          </div>

          {/* Right Column: High-Fidelity Portrait & Visual Anchor */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: easeCurve }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Backing decorative frame */}
              <div
                style={{
                  borderColor: `hsla(${hue}, ${saturation}%, 85%, 0.8)`,
                  backgroundColor: `hsla(${hue}, ${saturation}%, 96%, 0.5)`,
                }}
                className="absolute inset-0 rounded-3xl -rotate-2 scale-98 border transition-all duration-300"
              />

              {/* Main portrait container */}
              <div className="relative rounded-3xl overflow-hidden bg-white border border-[#E6DDD0] shadow-md">
                <img
                  src={candyaPortraitImg}
                  alt="Portrait de Candya Randriamanarina, assistante virtuelle indépendante"
                  loading="eager"
                  className="w-full h-auto aspect-square object-cover"
                />

                {/* Scrim and badge at bottom */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-5 text-white">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-serif text-base sm:text-lg font-bold leading-tight">
                        {portfolioProfile.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-white/85 mt-0.5">
                        {portfolioProfile.subtitle}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={onOpenSchedule}
                      className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold text-white border border-white/30 hover:bg-white/30 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Horaires EAT →
                    </button>
                  </div>
                </div>
              </div>

              {/* Reassurance Badge (stacked below on mobile <640px, floating on sm+) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease: easeCurve }}
                className="mt-3 sm:mt-0 sm:absolute sm:-bottom-5 sm:-left-5 w-full sm:w-auto sm:max-w-xs bg-white/95 backdrop-blur-md border border-[#E4DACD] p-3 sm:p-3.5 rounded-2xl shadow-lg flex items-center gap-2.5 sm:gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-[#2D241E] block">
                    100% Sérénité
                  </span>
                  <span className="text-[11px] text-[#7A6C5E] block">
                    Discrétion &amp; écoute bienveillante
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Full-width Proof Metric Strip Below the Split */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.1, ease: easeCurve }}
          className="mt-14 sm:mt-20 pt-8 border-t border-[#EAE3D8] grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: easeCurve }}
            className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-[#ECE5DB] shadow-2xs flex items-start gap-3.5"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] text-[#7A583E] flex items-center justify-center shrink-0 border border-[#EAE3D8]">
              <Clock className="w-4 h-4 text-[var(--primary-hsl)]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D241E] block">
                Réactivité garantie
              </span>
              <p className="text-xs text-[#635345] mt-1 leading-relaxed">
                Réponses soignées aux élèves et prospects en moins de 24h ouvrées.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25, ease: easeCurve }}
            className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-[#ECE5DB] shadow-2xs flex items-start gap-3.5"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] text-[#7A583E] flex items-center justify-center shrink-0 border border-[#EAE3D8]">
              <CheckCircle2 className="w-4 h-4 text-[var(--primary-hsl)]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D241E] block">
                Zéro impayé ni retard
              </span>
              <p className="text-xs text-[#635345] mt-1 leading-relaxed">
                Rapprochement comptable régulier et relances bienveillantes sous 48h.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35, ease: easeCurve }}
            className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-[#ECE5DB] shadow-2xs flex items-start gap-3.5"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] text-[#7A583E] flex items-center justify-center shrink-0 border border-[#EAE3D8]">
              <HeartHandshake className="w-4 h-4 text-[var(--primary-hsl)]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D241E] block">
                Accompagnement sur-mesure
              </span>
              <p className="text-xs text-[#635345] mt-1 leading-relaxed">
                Je m'adapte à vos outils existants et à votre ton de communication.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
