import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { sendContactMails } from "./api/sendContactMails.js";

function contactApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: "local-contact-api",
    configureServer(server) {
      server.middlewares.use("/api/contact", (req, res, next) => {
        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
          res.setHeader("Access-Control-Allow-Headers", "Content-Type");
          res.end();
          return;
        }

        if (req.method !== "POST") {
          next();
          return;
        }

        const chunks: Buffer[] = [];
        req.on("data", (chunk: Buffer) => chunks.push(chunk));
        req.on("end", async () => {
          try {
            const raw = Buffer.concat(chunks).toString("utf8");
            const body = JSON.parse(raw || "{}") as Record<string, string>;
            const prenom = String(body.prenom ?? "").trim();
            const nom = String(body.nom ?? "").trim();
            const email = String(body.email ?? "").trim();
            const telephone = String(body.telephone ?? "").trim();
            const ville = String(body.ville ?? "").trim();
            const horizon = String(body.horizon ?? "").trim();
            const message = String(body.message ?? "").trim();

            if (!prenom || !nom || !email || !telephone || !ville || !horizon) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: false, error: "Champs obligatoires manquants" }));
              return;
            }

            await sendContactMails(
              { prenom, nom, email, telephone, ville, horizon, message },
              {
                smtpUser: env.SMTP_USER || "dor.hadash55@gmail.com",
                smtpPass: env.SMTP_PASS || "",
                contactTo:
                  env.CONTACT_TO_EMAIL ||
                  "dor.hadash55@gmail.com,dorhadash5780@gmail.com",
              },
            );

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: true }));
          } catch (error) {
            console.error("[local-contact-api]", error);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                ok: false,
                error: error instanceof Error ? error.message : "Erreur d'envoi email",
              }),
            );
          }
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), tailwindcss(), contactApiPlugin(env)],
  };
});
