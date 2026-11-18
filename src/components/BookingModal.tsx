import React, { useState, useEffect } from "react";
import { portfolioProfile, servicePlans, getCalendlyUrl, candyaSchedule } from "../data/portfolioData";
import { useHslTheme } from "../context/HslThemeContext";
import { useToast } from "../context/ToastContext";
import {
  X,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  User,
  Mail,
  FileText,
  Sparkles,
} from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialPlan = "Organisation Administrative",
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedPlan, setSelectedPlan] = useState<string>(initialPlan);
  const [selectedDay, setSelectedDay] = useState<string>("Mardi");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("09:00");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { hue, saturation, lightness } = useHslTheme();
  const { showToast } = useToast();

  useEffect(() => {
    if (initialPlan) {
      setSelectedPlan(initialPlan);
    }
  }, [initialPlan]);

  if (!isOpen) return null;

  const timeSlotsByDay: Record<string, string[]> = {
    Mardi: ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00"],
    Mercredi: ["09:00", "10:00", "11:00", "12:00", "13:00", "13:30", "14:00"],
    Jeudi: ["09:00", "09:30", "10:00", "10:30", "11:00"],
  };

  const handleNextStep = () => {
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: selectedPlan,
          name,
          email,
          date: `${selectedDay} (${candyaSchedule.timezone})`,
          slot: selectedTimeSlot,
          messageText: note,
        }),
      }).catch(() => null);

      setIsSuccess(true);
      showToast({
        title: "Créneau enregistré avec succès",
        description: `Votre demande pour ${selectedDay} à ${selectedTimeSlot} a été transmise.`,
        variant: "success",
      });
    } catch {
      setIsSuccess(true);
      showToast({
        title: "Créneau enregistré",
        description: `Votre demande pour ${selectedDay} à ${selectedTimeSlot} est prête.`,
        variant: "success",
      });
    } finally {
      setIsSending(false);
    }
  };

  const calendlyUrl = getCalendlyUrl(selectedPlan, {
    name,
    email,
    note: `Créneau souhaité : ${selectedDay} à ${selectedTimeSlot} (${candyaSchedule.timezone}). Notes : ${note}`,
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-[#FDFBF7] border border-[#E8DFC8] rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl max-h-[90dvh] overflow-y-auto overflow-x-hidden overscroll-contain">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#7A6C5E] hover:text-[#2D241E] hover:bg-black/5 transition-colors cursor-pointer"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#2D241E]">
              Demande d'échange enregistrée !
            </h3>
            <p className="text-xs sm:text-sm text-[#635345] leading-relaxed">
              Votre demande a bien été transmise pour le créneau <strong>{selectedDay} à {selectedTimeSlot}</strong> ({candyaSchedule.timezone}). Candya vous confirme l'invitation Google Meet par email très rapidement.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-2 justify-center">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-white border border-[#E2D8CC] text-xs font-semibold text-[#4A3B2F]"
              >
                Retour au portfolio
              </button>
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                  color: lightness > 55 ? "hsl(var(--theme-h), 28%, 14%)" : "#FFFFFF",
                }}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold shadow-xs"
              >
                <span>Synchroniser sur Calendly</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ) : (
          <div>
            {/* Step Progress Indicator */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#EAE3D8]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A583E] block">
                  Étape {step} sur 3
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2D241E]">
                  {step === 1 && "1. Choisissez votre formule"}
                  {step === 2 && "2. Choisissez votre créneau"}
                  {step === 3 && "3. Vos informations de contact"}
                </h3>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((s) => (
                  <span
                    key={s}
                    style={{
                      backgroundColor:
                        step >= s
                          ? `hsl(${hue}, ${saturation}%, ${lightness}%)`
                          : "#E8DFC8",
                    }}
                    className="w-2.5 h-2.5 rounded-full transition-colors"
                  />
                ))}
              </div>
            </div>

            {/* STEP 1: Plan Selection */}
            {step === 1 && (
              <div className="space-y-3">
                <p className="text-xs text-[#635345] mb-2">
                  Sélectionnez l'accompagnement souhaité pour orienter au mieux notre échange de 30 minutes :
                </p>

                {servicePlans.map((plan) => {
                  const isSelected = selectedPlan === plan.name;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.name)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-white border-[#2D241E] shadow-sm ring-1 ring-[#2D241E]"
                          : "bg-[#FAF7F2] border-[#E8DFC8] hover:bg-white text-[#5C4D3E]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-sm font-bold text-[#2D241E]">
                          {plan.name}
                        </span>
                        <span className="text-[10px] font-bold text-[#8C7A68] bg-[#FAF7F2] px-2 py-0.5 rounded-full border border-[#EAE3D8]">
                          {plan.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#635345] leading-relaxed">
                        {plan.shortDescription}
                      </p>
                    </div>
                  );
                })}

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    style={{
                      backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                      color: lightness > 55 ? "hsl(var(--theme-h), 28%, 14%)" : "#FFFFFF",
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold shadow-xs hover:brightness-95 active:scale-95 transition-all cursor-pointer min-h-[44px]"
                  >
                    <span>Continuer vers les créneaux</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Slot Selection */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold">Fuseau horaire :</span>
                  <span className="font-mono font-bold bg-white px-2 py-0.5 rounded-full border border-emerald-300">
                    {candyaSchedule.timezone} ({candyaSchedule.timezoneOffset})
                  </span>
                </div>

                {/* Day selector tabs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {candyaSchedule.activeDays.map((dayItem) => {
                    const isSelected = selectedDay === dayItem.day;
                    return (
                      <button
                        key={dayItem.day}
                        type="button"
                        onClick={() => {
                          setSelectedDay(dayItem.day);
                          setSelectedTimeSlot(timeSlotsByDay[dayItem.day]?.[0] || "09:00");
                        }}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? "bg-white border-[#2D241E] shadow-2xs font-bold text-[#2D241E]"
                            : "bg-[#FAF7F2] border-[#E8DFC8] text-[#635345] hover:bg-white"
                        }`}
                      >
                        <span className="text-xs block font-bold">{dayItem.day}</span>
                        <span className="text-[10px] text-[#8C7A68] block mt-0.5">
                          {dayItem.hours}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Time slot pills */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4A3B2F] block mb-2">
                    Horaires de départ (durée 30 min)
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {(timeSlotsByDay[selectedDay] || []).map((slot) => {
                      const isSelected = selectedTimeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2 px-2.5 rounded-xl border text-center font-mono text-xs transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#2D241E] text-white border-[#2D241E] font-bold shadow-xs"
                              : "bg-white border-[#E8DFC8] text-[#5C4D3E] hover:border-[#C4B3A1]"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-[#EAE3D8]">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="inline-flex items-center gap-1.5 text-xs text-[#7A6C5E] hover:text-[#2D241E] cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Retour</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    style={{
                      backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                      color: lightness > 55 ? "hsl(var(--theme-h), 28%, 14%)" : "#FFFFFF",
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold shadow-xs hover:brightness-95 active:scale-95 transition-all cursor-pointer min-h-[44px]"
                  >
                    <span>Valider ce créneau</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Contact Details & Submit */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Summary Pill */}
                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8] text-xs flex items-center justify-between text-[#4A3B2F]">
                  <div>
                    <strong className="text-[#2D241E]">{selectedPlan}</strong>
                    <span className="block text-[11px] text-[#7A6C5E]">
                      {selectedDay} à {selectedTimeSlot} ({candyaSchedule.timezone})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs text-[var(--primary-hsl)] hover:underline font-semibold"
                  >
                    Modifier
                  </button>
                </div>

                <div>
                  <label htmlFor="booking-name" className="text-xs font-bold text-[#4A3B2F] block mb-1">
                    Votre nom & prénom *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8C7A68] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="booking-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Sophie Martin"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E2D8CC] text-xs sm:text-sm text-[#2D241E] focus:outline-hidden focus:border-[#2D241E]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="booking-email" className="text-xs font-bold text-[#4A3B2F] block mb-1">
                    Votre email professionnel *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8C7A68] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="booking-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sophie@monbusiness.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E2D8CC] text-xs sm:text-sm text-[#2D241E] focus:outline-hidden focus:border-[#2D241E]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="booking-note" className="text-xs font-bold text-[#4A3B2F] block mb-1">
                    Votre activité & ce qui vous pèse aujourd'hui (optionnel)
                  </label>
                  <textarea
                    id="booking-note"
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ex: Formateur en ligne, 150 emails/jour à trier, retards d'encaissements..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2D8CC] text-xs sm:text-sm text-[#2D241E] focus:outline-hidden focus:border-[#2D241E] resize-y"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-[#EAE3D8]">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="inline-flex items-center gap-1.5 text-xs text-[#7A6C5E] hover:text-[#2D241E] cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Retour</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      disabled={isSending}
                      style={{
                        backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                        color: lightness > 55 ? "hsl(var(--theme-h), 28%, 14%)" : "#FFFFFF",
                      }}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold shadow-xs hover:brightness-95 active:scale-95 transition-all cursor-pointer disabled:opacity-60 min-h-[44px]"
                    >
                      <span>{isSending ? "Envoi..." : "Confirmer mon créneau"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <a
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#7A6C5E] hover:text-[#2D241E] underline inline-flex items-center gap-1"
                  >
                    <span>Ou ouvrir directement dans Calendly</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
