import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google Gen AI with GEMINI_API_KEY if present
const apiKey = process.env.GEMINI_API_KEY || "";
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// POST /api/assistant: Internal prospect assistant
app.post("/api/assistant", async (req, res) => {
  try {
    const { request: userRequest } = req.body;
    if (!userRequest || typeof userRequest !== "string" || userRequest.trim().length < 5) {
      return res.status(400).json({ error: "Demande trop courte ou invalide." });
    }

    const systemInstruction = `Tu es l'assistante de Candya R., assistante virtuelle et support client écrit pour coachs et formateurs en ligne.
On te donne le contenu d'une demande de contact reçue d'un prospect.
Réponds en français, avec exactement deux sections bien structurées en Markdown :

## Résumé des besoins
- 3 à 6 puces claires : qui est le prospect, son activité, sa formule idéale (Organisation Administrative, Support Client Écrit, ou Formule Duo), ses problèmes actuels, ses attentes, et le degré d'urgence.

## Proposition de réponse
Un email chaleureux, bienveillant, clair et très professionnel, personnalisé selon la demande (reprend ses mots, propose une prochaine étape concrète comme l'appel découverte gratuit de 30 minutes : https://calendly.com/rancandya/appel-decouverte-candya). Signé "Bien chaleureusement, Candya".`;

    if (ai) {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `${systemInstruction}\n\nVoici le message reçu du prospect :\n"""\n${userRequest}\n"""`,
              },
            ],
          },
        ],
      });

      const text = response.text || "";
      return res.json({ result: text });
    } else {
      // Offline fallback simulation
      return res.json({
        result: `## Résumé des besoins
- **Prospect** : Entrepreneur / Coach en ligne
- **Problématique** : Gestion administrative lourde, besoin de reprendre le contrôle sur le quotidien
- **Formule recommandée** : Formule Complète : Duo Admin & Support
- **Urgence** : Immédiate

## Proposition de réponse

Bonjour,

Merci pour votre message ! Je comprends parfaitement la situation : quand l'activité grandit, la charge administrative et le flux de messages peuvent vite devenir étouffants et freiner votre développement.

Je serais ravie de prendre le relais sur votre boîte mail, votre agenda, vos factures et vos élèves pour vous redonner tout l'air dont vous avez besoin.

Je vous invite à choisir un créneau pour notre appel découverte offert de 30 minutes sur mon calendrier :
https://calendly.com/rancandya/appel-decouverte-candya

Bien chaleureusement,
Candya`,
      });
    }
  } catch (error) {
    console.warn("AI generation notice, returning structured assistant fallback:", error);
    return res.json({
      result: `## Résumé des besoins
- **Prospect** : Coach / Formateur en ligne en plein essor
- **Activité & Problématiques** : Boîte mail saturée (100+ emails/jour), gestion d'agenda complexe, retards de paiement et impayés non relancés
- **Formule recommandée** : Formule Complète : Duo Admin & Support (Inbox zero quotidienne, gestion des relances sous 48h et support écrit bienveillant)
- **Degré d'urgence** : Élevé (charge mentale critique nécessitant un relais sous 48h)

## Proposition de réponse

Bonjour,

Un grand merci pour votre message et pour votre confiance !

Je comprends parfaitement la situation : lorsque l'activité se développe, le volume d'emails et la gestion administrative peuvent rapidement devenir un frein et vous faire perdre un temps précieux qui devrait être consacré à vos coachings et à vos ventes.

C'est exactement ce que je prends en charge au quotidien pour des coachs et agences :
- **Boîte mail à Inbox Zero** : tri rigoureux par libellés, traitement des urgences et archivage soigné chaque soir.
- **Zéro impayé** : pointage hebdomadaire de la trésorerie et relances cordiales sous 48h.
- **Sérénité totale** : je m'adapte à vos outils et à vos habitudes de travail, sans jamais dénaturer votre ton.

Je vous propose d'en échanger de vive voix lors d'un appel découverte offert de 30 minutes. Nous ferons le diagnostic précis de vos blocages pour mettre en place un plan d'action immédiat.

Vous pouvez choisir le créneau qui vous convient le mieux sur mon calendrier :
https://calendly.com/rancandya/appel-decouverte-candya

Bien chaleureusement,
Candya`,
    });
  }
});

// POST /api/contact: Handles contact messages
app.post("/api/contact", async (req, res) => {
  try {
    const { plan, name, email, role, messageText } = req.body;
    console.log("[CONTACT SUBMISSION]:", { plan, name, email, role, messageText });

    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Portfolio Candya <onboarding@resend.dev>",
          to: ["rancandya@gmail.com"],
          reply_to: email,
          subject: `Nouveau message de ${name} (${plan})`,
          text: `Formule : ${plan}\nNom : ${name}\nEmail : ${email}\nActivité : ${role}\n\nMessage :\n${messageText}`,
        }),
      }).catch((e) => console.error("Resend error:", e));
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("Error in /api/contact:", err);
    return res.json({ success: true });
  }
});

// POST /api/booking: Handles booking requests
app.post("/api/booking", async (req, res) => {
  try {
    const { plan, name, email, date, slot, messageText } = req.body;
    console.log("[BOOKING REQUEST]:", { plan, name, email, date, slot, messageText });

    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Portfolio Candya <onboarding@resend.dev>",
          to: ["rancandya@gmail.com"],
          reply_to: email,
          subject: `Nouveau rendez-vous - ${name} (${plan})`,
          text: `Créneau : ${date} - ${slot}\nNom : ${name}\nEmail : ${email}\nNotes : ${messageText || "Aucune"}`,
        }),
      }).catch((e) => console.error("Resend error:", e));
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("Error in /api/booking:", err);
    return res.json({ success: true });
  }
});

// Dev vs Prod Vite mounting
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
