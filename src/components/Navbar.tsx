import React, { useState, useEffect } from "react";
import { portfolioProfile } from "../data/portfolioData";
import { useHslTheme } from "../context/HslThemeContext";
import {
  Calendar,
  Clock,
  Palette,
  Sparkles,
  Menu,
  X,
  Bot,
  ExternalLink,
} from "lucide-react";

interface NavbarProps {
  onOpenBooking: (plan?: string) => void;
  onOpenSchedule: () => void;
  onOpenAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenSchedule,
  onOpenAssistant,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isTunerOpen, setIsTunerOpen, hue, saturation, lightness } = useHslTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "À propos", href: "#a-propos" },
    { label: "Expertise", href: "#expertise" },
    { label: "Outils", href: "#outils" },
    { label: "Cas concrets", href: "#projets" },
    { label: "Méthode", href: "#methode" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7DFD3] shadow-xs py-3"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
          {/* Zone 1: Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2 sm:gap-3 shrink-0 group focus:outline-hidden min-w-0 max-w-[55vw] sm:max-w-none"
          >
            <div
              style={{
                backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                color: lightness > 55 ? "hsl(var(--theme-h), 28%, 14%)" : "#FFFFFF",
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center font-serif text-sm font-bold shadow-xs transition-colors duration-200 shrink-0"
            >
              CR
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-sm sm:text-lg font-bold tracking-tight text-[#2D241E] leading-none group-hover:text-[var(--primary-hsl)] transition-colors truncate">
                {portfolioProfile.shortName}
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#7A6C5E] font-medium leading-tight mt-0.5 truncate max-w-[10rem] sm:max-w-none">
                {portfolioProfile.title}
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-semibold tracking-wide text-[#635345]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap hover:text-[#2D241E] hover:underline underline-offset-4 decoration-[var(--primary-hsl)] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={onOpenAssistant}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F2EDE5] text-[#4A3B2F] hover:bg-white hover:text-[#2D241E] border border-[#E2D8CC] transition-all cursor-pointer whitespace-nowrap"
            >
              <Bot className="w-3.5 h-3.5 text-[var(--primary-hsl)]" />
              <span>Assistant IA</span>
            </button>
          </nav>

          {/* Zone 3: Actions & CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Live Availability Pill */}
            <button
              type="button"
              onClick={onOpenSchedule}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold hover:bg-emerald-100 transition-colors cursor-pointer"
              title="Consulter les disponibilités hebdomadaires (EAT)"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="whitespace-nowrap">Dispo • EAT (UTC+3)</span>
            </button>

            {/* Palette Theme Trigger (icon only even on desktop) */}
            <button
              type="button"
              onClick={() => setIsTunerOpen(!isTunerOpen)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-[#E5DDD2] text-[#635345] hover:text-[#2D241E] hover:border-[#D5C7B7] shadow-2xs inline-flex items-center justify-center transition-colors cursor-pointer shrink-0"
              title="Personnaliser les couleurs du thème"
              aria-label="Palette de couleurs"
            >
              <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--primary-hsl)]" />
            </button>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={() => onOpenBooking()}
              style={{
                backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                color: lightness > 55 ? "hsl(var(--theme-h), 28%, 14%)" : "#FFFFFF",
              }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-xs hover:brightness-95 active:scale-95 transition-all cursor-pointer whitespace-nowrap min-h-[38px] sm:min-h-[40px]"
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Prendre un RDV</span>
              <span className="inline sm:hidden">RDV</span>
              <span className="hidden xl:inline text-[10px] bg-white/25 px-1.5 py-0.5 rounded-full font-normal">
                30 min offert
              </span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#2D241E] hover:bg-black/5 transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-3 sm:mx-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD3] shadow-lg space-y-3 max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-[#4A3B2F] hover:bg-white hover:text-[#2D241E] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#EAE3D8] flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAssistant();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white border border-[#E2D8CC] text-xs font-semibold text-[#2D241E]"
            >
              <Bot className="w-4 h-4 text-[var(--primary-hsl)]" />
              <span>Ouvrir l'Assistant IA</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSchedule();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900"
            >
              <Clock className="w-4 h-4 text-emerald-700" />
              <span>Disponibilités hebdomadaires (EAT)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              style={{
                backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                color: lightness > 55 ? "hsl(var(--theme-h), 28%, 14%)" : "#FFFFFF",
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold shadow-xs"
            >
              <Calendar className="w-4 h-4" />
              <span>Réserver mon diagnostic 30 min offert</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
