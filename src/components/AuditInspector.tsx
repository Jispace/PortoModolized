import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useHslTheme } from "../context/HslThemeContext";
import { ScrollReveal } from "./ScrollReveal";
import {
  Sparkles,
  MousePointer2,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Clock,
  Check,
  Send,
  Zap,
} from "lucide-react";

interface AuditInspectorProps {
  onOpenBooking: () => void;
}

export const AuditInspector: React.FC<AuditInspectorProps> = ({ onOpenBooking }) => {
  const [mode, setMode] = useState<"after" | "before">("after");
  const [interactionCount, setInteractionCount] = useState<number>(23);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastKey, setToastKey] = useState<number>(0);
  const { hue, saturation, lightness } = useHslTheme();

  const handleSimulateAction = () => {
    const nextCount = interactionCount + 1;
    setInteractionCount(nextCount);

    if (mode === "after") {
      setToastMessage(
        `✓ Demande #${4800 + nextCount} traitée avec succès ! Réponse bienveillante envoyée sous 3h (~15 min économisées).`
      );
    } else {
      setToastMessage(
        `⚠️ Réponse précipitée envoyée sans modèle — risque de relance ou de malentendu.`
      );
    }

    setToastKey((prev) => prev + 1);
    setShowSuccessToast(true);

    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3200);
  };

  // ROI calculation in minutes and hours
  const totalMinutesSaved = interactionCount * 15;
  const hoursSaved = (totalMinutesSaved / 60).toFixed(1);

  return (
    <section
      id="simulateur"
      className="py-16 sm:py-24 bg-[#FDFBF7] border-t border-[#EAE3D8] overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E6DDD0] text-xs font-semibold uppercase tracking-wider text-[#7A583E] mb-3 shadow-2xs">
            <Zap className="w-3.5 h-3.5 text-[var(--primary-hsl)]" />
            <span>Test interactif : Cliquez pour tester en un clic</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2D241E] tracking-tight">
            Simulateur de Tâche Opérationnelle
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#635345] leading-relaxed max-w-2xl mx-auto">
            Cliquez sur le bouton ci-dessous pour simuler le traitement automatique d'une demande d'accès et mesurer concrètement votre gain de temps au quotidien.
          </p>
        </ScrollReveal>

        {/* Interactive Comparison & Simulator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Left panel: Mode selection and diagnosis */}
          <ScrollReveal
            delay={0.1}
            direction="left"
            distance={25}
            className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border border-[#ECE5DB] shadow-2xs h-full"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE0] mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#4A3B2F]">
                  Mode d'affichage
                </span>
                <span className="text-[11px] font-mono text-[#8C7A68]">
                  {mode === "after" ? "Système optimisé" : "Gestion non structurée"}
                </span>
              </div>

              {/* Toggle Switch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 p-1 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8] mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setMode("after");
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    mode === "after"
                      ? "bg-white text-[#2D241E] shadow-2xs border border-[#E2D8CC]"
                      : "text-[#7A6C5E] hover:text-[#2D241E]"
                  }`}
                >
                  ✨ Avec Candya (Fluide)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("before");
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    mode === "before"
                      ? "bg-white text-[#2D241E] shadow-2xs border border-[#E2D8CC]"
                      : "text-[#7A6C5E] hover:text-[#2D241E]"
                  }`}
                >
                  ⚠️ Sans accompagnement
                </button>
              </div>

              {/* Diagnostic items with AnimatePresence */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3 text-xs leading-relaxed"
                >
                  {mode === "after" ? (
                    <>
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[#2D241E] block">
                            Boîte mail à Inbox Zero
                          </span>
                          <span className="text-[#635345]">
                            Chaque email est catégorisé, traité ou préparé avec une réponse soignée.
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[#2D241E] block">
                            Apprenants rassurés sous 24h
                          </span>
                          <span className="text-[#635345]">
                            Zéro litige qui traîne, déblocage des accès immédiat et empathie totale.
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[#2D241E] block">
                            Trésorerie sans impayé
                          </span>
                          <span className="text-[#635345]">
                            Rapprochement hebdomadaire systématique et relances cordiales sous 48h.
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/60 border border-amber-200">
                        <AlertCircle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[#2D241E] block">
                            Inbox saturée & emails oubliés
                          </span>
                          <span className="text-[#635345]">
                            Des dizaines de demandes mélangées aux newsletters sans ordre de priorité.
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/60 border border-amber-200">
                        <AlertCircle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[#2D241E] block">
                            Élèves frustrés qui attendent
                          </span>
                          <span className="text-[#635345]">
                            Des blocages d'accès qui s'enveniment faute de réponse rapide le week-end.
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/60 border border-amber-200">
                        <AlertCircle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[#2D241E] block">
                            Paiements en souffrance
                          </span>
                          <span className="text-[#635345]">
                            Pertes de chiffre d'affaires non identifiées sur les abonnements échoués.
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pt-6 border-t border-[#F0EAE0] mt-6">
              <button
                type="button"
                onClick={onOpenBooking}
                style={{
                  backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                  color: lightness > 55 ? "hsl(var(--theme-h), 28%, 14%)" : "#FFFFFF",
                }}
                className="w-full py-3.5 px-5 rounded-full text-xs font-semibold shadow-xs hover:brightness-95 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <span>Faire le point lors d'un appel découverte (30 min)</span>
                <TrendingUp className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>

          {/* Right panel: Enhanced Simulator UI */}
          <ScrollReveal
            delay={0.2}
            direction="right"
            distance={25}
            className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-[#ECE5DB] shadow-2xs relative h-full"
          >
            <div>
              {/* Header card indicator */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#EAE3D8] mb-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#EAE3D8] text-[10px] font-bold text-[#4A3B2F] uppercase tracking-wider">
                    TEST INTERACTIF
                  </span>
                  <span className="text-xs font-bold text-[#4A3B2F]">
                    Simulation d&apos;une tâche réelle
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--primary-hsl)]">
                  <MousePointer2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Cliquez pour tester en 1 clic</span>
                </div>
              </div>

              {/* Main Card UI */}
              <div
                className={`p-5 sm:p-6 rounded-2xl transition-all duration-300 relative ${
                  mode === "after"
                    ? "bg-white border border-[#E7DFD5] shadow-md shadow-stone-200/40"
                    : "bg-[#EFE8DC]/80 border border-[#DDD3C5] shadow-none"
                }`}
              >
                {/* Task Top Meta */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        mode === "after" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                      }`}
                    />
                    <span className="text-xs sm:text-sm font-bold text-[#2D241E]">
                      Demande d'accès apprenant
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#FAF7F2] border border-[#EAE3D8] text-[10px] font-mono text-[#7A6C5E]">
                      #SAV-{4800 + interactionCount}
                    </span>
                  </div>

                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      mode === "after"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : "bg-amber-100 text-amber-900 border border-amber-200"
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>
                      {mode === "after"
                        ? "Délai moyen de réponse : < 3h"
                        : "Délai moyen constaté : 4 jours"}
                    </span>
                  </div>
                </div>

                {/* Styled preview of drafted compassionate response */}
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE3D8] mb-5 text-xs text-[#4A3B2F] relative font-sans">
                  <div className="flex flex-wrap items-center justify-between gap-1.5 text-[11px] text-[#8C7A68] pb-2 mb-2 border-b border-[#EAE3D8]/80">
                    <span className="min-w-0 break-words">
                      De : <strong>support@votre-ecole.fr</strong> (Géré par Candya)
                    </span>
                    <span className="font-mono text-[10px] shrink-0">Statut : Prêt à l&apos;envoi</span>
                  </div>

                  <p className="leading-relaxed text-[#5C4D3E]">
                    « Bonjour Marc, j&apos;ai bien reçu votre demande. Vos identifiants à l&apos;espace
                    de formation ont été régénérés et votre accès au Module 3 est débloqué.
                    Votre progression est synchronisée. Très bonne session à vous ! »
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-[#EAE3D8]/60 flex flex-wrap items-center justify-between gap-1.5 text-[11px] text-[#7A6C5E]">
                    <span className="font-serif italic">Bienveillance &amp; clarté assurées</span>
                    <span className="text-emerald-700 font-semibold inline-flex items-center gap-1">
                      <Check className="w-3 h-3 shrink-0" /> Zéro charge mentale formateur
                    </span>
                  </div>
                </div>

                {/* Primary Interactive Button & Live Metrics */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    {mode === "after" ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        type="button"
                        onClick={handleSimulateAction}
                        style={{
                          backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                          color: lightness > 55 ? "hsl(var(--theme-h), 28%, 14%)" : "#FFFFFF",
                        }}
                        className="flex-1 px-4 sm:px-5 py-3.5 rounded-full text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg hover:brightness-95 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer group min-h-[44px]"
                      >
                        <Sparkles className="w-4 h-4 text-amber-500 group-hover:rotate-12 transition-transform" />
                        <span>Traiter avec réponse bienveillante</span>
                        <span className="ml-1 px-2.5 py-0.5 rounded-full bg-black/10 text-xs font-mono font-bold tracking-tight">
                          +{interactionCount}
                        </span>
                      </motion.button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSimulateAction}
                        className="flex-1 px-5 py-3.5 rounded-full bg-[#5C4D3E] text-white text-xs sm:text-sm font-medium opacity-85 hover:opacity-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>Répondre dans l'urgence sans modèle (+{interactionCount})</span>
                      </button>
                    )}
                  </div>

                  {/* Real-time Status and ROI Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs">
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EAE3D8]">
                      <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-2xs shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] text-[#8C7A68] uppercase font-bold tracking-wider block">
                          Actions validées
                        </span>
                        <strong className="text-[#2D241E] text-xs font-mono">
                          {interactionCount} action(s) enregistrée(s)
                        </strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80">
                      <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-amber-700 shadow-2xs shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] text-amber-800 uppercase font-bold tracking-wider block">
                          Gain de temps direct (ROI)
                        </span>
                        <strong className="text-amber-950 text-xs font-mono">
                          ⏱️ ~{totalMinutesSaved} min économisées ({hoursSaved}h)
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Ephemeral Toast / Visual feedback notification */}
                  <AnimatePresence>
                    {showSuccessToast && (
                      <motion.div
                        key={toastKey}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`p-3 rounded-xl text-xs font-medium flex items-center justify-between shadow-md ${
                          mode === "after"
                            ? "bg-emerald-600 text-white"
                            : "bg-[#4A3B2F] text-amber-100"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                          <span>{toastMessage}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowSuccessToast(false)}
                          className="text-white/80 hover:text-white text-xs px-1.5 py-0.5 rounded cursor-pointer"
                        >
                          ✕
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Section sous le simulateur : Ce que vous gagnez au quotidien */}
              <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-white border border-[#ECE5DB] shadow-2xs text-xs text-[#635345] leading-relaxed">
                <strong className="text-[#2D241E] text-xs sm:text-sm font-serif block mb-1.5">
                  Ce que vous gagnez au quotidien :
                </strong>
                <p>
                  Plus d'angoisse le matin en ouvrant votre boîte de messagerie. Vous retrouvez votre
                  concentration sur vos programmes de coaching et vos ventes, tandis que tout votre
                  administratif tourne avec précision.
                </p>
              </div>
            </div>

            {/* Final Conversion CTA */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8C7A68] pt-4 border-t border-[#EAE3D8]">
              <span className="text-center sm:text-left">
                Diagnostic gratuit de 30 minutes offert sans engagement
              </span>
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#2D241E] text-white font-semibold text-xs hover:bg-[#4A3B2F] active:scale-95 transition-all shadow-2xs cursor-pointer"
              >
                <span>Réserver mon diagnostic offert (30 min)</span>
                <TrendingUp className="w-3.5 h-3.5 text-amber-300" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
