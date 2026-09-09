import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sendNewsletterMails } from "./sendContactMails.js";

type NewsletterPayload = {
  email?: string;
  telephone?: string;
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
    const body = (typeof req.body === "string" ? JSON.parse(req.body) : req.body) as NewsletterPayload;
    const email = String(body.email ?? "").trim();
    const telephone = String(body.telephone ?? "").trim();

    if (!email) {
      return res.status(400).json({ ok: false, error: "Email obligatoire" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: "Email invalide" });
    }
    if (telephone.length > 40) {
      return res.status(400).json({ ok: false, error: "Téléphone trop long" });
    }

    await sendNewsletterMails(
      { email, telephone },
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
    console.error("newsletter email error:", error);
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : "Erreur d'envoi email",
    });
  }
}
