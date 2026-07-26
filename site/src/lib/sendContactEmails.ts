export type ContactEmailPayload = {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  ville: string;
  horizon: string;
  message: string;
};

/** Envoie les emails (admin + confirmation) via l'API Vercel. */
export async function sendContactEmails(payload: ContactEmailPayload): Promise<void> {
  let response: Response;
  try {
    response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      "Impossible de joindre le serveur d'envoi. Sur localhost, les emails ne fonctionnent qu'après déploiement Vercel (ou via `vercel dev`).",
    );
  }

  const data = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };

  if (!response.ok || !data.ok) {
    throw new Error(data.error || "Impossible d'envoyer les emails pour le moment.");
  }
}
