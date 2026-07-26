import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

type ContactPayload = {
  prenom?: string;
  nom?: string;
  email?: string;
  telephone?: string;
  ville?: string;
  horizon?: string;
  message?: string;
};

const ADMIN_EMAIL = process.env.CONTACT_TO_EMAIL || "dorhadash5780@gmail.com";
const FROM_NAME = "Dor Hadash";
const FROM_EMAIL = process.env.SMTP_USER || "dorhadash5780@gmail.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function brandShell(inner: string) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Dor Hadash</title>
</head>
<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;color:#1f2937;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f7fb;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
          <tr>
            <td style="background:#0b3d6e;padding:22px 28px;">
              <p style="margin:0;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#29c4a9;">Incubateur d'Alya</p>
              <p style="margin:6px 0 0;font-size:22px;font-weight:700;color:#ffffff;">Dor Hadash</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              ${inner}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px 24px;background:#f8fafc;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:12px;line-height:1.5;color:#6b7280;">
                Association Dor Hadash · <a href="https://dor-hadash.vercel.app" style="color:#2b87da;text-decoration:none;">dor-hadash.vercel.app</a><br />
                ${escapeHtml(ADMIN_EMAIL)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function adminEmailHtml(data: Required<ContactPayload>) {
  const rows = [
    ["Prénom", data.prenom],
    ["Nom", data.nom],
    ["Email", data.email],
    ["Téléphone", data.telephone],
    ["Ville envisagée", data.ville],
    ["Horizon", data.horizon],
  ]
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#6b7280;width:140px;font-size:14px;">${label}</td>
        <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#111827;font-size:14px;font-weight:600;">${escapeHtml(value)}</td>
      </tr>`,
    )
    .join("");

  return brandShell(`
    <h1 style="margin:0 0 8px;font-size:20px;color:#0b3d6e;">Nouveau message depuis le site</h1>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.55;color:#4b5563;">
      Une personne a rempli le formulaire de contact. Vous pouvez aussi le retrouver dans l'admin → Messages.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${rows}</table>
    <p style="margin:20px 0 8px;font-size:14px;font-weight:700;color:#0b3d6e;">Message</p>
    <div style="padding:14px 16px;background:#f8fafc;border-radius:12px;border:1px solid #e5e7eb;font-size:14px;line-height:1.6;color:#374151;white-space:pre-wrap;">${escapeHtml(data.message || "(aucun message)")}</div>
  `);
}

function userConfirmationHtml(prenom: string) {
  const name = prenom.trim() || "bonjour";
  return brandShell(`
    <h1 style="margin:0 0 10px;font-size:22px;color:#0b3d6e;">Merci ${escapeHtml(name)} !</h1>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#374151;">
      Nous avons bien reçu votre message. L'équipe Dor Hadash vous recontactera dans les plus brefs délais pour échanger sur votre projet d'Alya.
    </p>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#374151;">
      En attendant, n'hésitez pas à découvrir nos villes partenaires et notre accompagnement sur le site.
    </p>
    <p style="margin:0 0 22px;font-size:15px;line-height:1.65;color:#374151;">
      À très bientôt,<br />
      <strong style="color:#0b3d6e;">L'équipe Dor Hadash</strong><br />
      <span style="color:#6b7280;">Incubateur d'Alya francophone</span>
    </p>
    <a href="https://dor-hadash.vercel.app/nous-contacter"
       style="display:inline-block;background:#2b87da;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 20px;border-radius:999px;">
      Retour au site
    </a>
  `);
}

function getTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    throw new Error("SMTP_USER / SMTP_PASS manquants dans les variables d'environnement Vercel.");
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

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

    const data = { prenom, nom, email, telephone, ville, horizon, message };
    const transporter = getTransporter();

    await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `Nouveau contact site — ${prenom} ${nom}`,
      text: [
        `Nouveau message de ${prenom} ${nom}`,
        `Email: ${email}`,
        `Téléphone: ${telephone}`,
        `Ville: ${ville}`,
        `Horizon: ${horizon}`,
        "",
        message || "(aucun message)",
      ].join("\n"),
      html: adminEmailHtml(data),
    });

    await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: email,
      replyTo: ADMIN_EMAIL,
      subject: "Nous avons bien reçu votre message — Dor Hadash",
      text: [
        `Bonjour ${prenom},`,
        "",
        "Nous avons bien reçu votre message. L'équipe Dor Hadash vous recontactera dans les plus brefs délais.",
        "",
        "À bientôt,",
        "L'équipe Dor Hadash",
      ].join("\n"),
      html: userConfirmationHtml(prenom),
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("contact email error:", error);
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : "Erreur d'envoi email",
    });
  }
}
