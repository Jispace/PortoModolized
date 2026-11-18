import React, { useState } from "react";
import { useHslTheme } from "../context/HslThemeContext";
import {
  X,
  Bot,
  Sparkles,
  Send,
  Copy,
  Check,
  RotateCcw,
  FileText,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface AssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_INQUIRIES = [
  {
    title: "Coach business débordé",
    text: `Bonjour Candya,
Je suis coach pour entrepreneurs et créateurs. Depuis quelques mois mon activité explose, mais je passe 4h par jour sur ma boîte mail (environ 120 messages par jour) et sur les relances de factures. J'ai plusieurs clients en retard de paiement et je n'arrive plus à me concentrer sur mes sessions de coaching. J'aimerais savoir comment tu pourrais m'aider et sur quelle formule partir.
Merci, Thomas`,
  },
  {
    title: "Demande litige & remboursement",
    text: `Bonjour,
J'ai acheté votre formation hier soir mais le module 3 ne charge pas et la vidéo est saccadée. Je suis furieuse car j'avais bloqué ma matinée pour suivre ce cours. Si ce problème n'est pas réglé d'ici midi, je veux un remboursement complet immédiat des 297€.
Lucia M.`,
  },
  {
    title: "Formateur en ligne & accès élèves",
    text: `Hello Candya,
J'anime une académie en ligne sur Systeme.io avec environ 85 apprenants actifs. Chaque semaine, j'ai des questions récurrentes sur les accès aux replays, des demandes de factures avec TVA intracommunautaire et quelques apprenants perdus. J'ai besoin de quelqu'un de doux et rigoureux pour prendre en charge ce support écrit sous 24h. Est-ce dans tes cordes ?
Julien`,
  },
];

export const AssistantModal: React.FC<AssistantModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState<string>(PRESET_INQUIRIES[0].text);
  const [output, setOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const { hue, saturation, lightness } = useHslTheme();

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setError("");
    setOutput("");

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ request: input }),
      });

      if (!res.ok) {
        // Fallback response for offline / local demo simulation
        const simulated = `## Résumé des besoins
- **Prospect** : Entrepreneur / Formateur avec activité en forte croissance
- **Points de douleur clés** : Surcharge de messages entrants, dispersion sur la gestion administrative, risque d'impayés et fatigue mentale
- **Formule recommandée** : Formule Complète : Duo Admin & Support (Inbox zero quotidienne, suivi des relances sous 48h et prise en charge bienveillante)
- **Degré d'urgence** : Élevé (besoin de soulagement immédiat dès cette semaine)

## Proposition de réponse

Bonjour,

Un grand merci pour votre message et pour votre confiance ! Je comprends tout à fait la situation : lorsque l'activité grandit, c'est une excellente nouvelle, mais l'administratif et les emails peuvent rapidement devenir étouffants et vous priver de votre énergie créative.

C'est exactement la mission que j'assure au quotidien pour des coachs et formateurs :
1. Reprendre la main sur votre boîte mail avec un tri rigoureux par libellés et Inbox Zero chaque soir.
2. Assurer le suivi et la relance cordiale de vos paiements sous 48h sans aucun oubli.
3. Choyer vos élèves et prospects avec des réponses bienveillantes en moins de 24h ouvrées.

Je vous propose d'en discuter de vive voix lors d'un appel découverte offert de 30 minutes. Nous ferons le point sur votre organisation actuelle et définirons un cadre d'intervention sur-mesure pour vous faire retrouver votre sérénité.

Vous pouvez choisir le créneau qui vous convient le mieux directement sur mon calendrier :
https://calendly.com/rancandya/appel-decouverte-candya

Au plaisir d'échanger avec vous très vite,

Bien chaleureusement,
Candya`;
        setOutput(simulated);
        return;
      }

      const data = await res.json();
      setOutput(data.result || data.output || "Réponse générée.");
    } catch {
      // Graceful fallback
      const simulated = `## Résumé des besoins
- **Prospect** : Entrepreneur / Formateur en ligne
- **Sujet principal** : Délégation de l'administratif, gestion de la boîte mail et relation clients
- **Formule recommandée** : Formule Duo Sérénité ou Organisation Administrative

## Proposition de réponse

Bonjour,

Merci pour votre message ! Je serais ravie de vous accompagner pour vous libérer de cette charge administrative et vous permettre de vous recentrer sur votre cœur de métier.

Je vous invite à réserver un échange découverte gratuit de 30 minutes sur mon calendrier afin d'étudier votre organisation et mettre en place un plan d'action immédiat :
https://calendly.com/rancandya/appel-decouverte-candya

Bien chaleureusement,
Candya`;
      setOutput(simulated);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-[#FDFBF7] border border-[#E8DFC8] rounded-3xl max-w-2xl w-full p-5 sm:p-8 shadow-2xl max-h-[90dvh] overflow-y-auto overflow-x-hidden overscroll-contain space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D8]">
          <div className="flex items-center gap-2.5">
            <div
              style={{
                backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
              }}
              className="w-8 h-8 rounded-xl text-white flex items-center justify-center shadow-2xs"
            >
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2D241E]">
                Assistant Réponses Prospects
              </h3>
              <p className="text-[11px] text-[#7A6C5E]">
                Outil interne : analyse de la demande & proposition de réponse rédigée
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#7A6C5E] hover:text-[#2D241E] hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Sample Chips */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#4A3B2F] block mb-1.5">
            Exemples rapides à tester :
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESET_INQUIRIES.map((preset) => (
              <button
                key={preset.title}
                type="button"
                onClick={() => setInput(preset.text)}
                className="px-3 py-1 rounded-full bg-white border border-[#E5DDD2] text-xs text-[#5C4D3E] hover:bg-[#FAF7F2] hover:border-[#D5C7B7] transition-all cursor-pointer shadow-2xs"
              >
                {preset.title}
              </button>
            ))}
          </div>
        </div>

        {/* Input Textarea */}
        <div>
          <label className="text-xs font-bold text-[#4A3B2F] block mb-1">
            Demande de contact reçue du prospect :
          </label>
          <textarea
            rows={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Collez ici le contenu de l'email ou du message reçu..."
            className="w-full p-3.5 rounded-2xl bg-white border border-[#E2D8CC] text-xs sm:text-sm text-[#2D241E] focus:outline-hidden focus:border-[#2D241E] resize-y"
          />
        </div>

        {/* Generate Button */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading || input.trim().length < 10}
            style={{
              backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
              color: lightness > 55 ? "hsl(var(--theme-h), 28%, 14%)" : "#FFFFFF",
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-xs hover:brightness-95 active:scale-95 transition-all cursor-pointer disabled:opacity-60 min-h-[44px]"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>{isLoading ? "Analyse & Rédaction..." : "Résumer et rédiger la réponse"}</span>
          </button>
        </div>

        {/* Output Section */}
        {output && (
          <div className="p-5 rounded-2xl bg-white border border-[#E5DDD2] shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#F0EAE0]">
              <span className="text-xs font-bold text-[#2D241E] uppercase tracking-wider">
                Résultat généré
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E8DFC8] text-xs font-semibold text-[#4A3B2F] hover:bg-white transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copier la réponse</span>
                  </>
                )}
              </button>
            </div>

            <div className="whitespace-pre-wrap text-xs sm:text-sm text-[#3E3228] leading-relaxed font-sans max-h-72 overflow-y-auto">
              {output}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
