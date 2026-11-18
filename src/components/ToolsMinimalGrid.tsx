import React from "react";
import { motion } from "motion/react";
import { Wrench } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import gmailLogo from "../assets/tools/gmail.svg";
import outlookLogo from "../assets/tools/outlook.svg";
import googleCalendarLogo from "../assets/tools/google-calendar.svg";
import googleSheetsLogo from "../assets/tools/google-sheets.svg";
import excelLogo from "../assets/tools/excel.svg";
import notionLogo from "../assets/tools/notion.svg";
import canvaLogo from "../assets/tools/canva.svg";
import hubspotLogo from "../assets/tools/hubspot.svg";
import chatgptLogo from "../assets/tools/chatgpt.svg";
import claudeLogo from "../assets/tools/claude-ai.svg";

interface ToolItem {
  id: string;
  name: string;
  category: string;
  renderLogo: () => React.ReactNode;
}

const squareLogoClass = "h-9 w-9 sm:h-11 sm:w-11 object-contain";
const wordmarkLogoClass = "h-auto w-14 sm:w-20 max-w-full object-contain";
const easeCurve = [0.16, 1, 0.3, 1] as const;

const toolsData: ToolItem[] = [
  {
    id: "gmail",
    name: "Gmail",
    category: "Boîte mail & Libellés",
    renderLogo: () => (
      <img src={gmailLogo} alt="Gmail" loading="lazy" className={squareLogoClass} />
    ),
  },
  {
    id: "outlook",
    name: "Outlook",
    category: "Messagerie & Calendrier",
    renderLogo: () => (
      <img src={outlookLogo} alt="Outlook" loading="lazy" className={squareLogoClass} />
    ),
  },
  {
    id: "calendar",
    name: "Google Calendar",
    category: "Gestion des créneaux",
    renderLogo: () => (
      <img src={googleCalendarLogo} alt="Google Calendar" loading="lazy" className={squareLogoClass} />
    ),
  },
  {
    id: "sheets",
    name: "Google Sheets",
    category: "Suivi trésorerie & Tableaux",
    renderLogo: () => (
      <img src={googleSheetsLogo} alt="Google Sheets" loading="lazy" className={squareLogoClass} />
    ),
  },
  {
    id: "excel",
    name: "Microsoft Excel",
    category: "Modélisation & Données",
    renderLogo: () => (
      <img src={excelLogo} alt="Microsoft Excel" loading="lazy" className={squareLogoClass} />
    ),
  },
  {
    id: "notion",
    name: "Notion",
    category: "Bases de données & Wikis",
    renderLogo: () => (
      <img src={notionLogo} alt="Notion" loading="lazy" className={squareLogoClass} />
    ),
  },
  {
    id: "canva",
    name: "Canva",
    category: "Supports visuels & Visuels",
    renderLogo: () => (
      <img src={canvaLogo} alt="Canva" loading="lazy" className={wordmarkLogoClass} />
    ),
  },
  {
    id: "trello",
    name: "Trello",
    category: "Gestion Kanban des tâches",
    renderLogo: () => (
      <div className="flex items-center gap-1.5">
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#0079BF" />
          <rect x="4" y="4" width="6" height="12" rx="1.5" fill="white" />
          <rect x="14" y="4" width="6" height="8" rx="1.5" fill="white" />
        </svg>
        <span className="font-bold text-xs sm:text-sm text-[#0079BF] tracking-tight">Trello</span>
      </div>
    ),
  },
  {
    id: "hubspot",
    name: "HubSpot CRM",
    category: "Pipeline commercial & Contacts",
    renderLogo: () => (
      <img src={hubspotLogo} alt="HubSpot" loading="lazy" className={wordmarkLogoClass} />
    ),
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "Assistance IA & Rédaction",
    renderLogo: () => (
      <img src={chatgptLogo} alt="ChatGPT" loading="lazy" className={squareLogoClass} />
    ),
  },
  {
    id: "claude",
    name: "Claude AI",
    category: "Synthèse & Process",
    renderLogo: () => (
      <img src={claudeLogo} alt="Claude" loading="lazy" className={wordmarkLogoClass} />
    ),
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "Paiements récurrents",
    renderLogo: () => (
      <span className="font-extrabold text-base sm:text-lg text-[#635BFF] tracking-tight select-none">
        stripe
      </span>
    ),
  },
];

const secondaryTools = [
  "MS Word",
  "Google Docs",
  "Google Meet",
  "Google Drive",
  "Zoom",
  "Opus",
  "Systeme.io",
  "PayPal",
  "ClickUp",
];

export const ToolsMinimalGrid: React.FC = () => {
  return (
    <section
      id="outils"
      aria-labelledby="outils-heading"
      className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#EAE3D8] scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E6DDD0] text-xs font-semibold tracking-wide text-[#7A583E] mb-3 shadow-2xs">
            <Wrench className="w-3.5 h-3.5 text-[var(--primary-hsl)]" aria-hidden="true" />
            <span>Boîte à outils &amp; Écosystème digital</span>
          </div>
          <h2
            id="outils-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2D241E] tracking-tight"
          >
            Outils &amp; logiciels maîtrisés au quotidien
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#635345] leading-relaxed">
            Intégration immédiate dans votre écosystème CRM, messagerie, gestion de projet et facturation sans devoir tout réinventer.
          </p>
        </ScrollReveal>

        {/* 12 Tools Grid with progressive cascade */}
        <div
          role="list"
          aria-label="Outils principaux maîtrisés"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 max-w-5xl mx-auto"
        >
          {toolsData.map((tool, idx) => (
            <motion.div
              key={tool.id}
              role="listitem"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, delay: idx * 0.04, ease: easeCurve }}
              className="p-3 sm:p-5 rounded-2xl bg-white border border-[#ECE5DB] shadow-2xs hover:shadow-md hover:border-[#D5C7B7] hover:-translate-y-1 transition-all duration-200 flex flex-col items-center justify-center text-center group cursor-default"
              title={`${tool.name} — ${tool.category}`}
            >
              <div className="h-12 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                {tool.renderLogo()}
              </div>
              <span className="text-xs font-bold text-[#2D241E] mt-3 block">
                {tool.name}
              </span>
              <span className="text-[10px] text-[#7A6C5E] mt-0.5 line-clamp-1">
                {tool.category}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Secondary Tools */}
        <ScrollReveal delay={0.2} distance={15} className="mt-12 text-center">
          <h3
            id="secondary-tools-heading"
            className="text-xs font-bold tracking-wide text-[#7A6C5E] mb-4"
          >
            Autres plateformes &amp; applications intégrées
          </h3>
          <div
            role="list"
            aria-labelledby="secondary-tools-heading"
            className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto"
          >
            {secondaryTools.map((tool, idx) => (
              <motion.span
                key={tool}
                role="listitem"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.03 * idx, ease: easeCurve }}
                className="px-3.5 py-1.5 rounded-full bg-white border border-[#E2D8CC] text-xs font-medium text-[#4A3B2F] shadow-2xs hover:border-[#C4B3A1] transition-colors"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
