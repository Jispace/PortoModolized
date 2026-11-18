import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "motion/react";
import { useHslTheme } from "../context/HslThemeContext";
import { FolderCheck, Clock, Users, MailCheck } from "lucide-react";

interface AchievementItem {
  id: string;
  index: string;
  value: number;
  suffix: string;
  label: string;
  context: string;
  icon: React.ComponentType<{ className?: string }>;
}

const achievementsData: AchievementItem[] = [
  {
    id: "projects",
    index: "01",
    value: 45,
    suffix: "+",
    label: "Projets gérés",
    context: "Systèmes CRM, espaces Notion et process administratifs déployés",
    icon: FolderCheck,
  },
  {
    id: "hours",
    index: "02",
    value: 1240,
    suffix: " h+",
    label: "Heures gagnées",
    context: "Temps opérationnel libéré pour créer, vendre et coacher sereinement",
    icon: Clock,
  },
  {
    id: "clients",
    index: "03",
    value: 18,
    suffix: "+",
    label: "Clients accompagnés",
    context: "Coachs, formateurs en ligne et gestion complète d'une agence de 5 coachs",
    icon: Users,
  },
  {
    id: "messages",
    index: "04",
    value: 2800,
    suffix: "+",
    label: "Demandes traitées",
    context: "Emails, accès apprenants et suivi SAV résolus en moins de 24h ouvrées",
    icon: MailCheck,
  },
];

interface AnimatedCounterProps {
  target: number;
  suffix: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ target, suffix }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: "some" });
  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    if (!isInView) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplayValue(target);
      return;
    }

    const controls = animate(0, target, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, target]);

  const formatted = new Intl.NumberFormat("fr-FR").format(displayValue);

  return (
    <span ref={ref} className="tabular-nums">
      {formatted}
      {suffix}
    </span>
  );
};

export const AchievementsCounter: React.FC = () => {
  const { hue, saturation, lightness } = useHslTheme();
  const accentTextColor = `hsl(${hue}, ${Math.min(saturation + 12, 75)}%, ${Math.min(lightness, 40)}%)`;

  return (
    <section
      id="realisations"
      aria-label="Compteurs de réalisations"
      className="py-12 sm:py-16 bg-[#FAF7F2] border-t border-[#EAE3D8] scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean editorial kicker */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <p
              style={{ color: accentTextColor }}
              className="text-xs font-semibold tracking-wide"
            >
              Impact mesuré · Fiabilité terrain
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#2D241E] tracking-tight mt-1">
              Des résultats concrets au service de votre sérénité
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#635345] max-w-md leading-relaxed">
            Chaque heure économisée sur votre administratif et votre support client revient directement dans votre cœur de métier.
          </p>
        </div>

        {/* Hairline 4-column Architectural Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#EAE3D8] rounded-3xl overflow-hidden border border-[#EAE3D8] shadow-2xs">
          {achievementsData.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: "some" }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group bg-white hover:bg-[#FDFBF7] p-6 sm:p-7 flex flex-col justify-between transition-colors duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-medium text-[#8C7A68] tabular-nums">
                      {item.index}
                    </span>
                    <div
                      style={{
                        backgroundColor: `hsla(${hue}, ${saturation}%, 94%, 1)`,
                        color: accentTextColor,
                      }}
                      className="w-9 h-9 rounded-xl flex items-center justify-center border border-[#E8DFC8] group-hover:scale-105 transition-transform duration-200"
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2D241E] leading-none">
                    <AnimatedCounter target={item.value} suffix={item.suffix} />
                  </div>

                  <h3 className="text-sm font-bold text-[#2D241E] mt-3">
                    {item.label}
                  </h3>
                  <p className="text-xs text-[#635345] mt-1.5 leading-relaxed">
                    {item.context}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                  }}
                  className="h-0.5 w-8 group-hover:w-14 rounded-full mt-5 transition-all duration-300"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
