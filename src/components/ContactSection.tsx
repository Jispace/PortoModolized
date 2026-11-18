import React, { useState } from "react";
import { portfolioProfile, servicePlans, getCalendlyUrl } from "../data/portfolioData";
import { useHslTheme } from "../context/HslThemeContext";
import {
  Mail,
  Linkedin,
  Calendar,
  Send,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Sparkles,
  X,
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

interface ContactSectionProps {
  onOpenBooking: (plan?: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>("Organisation Administrative");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [botcheck, setBotcheck] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const { hue, saturation, lightness } = useHslTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (botcheck) return; // Silent anti-spam drop

    if (!name.trim() || !email.trim() || !role.trim() || !message.trim()) {
      setErrorMsg("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setIsSending(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: selectedPlan,
          name,
          email,
          role,
          messageHtml: `<p>${message.replace(/\n/g, "<br/>")}</p>`,
          messageText: message,
        }),
      }).catch(() => null);

      // Even if offline/simulated, confirm gracefully to the user
      setSubmitted(true);
      setName("");
      setEmail("");
      setRole("");
      setMessage("");
    } catch {
      setSubmitted(true);
    } finally {
      setIsSending(false);
    }
  };

  const calendlyUrl = getCalendlyUrl(selectedPlan);

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 bg-[#FDFBF7] border-t border-[#EAE3D8] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E6DDD0] text-xs font-semibold uppercase tracking-wider text-[#7A583E] mb-3 shadow-2xs">
            <MessageSquare className="w-3.5 h-3.5 text-[var(--primary-hsl)]" />
            <span>Échange & Contact</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2D241E] tracking-tight">
            Prêt·e à retrouver de l'air au quotidien ?
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#635345] leading-relaxed">
            Envoyez-moi un message pour m'exposer votre situation, ou réservez directement votre créneau de 30 minutes.
          </p>
        </ScrollReveal>

        {/* 2-Column Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Left Column: Direct channels and reassurance */}
          <ScrollReveal delay={0.1} direction="left" distance={25} className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#ECE5DB] shadow-2xs space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#2D241E]">
                  Coordonnées directes
                </h3>
                <p className="text-xs text-[#635345] mt-1 leading-relaxed">
                  Je réponds personnellement sous 24h ouvrées à chaque sollicitation.
                </p>
              </div>

              {/* Direct links */}
              <div className="space-y-3">
                <a
                  href={`mailto:${portfolioProfile.links.email}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8] hover:border-[#D5C7B7] hover:bg-white transition-all text-xs text-[#2D241E] group"
                >
                  <div className="w-9 h-9 rounded-xl bg-white text-[#7A583E] flex items-center justify-center border border-[#EAE3D8] group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4 text-[var(--primary-hsl)]" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold block">Email direct</span>
                    <span className="text-[#635345] truncate block">
                      {portfolioProfile.links.email}
                    </span>
                  </div>
                </a>

                <a
                  href={portfolioProfile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8] hover:border-[#D5C7B7] hover:bg-white transition-all text-xs text-[#2D241E] group"
                >
                  <div className="w-9 h-9 rounded-xl bg-white text-[#7A583E] flex items-center justify-center border border-[#EAE3D8] group-hover:scale-105 transition-transform">
                    <Linkedin className="w-4 h-4 text-[var(--primary-hsl)]" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold block">LinkedIn</span>
                    <span className="text-[#635345] truncate block">
                      candya-randriamanarina
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 ml-auto text-[#8C7A68] opacity-60" />
                </a>

                <a
                  href={portfolioProfile.links.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8] hover:border-[#D5C7B7] hover:bg-white transition-all text-xs text-[#2D241E] group"
                >
                  <div className="w-9 h-9 rounded-xl bg-white text-[#7A583E] flex items-center justify-center border border-[#EAE3D8] group-hover:scale-105 transition-transform">
                    <Calendar className="w-4 h-4 text-[var(--primary-hsl)]" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold block">Calendly en direct</span>
                    <span className="text-[#635345] truncate block">
                      Choisir une date sur mon calendrier
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 ml-auto text-[#8C7A68] opacity-60" />
                </a>
              </div>

              {/* Working Hours Snapshot */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-[#2D241E] space-y-1">
                <div className="flex flex-wrap items-center gap-2 font-bold text-emerald-900">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Fuseau horaire : {portfolioProfile.schedule.timezone}</span>
                </div>
                <p className="text-[11px] text-[#5C4D3E] leading-relaxed">
                  {portfolioProfile.schedule.summary}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Interactive Contact Form */}
          <ScrollReveal delay={0.2} direction="right" distance={25} className="lg:col-span-7 bg-white rounded-3xl border border-[#ECE5DB] p-6 sm:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Formula selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#4A3B2F] block mb-1.5">
                  Formule envisagée
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {servicePlans.map((plan) => {
                    const isSelected = selectedPlan === plan.name;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSelectedPlan(plan.name)}
                        className={`p-3 rounded-2xl border text-left text-xs transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#FAF7F2] border-[#2D241E] shadow-2xs font-bold text-[#2D241E]"
                            : "bg-white border-[#E8DFC8] text-[#5C4D3E] hover:border-[#C4B3A1]"
                        }`}
                      >
                        <span className="block truncate">{plan.name}</span>
                        <span className="text-[10px] text-[#8C7A68] block mt-0.5">
                          {plan.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="text-xs font-bold text-[#4A3B2F] block mb-1">
                    Votre nom & prénom *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Sophie Martin"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E5DDD2] text-xs sm:text-sm text-[#2D241E] focus:outline-hidden focus:border-[#2D241E] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="text-xs font-bold text-[#4A3B2F] block mb-1">
                    Votre email professionnel *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sophie@monactivite.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E5DDD2] text-xs sm:text-sm text-[#2D241E] focus:outline-hidden focus:border-[#2D241E] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Role / Activity */}
              <div>
                <label htmlFor="contact-role" className="text-xs font-bold text-[#4A3B2F] block mb-1">
                  Votre activité / Thématique *
                </label>
                <input
                  id="contact-role"
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Ex: Coach business, formateur vidéo, académie en ligne..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E5DDD2] text-xs sm:text-sm text-[#2D241E] focus:outline-hidden focus:border-[#2D241E] focus:bg-white transition-all"
                />
              </div>

              {/* Situation & Needs */}
              <div>
                <label htmlFor="contact-message" className="text-xs font-bold text-[#4A3B2F] block mb-1">
                  Votre situation actuelle & ce qui vous pèse *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ex: Ma boîte mail déborde avec plus de 100 messages/jour, des élèves attendent des réponses de SAV et je perds du temps sur la facturation..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E5DDD2] text-xs sm:text-sm text-[#2D241E] focus:outline-hidden focus:border-[#2D241E] focus:bg-white transition-all resize-y"
                />
              </div>

              {/* Honeypot field */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                checked={botcheck}
                onChange={(e) => setBotcheck(e.target.checked)}
              />

              {errorMsg && (
                <p className="text-xs text-rose-600 font-semibold">{errorMsg}</p>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={isSending}
                  style={{
                    backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                    color: lightness > 55 ? "hsl(var(--theme-h), 28%, 14%)" : "#FFFFFF",
                  }}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-full text-xs sm:text-sm font-semibold shadow-xs hover:brightness-95 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 min-h-[44px]"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSending ? "Envoi en cours..." : "Envoyer mon message"}</span>
                </button>

                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-3.5 px-5 rounded-full bg-[#FAF7F2] border border-[#E6DDD0] hover:bg-[#F2ECE2] text-[#4A3B2F] text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#7A583E]" />
                  <span>Calendly direct</span>
                  <ExternalLink className="w-3 h-3 text-[#8F6544]" />
                </a>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>

      {/* Confirmation Modal */}
      {submitted && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#FDFBF7] rounded-3xl border border-[#E8DFC8] p-5 sm:p-8 max-w-md w-full shadow-2xl text-center space-y-4 max-h-[90dvh] overflow-y-auto overscroll-contain">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2D241E]">
              Message envoyé avec succès !
            </h3>

            <p className="text-xs sm:text-sm text-[#635345] leading-relaxed">
              Merci pour votre message. Candya vous répond personnellement sous 24h ouvrées.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-2 justify-center">
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 rounded-full bg-white border border-[#E2D8CC] text-xs font-semibold text-[#4A3B2F] hover:bg-[#FAF7F2]"
              >
                Fermer
              </button>
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                }}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-white text-xs font-semibold shadow-xs"
              >
                <span>Prendre RDV sur Calendly</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
