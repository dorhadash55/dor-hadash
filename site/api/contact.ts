import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sendContactMails } from "./sendContactMails.js";

type ContactPayload = {
  prenom?: string;
  nom?: string;
  email?: string;
  telephone?: string;
  ville?: string;
  horizon?: string;
  message?: string;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Méthode non autorisée" });
  }

  try {
    const body = (typeof req.body === "string" ? JSON.parse(req.body) : req.body) as ContactPayload;
    const prenom = String(body.prenom ?? "").trim();
    const nom = String(body.nom ?? "").trim();
    const email = String(body.email ?? "").trim();
    const telephone = String(body.telephone ?? "").trim();
    const ville = String(body.ville ?? "").trim();
    const horizon = String(body.horizon ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!prenom || !nom || !email || !telephone || !ville || !horizon) {
      return res.status(400).json({ ok: false, error: "Champs obligatoires manquants" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: "Email invalide" });
    }

    await sendContactMails(
      { prenom, nom, email, telephone, ville, horizon, message },
      {
        smtpUser: process.env.SMTP_USER || "dor.hadash55@gmail.com",
        smtpPass: process.env.SMTP_PASS || "",
        contactTo:
          process.env.CONTACT_TO_EMAIL ||
          "dor.hadash55@gmail.com,dorhadash5780@gmail.com",
      },
    );

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("contact email error:", error);
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : "Erreur d'envoi email",
    });
  }
}
