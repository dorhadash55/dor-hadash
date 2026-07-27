import nodemailer from "nodemailer";

export type ContactMailData = {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  ville: string;
  horizon: string;
  message: string;
};

export type ContactMailEnv = {
  smtpUser: string;
  smtpPass: string;
  /** Un ou plusieurs emails admin, séparés par des virgules */
  contactTo: string;
};

function parseRecipients(raw: string): string[] {
  return raw
    .split(/[,;]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function brandShell(inner: string, contactEmail: string) {
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
                ${escapeHtml(contactEmail)}
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

function adminEmailHtml(data: ContactMailData, contactEmail: string) {
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

  return brandShell(
    `
    <h1 style="margin:0 0 8px;font-size:20px;color:#0b3d6e;">Nouveau message depuis le site</h1>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.55;color:#4b5563;">
      Une personne a rempli le formulaire de contact. Vous pouvez aussi le retrouver dans l'admin → Messages.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${rows}</table>
    <p style="margin:20px 0 8px;font-size:14px;font-weight:700;color:#0b3d6e;">Message</p>
    <div style="padding:14px 16px;background:#f8fafc;border-radius:12px;border:1px solid #e5e7eb;font-size:14px;line-height:1.6;color:#374151;white-space:pre-wrap;">${escapeHtml(data.message || "(aucun message)")}</div>
  `,
    contactEmail,
  );
}

function userConfirmationHtml(prenom: string, contactEmail: string) {
  const name = prenom.trim() || "bonjour";
  return brandShell(
    `
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
  `,
    contactEmail,
  );
}

export async function sendContactMails(data: ContactMailData, env: ContactMailEnv) {
  if (!env.smtpUser || !env.smtpPass) {
    throw new Error(
      "SMTP_USER / SMTP_PASS manquants. Ajoutez-les dans site/.env (local) ou Vercel (prod).",
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: env.smtpUser, pass: env.smtpPass },
  });

  const from = `"Dor Hadash" <${env.smtpUser}>`;
  const adminRecipients = parseRecipients(env.contactTo);
  if (adminRecipients.length === 0) {
    throw new Error("CONTACT_TO_EMAIL manquant.");
  }
  const primaryAdmin = adminRecipients[0];

  await transporter.sendMail({
    from,
    to: adminRecipients,
    replyTo: data.email,
    subject: `Nouveau contact site — ${data.prenom} ${data.nom}`,
    text: [
      `Nouveau message de ${data.prenom} ${data.nom}`,
      `Email: ${data.email}`,
      `Téléphone: ${data.telephone}`,
      `Ville: ${data.ville}`,
      `Horizon: ${data.horizon}`,
      "",
      data.message || "(aucun message)",
    ].join("\n"),
    html: adminEmailHtml(data, primaryAdmin),
  });

  await transporter.sendMail({
    from,
    to: data.email,
    replyTo: primaryAdmin,
    subject: "Nous avons bien reçu votre message — Dor Hadash",
    text: [
      `Bonjour ${data.prenom},`,
      "",
      "Nous avons bien reçu votre message. L'équipe Dor Hadash vous recontactera dans les plus brefs délais.",
      "",
      "À bientôt,",
      "L'équipe Dor Hadash",
    ].join("\n"),
    html: userConfirmationHtml(data.prenom, primaryAdmin),
  });
}
