import React, { useState } from "react";
import { portfolioProfile } from "../data/portfolioData";
import { useHslTheme } from "../context/HslThemeContext";
import {
  CalendarDays,
  Linkedin,
  Mail,
  ArrowUp,
  Palette,
  Share2,
  Copy,
  Check,
  MessageCircle,
} from "lucide-react";

export const Footer: React.FC = () => {
  const { setIsTunerOpen, hue, saturation, lightness } = useHslTheme();
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "https://candya-portfolio.app";
  };

  const shareTitle = `${portfolioProfile.name} — Assistante Virtuelle & Support Client Écrit`;
  const shareSummary = `Découvrez le portfolio de ${portfolioProfile.name}, Assistante Virtuelle spécialisée pour coachs et formateurs en ligne.`;

  const handleCopyLink = async () => {
    try {
      const url = getShareUrl();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <footer className="py-12 bg-[#FAF7F2] border-t border-[#EAE3D8] text-xs text-[#7A6C5E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#EAE3D8]">
          {/* Brand info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-serif text-lg font-bold text-[#2D241E]">
              {portfolioProfile.name}
            </span>
            <p className="text-xs text-[#635345] mt-0.5">
              {portfolioProfile.subtitle} · {portfolioProfile.targetAudience}
            </p>
          </div>

          {/* Social / Direct Channel Icons */}
          <div className="flex items-center gap-3">
            <a
              href={portfolioProfile.links.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white border border-[#E8DFC8] flex items-center justify-center text-[#7A583E] hover:bg-[#F2ECE2] hover:text-[#2D241E] transition-colors shadow-2xs"
              title="Prendre rendez-vous sur Calendly"
              aria-label="Calendly"
            >
              <CalendarDays className="w-4 h-4" />
            </a>

            <a
              href={portfolioProfile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white border border-[#E8DFC8] flex items-center justify-center text-[#7A583E] hover:bg-[#F2ECE2] hover:text-[#2D241E] transition-colors shadow-2xs"
              title="Profil LinkedIn de Candya"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${portfolioProfile.links.email}`}
              className="w-10 h-10 rounded-full bg-white border border-[#E8DFC8] flex items-center justify-center text-[#7A583E] hover:bg-[#F2ECE2] hover:text-[#2D241E] transition-colors shadow-2xs"
              title="Envoyer un email direct"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Utility buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsTunerOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white border border-[#E8DFC8] hover:bg-[#FAF7F2] text-[#5C4D3E] text-xs font-medium transition-colors cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5 text-[var(--primary-hsl)]" />
              <span>Palette de couleurs</span>
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white border border-[#E8DFC8] hover:bg-[#FAF7F2] text-[#5C4D3E] text-xs font-medium transition-colors cursor-pointer"
              title="Remonter en haut de page"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Haut de page</span>
            </button>
          </div>
        </div>

        {/* Social Share & Recommendation Section */}
        <div className="py-6 border-b border-[#EAE3D8] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <div
              style={{
                backgroundColor: `hsla(${hue}, ${saturation}%, 65%, 0.15)`,
                color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-[#2D241E] text-xs block">
                Partager ce portfolio
              </span>
              <p className="text-[11px] text-[#7A6C5E]">
                Recommandez le profil de Candya à un coach, formateur ou confrère de votre réseau.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
            {/* Copier le lien direct avec état de validation */}
            <button
              type="button"
              onClick={handleCopyLink}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-200 cursor-pointer ${
                copied
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800 shadow-xs"
                  : "bg-white border-[#E8DFC8] text-[#4A3B2F] hover:bg-[#F2ECE2] hover:border-[#D5C7B5]"
              }`}
              title="Copier le lien direct vers le portfolio"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Lien copié !</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#7A583E]" />
                  <span>Copier le lien</span>
                </>
              )}
            </button>

            {/* LinkedIn Share */}
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl())}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E8DFC8] text-[#4A3B2F] hover:text-[#0A66C2] hover:bg-[#F2ECE2] hover:border-[#0A66C2]/40 text-xs font-medium transition-colors"
              title="Partager sur LinkedIn"
              aria-label="Partager sur LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span className="hidden md:inline">LinkedIn</span>
            </a>

            {/* X / Twitter Share */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareSummary)}&url=${encodeURIComponent(getShareUrl())}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E8DFC8] text-[#4A3B2F] hover:text-black hover:bg-[#F2ECE2] text-xs font-medium transition-colors"
              title="Partager sur X (Twitter)"
              aria-label="Partager sur X"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="hidden md:inline">X</span>
            </a>

            {/* WhatsApp Share */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareSummary + " " + getShareUrl())}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E8DFC8] text-[#4A3B2F] hover:text-emerald-700 hover:bg-[#F2ECE2] text-xs font-medium transition-colors"
              title="Partager via WhatsApp"
              aria-label="Partager via WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>

            {/* Email Share */}
            <a
              href={`mailto:?subject=${encodeURIComponent("Recommandation : " + shareTitle)}&body=${encodeURIComponent(shareSummary + "\n\nConsulter le profil et les cas concrets : " + getShareUrl())}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E8DFC8] text-[#4A3B2F] hover:bg-[#F2ECE2] text-xs font-medium transition-colors"
              title="Recommander par email"
              aria-label="Recommander par email"
            >
              <Mail className="w-3.5 h-3.5 text-[#7A583E]" />
              <span className="hidden md:inline">Email</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright & timezone note */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#8C7A68]">
          <span>
            © {new Date().getFullYear()} {portfolioProfile.name}. Tous droits réservés.
          </span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Madagascar · East Africa Time (EAT, UTC+3)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
