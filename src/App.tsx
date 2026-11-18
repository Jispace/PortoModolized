import React, { useState } from "react";
import { motion, type Variants } from "motion/react";
import { HslThemeProvider, useHslTheme } from "./context/HslThemeContext";
import { ToastProvider, useToast } from "./context/ToastContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { AchievementsCounter } from "./components/AchievementsCounter";
import { BentoGrid } from "./components/BentoGrid";
import { ProjectsSection } from "./components/ProjectsSection";
import { ToolsMinimalGrid } from "./components/ToolsMinimalGrid";
import { BeforeAfterSection } from "./components/BeforeAfterSection";
import { ProcessSection } from "./components/ProcessSection";
import { AuditInspector } from "./components/AuditInspector";
import { AboutSection } from "./components/AboutSection";
import { FAQSection } from "./components/FAQSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { BookingModal } from "./components/BookingModal";
import { ScheduleModal } from "./components/ScheduleModal";
import { HslTunerModal } from "./components/HslTunerModal";
import { AssistantModal } from "./components/AssistantModal";
import { DotCursor } from "./components/DotCursor";
import { Calendar, Bot } from "lucide-react";

const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const FadeInUpSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    variants={fadeInUpVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: "some" }}
    className="will-change-[transform,opacity] motion-reduce:!opacity-100 motion-reduce:!transform-none"
  >
    {children}
  </motion.div>
);

function PortfolioContent() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("Organisation Administrative");
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const { hue, saturation, lightness } = useHslTheme();
  const { showToast } = useToast();

  const handleOpenBooking = (plan?: string) => {
    if (plan) setSelectedPlan(plan);
    setIsBookingOpen(true);
    showToast({
      title: "Réservation de créneau ouverte",
      description: plan
        ? `Formule : ${plan} · Appel découverte 30 min offert`
        : "Choisissez votre formule et votre créneau de 30 min offert.",
      variant: "accent",
    });
  };

  const handleOpenSchedule = () => {
    setIsScheduleOpen(true);
    showToast({
      title: "Disponibilités hebdomadaires",
      description: "Créneaux ouverts Mardi, Mercredi et Jeudi (EAT / UTC+3).",
      variant: "info",
    });
  };

  const handleOpenAssistant = () => {
    setIsAssistantOpen(true);
    showToast({
      title: "Assistant IA prêt",
      description: "Analysez une demande prospect et générez une réponse sur-mesure.",
      variant: "info",
    });
  };

  return (
    <div className="min-h-dvh bg-[#FDFBF7] text-[#2D241E] flex flex-col font-sans selection:bg-[#E0A97E]/30 selection:text-[#2D241E] w-full max-w-full overflow-x-clip">
      {/* Custom Interactive Dot Cursor */}
      <DotCursor />

      {/* Top Navbar */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenSchedule={handleOpenSchedule}
        onOpenAssistant={handleOpenAssistant}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full max-w-full overflow-x-clip">
        <FadeInUpSection>
          <Hero
            onOpenBooking={handleOpenBooking}
            onOpenSchedule={handleOpenSchedule}
          />
        </FadeInUpSection>

        <FadeInUpSection>
          <AchievementsCounter />
        </FadeInUpSection>

        <FadeInUpSection>
          <AboutSection />
        </FadeInUpSection>

        <FadeInUpSection>
          <BentoGrid onOpenBooking={handleOpenBooking} />
        </FadeInUpSection>

        <FadeInUpSection>
          <ToolsMinimalGrid />
        </FadeInUpSection>

        <FadeInUpSection>
          <ProjectsSection onOpenBooking={handleOpenBooking} />
        </FadeInUpSection>

        <FadeInUpSection>
          <BeforeAfterSection />
        </FadeInUpSection>

        <FadeInUpSection>
          <ProcessSection onOpenBooking={handleOpenBooking} />
        </FadeInUpSection>

        <FadeInUpSection>
          <AuditInspector onOpenBooking={() => handleOpenBooking("Diagnostic Découverte")} />
        </FadeInUpSection>

        <FadeInUpSection>
          <FAQSection onOpenBooking={() => handleOpenBooking("Diagnostic Découverte")} />
        </FadeInUpSection>

        <FadeInUpSection>
          <ContactSection onOpenBooking={handleOpenBooking} />
        </FadeInUpSection>
      </main>

      {/* Footer */}
      <FadeInUpSection>
        <Footer />
      </FadeInUpSection>

      {/* Floating Action Button (Bottom Right) */}
      <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 flex flex-col gap-2 items-end">
        <div className="flex items-center gap-2">
          {/* Assistant IA shortcut */}
          <button
            type="button"
            onClick={handleOpenAssistant}
            className="p-2.5 sm:p-3 rounded-full bg-white border border-[#E5DDD2] text-[#4A3B2F] shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Assistant IA Réponses Prospects"
            aria-label="Assistant IA"
          >
            <Bot className="w-4 h-4 text-[var(--primary-hsl)]" />
          </button>

          {/* Primary Quick Booking Floating Button */}
          <button
            type="button"
            onClick={() => handleOpenBooking()}
            style={{
              backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
              color: lightness > 55 ? "hsl(var(--theme-h), 28%, 14%)" : "#FFFFFF",
            }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-102 active:scale-95 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Réserver un créneau</span>
            <span className="inline sm:hidden">RDV 30m</span>
          </button>
        </div>
      </div>

      {/* Modals & Dialogs */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialPlan={selectedPlan}
      />

      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        onOpenBooking={handleOpenBooking}
      />

      <HslTunerModal />

      <AssistantModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <HslThemeProvider>
      <ToastProvider>
        <PortfolioContent />
      </ToastProvider>
    </HslThemeProvider>
  );
}
