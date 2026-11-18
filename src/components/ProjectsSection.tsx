import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projectsData } from "../data/portfolioData";
import { Project, Screenshot } from "../portfolio-types";
import { useHslTheme } from "../context/HslThemeContext";
import { ScrollReveal } from "./ScrollReveal";
import {
  FolderKanban,
  CheckCircle2,
  Copy,
  Check,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Calendar,
  Sparkles,
} from "lucide-react";

interface ProjectsSectionProps {
  onOpenBooking: (plan?: string) => void;
}

const easeCurve = [0.16, 1, 0.3, 1] as const;

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenBooking }) => {
  const [activeProjectId, setActiveProjectId] = useState<string>(projectsData[0].id);
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const { hue, saturation, lightness } = useHslTheme();

  const activeProject = projectsData.find((p) => p.id === activeProjectId) || projectsData[0];
  const activeScreenshot = activeProject.screenshots[activeScreenshotIdx] || activeProject.screenshots[0];

  const handleSelectProject = (id: string) => {
    setActiveProjectId(id);
    setActiveScreenshotIdx(0);
  };

  const handleCopyEmail = () => {
    if (!activeProject.emailTemplate) return;
    const { recipient, subject, body } = activeProject.emailTemplate;
    const fullText = `${recipient}\n\nObjet : ${subject}\n\n${body}`;
    navigator.clipboard.writeText(fullText);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handlePrevScreenshot = () => {
    setActiveScreenshotIdx((prev) =>
      prev === 0 ? activeProject.screenshots.length - 1 : prev - 1
    );
  };

  const handleNextScreenshot = () => {
    setActiveScreenshotIdx((prev) =>
      prev === activeProject.screenshots.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section
      id="projets"
      className="py-16 sm:py-24 bg-[#FDFBF7] border-t border-[#EAE3D8] scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E6DDD0] text-xs font-semibold uppercase tracking-wider text-[#7A583E] mb-3 shadow-2xs">
            <FolderKanban className="w-3.5 h-3.5 text-[var(--primary-hsl)]" />
            <span>Études de Cas & Démonstrations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2D241E] tracking-tight">
            Cas concrets & Systèmes opérationnels
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#635345] leading-relaxed">
            Découvrez comment j'organise, structure et automatise le quotidien d'agences et de coachs en ligne.
          </p>
        </ScrollReveal>

        {/* Project Selector Segmented Bar with progressive entrance */}
        <ScrollReveal delay={0.1} distance={18}>
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 p-1.5 bg-[#FAF7F2] rounded-2xl border border-[#E8DFC8] mb-10 w-full max-w-full sm:max-w-4xl mx-auto no-scrollbar">
            {projectsData.map((project) => {
              const isActive = project.id === activeProjectId;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => handleSelectProject(project.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer relative ${
                    isActive
                      ? "bg-white text-[#2D241E] shadow-2xs border border-[#E2D8CC]"
                      : "text-[#635345] hover:text-[#2D241E] hover:bg-white/60"
                  }`}
                >
                  <span className="font-mono text-xs opacity-60">{project.number}</span>
                  <span>{project.title}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Main Project Card with smooth layout transition */}
        <ScrollReveal delay={0.18} distance={24}>
          <div className="bg-white rounded-3xl border border-[#ECE5DB] p-6 sm:p-9 shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: easeCurve }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left Column: Case Study Details */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Tag & Number */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-[#8C7A68] shrink-0">
                      PROJET {activeProject.number} / 04
                    </span>
                    <span
                      style={{
                        backgroundColor: `hsla(${hue}, ${saturation}%, 94%, 1)`,
                        color: `hsl(${hue}, ${saturation}%, 38%)`,
                        borderColor: `hsla(${hue}, ${saturation}%, 85%, 1)`,
                      }}
                      className="text-xs font-bold px-3 py-1 rounded-full border max-w-full"
                    >
                      {activeProject.highlightBadge}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D241E]">
                      {activeProject.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#635345] mt-1.5 leading-relaxed">
                      {activeProject.shortDescription}
                    </p>
                  </div>

                  {/* Tags & Tools */}
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#EAE3D8] text-[11px] font-medium text-[#4A3B2F]"
                      >
                        {tool}
                      </span>
                    ))}
                    {activeProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full bg-white border border-[#E8DFC8] text-[11px] text-[#7A6C5E]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Need / Solution / Result Block */}
                  <div className="space-y-4 pt-2 border-t border-[#F0EAE0]">
                    <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#EFE8DD]">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A7969] block mb-1">
                        Le Besoin Initial
                      </span>
                      <p className="text-xs text-[#5C4D3E] leading-relaxed">
                        {activeProject.need}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D8]">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A583E] block mb-1">
                        Ce que j'ai mis en place
                      </span>
                      <p className="text-xs text-[#3E3228] leading-relaxed">
                        {activeProject.solution}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                        Le Résultat Concret
                      </span>
                      <p className="text-xs text-[#2D241E] font-medium leading-relaxed">
                        {activeProject.result}
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onOpenBooking(activeProject.title)}
                      style={{
                        backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                        color: lightness > 55 ? "hsl(var(--theme-h), 28%, 14%)" : "#FFFFFF",
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-semibold shadow-xs hover:brightness-95 active:scale-95 transition-all cursor-pointer min-h-[44px]"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Mettre en place un système similaire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right Column: Visual Showcase & Screenshot Explorer */}
                <div className="lg:col-span-7 space-y-4">
                  {/* Screenshot Header & Multi-View Tabs */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
                    <div className="flex items-center gap-1.5">
                      {activeProject.screenshots.map((s, idx) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setActiveScreenshotIdx(idx)}
                          className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            activeScreenshotIdx === idx
                              ? "bg-[#2D241E] text-white"
                              : "bg-[#FAF7F2] border border-[#E8DFC8] text-[#635345] hover:bg-white"
                          }`}
                        >
                          Vue {idx + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setLightboxOpen(true)}
                      className="inline-flex items-center gap-1.5 text-xs text-[#7A6C5E] hover:text-[#2D241E] cursor-pointer"
                      title="Agrandir la capture en plein écran"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Plein écran</span>
                    </button>
                  </div>

                  {/* Main Image Display with Browser Mockup Frame & Fade Transition */}
                  <div className="relative rounded-2xl overflow-hidden border border-[#E4DACD] bg-[#2D241E]/5 shadow-sm group">
                    {/* Browser Mockup Top Bar */}
                    <div className="bg-[#FAF7F2] border-b border-[#E8DFC8] px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2 min-w-0">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E5837B]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E6BF63]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#82C97A]" />
                      </div>
                      <span className="text-[11px] text-[#7A6C5E] font-mono truncate min-w-0 flex-1 text-center">
                        {activeScreenshot.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => setLightboxOpen(true)}
                        className="text-[#7A6C5E] hover:text-[#2D241E] shrink-0"
                        aria-label="Ouvrir en plein écran"
                      >
                        <Maximize2 className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Screenshot Image with cross-fade */}
                    <div
                      onClick={() => setLightboxOpen(true)}
                      className="cursor-zoom-in relative bg-[#F7F3EB] aspect-16/10 flex items-center justify-center overflow-hidden"
                    >
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeScreenshot.id}
                          src={activeScreenshot.imageUrl}
                          alt={activeScreenshot.title}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="w-full h-full object-contain object-top group-hover:scale-101 transition-transform duration-300"
                        />
                      </AnimatePresence>
                    </div>

                    {/* Subtitle Caption */}
                    <div className="p-3 bg-white border-t border-[#ECE5DB] flex items-center justify-between text-xs text-[#635345]">
                      <span className="font-medium truncate">{activeScreenshot.subtitle}</span>
                      <span className="text-[11px] font-mono text-[#8C7A68] shrink-0 ml-2">
                        {activeScreenshotIdx + 1} / {activeProject.screenshots.length}
                      </span>
                    </div>
                  </div>

                  {/* Special Section: Copyable Email Template for Project 03 */}
                  {activeProject.emailTemplate && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8] shadow-2xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-[#EAE3D8]">
                        <div className="flex items-center gap-2 min-w-0">
                          <Sparkles className="w-4 h-4 text-[var(--primary-hsl)] shrink-0" />
                          <span className="text-xs font-bold uppercase tracking-wider text-[#2D241E]">
                            Modèle de Réponse Rédigé &amp; Prêt à l&apos;Emploi
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E2D8CC] text-xs font-semibold text-[#4A3B2F] hover:bg-[#FAF7F2] hover:border-[#C4B3A1] shadow-2xs transition-all cursor-pointer"
                        >
                          {copiedEmail ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">Copié !</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copier l'email</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="p-4 rounded-xl bg-white border border-[#ECE5DB] font-sans text-xs text-[#3E3228] space-y-2 whitespace-pre-wrap leading-relaxed">
                        <p className="font-semibold text-[#2D241E]">
                          Objet : {activeProject.emailTemplate.subject}
                        </p>
                        <p className="text-[#635345] pt-1">
                          {activeProject.emailTemplate.recipient}
                        </p>
                        <p>{activeProject.emailTemplate.body}</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>

      {/* Fullscreen Lightbox Modal with AnimatePresence */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 text-white"
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/20">
              <div className="min-w-0">
                <h4 className="text-sm sm:text-base font-bold truncate">
                  {activeScreenshot.title}
                </h4>
                <p className="text-xs text-white/70 truncate">{activeScreenshot.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer shrink-0"
                aria-label="Fermer le plein écran"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Image View with Motion */}
            <div className="relative flex-1 flex items-center justify-center py-4 overflow-auto overscroll-contain">
              <button
                type="button"
                onClick={handlePrevScreenshot}
                className="absolute left-2 sm:left-4 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer z-10"
                aria-label="Vue précédente"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <motion.img
                key={activeScreenshot.id}
                src={activeScreenshot.imageUrl}
                alt={activeScreenshot.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="max-h-[75dvh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
              />

              <button
                type="button"
                onClick={handleNextScreenshot}
                className="absolute right-2 sm:right-4 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer z-10"
                aria-label="Vue suivante"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Footer Thumbnails */}
            <div className="pt-3 border-t border-white/20 flex items-center justify-center gap-2 overflow-x-auto">
              {activeProject.screenshots.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveScreenshotIdx(idx)}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    activeScreenshotIdx === idx
                      ? "border-white scale-105"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={s.imageUrl}
                    alt={s.title}
                    className="w-16 h-10 object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
