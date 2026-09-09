export type NewsletterEmailPayload = {
  email: string;
  telephone: string;
};

export async function sendNewsletterEmails(payload: NewsletterEmailPayload): Promise<void> {
  let response: Response;
  try {
    response = await fetch("/api/newsletter", {
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
    throw new Error(data.error || "Impossible d'envoyer l'email pour le moment.");
  }
}
