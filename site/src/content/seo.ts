export type SeoEntry = {
  title: string;
  description: string;
};

export const seoByPath: Record<string, SeoEntry> = {
  "/": {
    title: "Dor Hadash | Incubateur d'Alya francophone en Israël",
    description:
      "Dor Hadash accompagne les francophones dans leur Alya en Israël : logement, immersion, éducation, emploi. Un accompagnement complet pour réussir votre intégration.",
  },
  "/mission": {
    title: "Notre mission | Dor Hadash",
    description:
      "Découvrez la mission de Dor Hadash, incubateur d'Alya pensé pour une intégration sociale et professionnelle réussie des olim francophones en Israël.",
  },
  "/lequipe": {
    title: "L'équipe Dor Hadash | Qui sommes-nous ?",
    description:
      "Rencontrez l'équipe de l'association Dor Hadash : présidente, trésorier, avocat et commissions dédiées, au service de votre projet d'Alya.",
  },
  "/nos-villes": {
    title: "Nos villes d'accueil | Dor Hadash",
    description:
      "Découvrez les villes partenaires de Dor Hadash pour votre Alya : Karmiel, Haïfa, Jérusalem, Nof HaGalil, Ashdod et Bat Yam. Trouvez la ville qui vous correspond.",
  },
  "/karmiel": {
    title: "Faire son Alya à Karmiel | Dor Hadash",
    description:
      "Installez-vous à Karmiel, l'une des plus belles villes d'Israël : logement, éducation, transports, sécurité. Dor Hadash vous accompagne à chaque étape.",
  },
  "/haifa": {
    title: "Faire son Alya à Haïfa | Dor Hadash",
    description:
      "Haïfa, ville portuaire dynamique et abordable : logement à loyer modéré, éducation de qualité, oulpan et formation professionnelle avec Dor Hadash.",
  },
  "/jerusalem": {
    title: "Faire son Alya à Jérusalem | Dor Hadash",
    description:
      "Installez-vous à Jérusalem : accompagnement communautaire, oulpan, coaching emploi et intégration réussie avec le programme Dor Hadash.",
  },
  "/nof-hagalil": {
    title: "Faire son Alya à Nof HaGalil | Dor Hadash",
    description:
      "Nof HaGalil, la plus grande ville de Galilée : logement, éducation, formation en alternance. Un programme d'un an avec Dor Hadash pour réussir votre Alya.",
  },
  "/ashdod": {
    title: "Faire son Alya à Ashdod | Dor Hadash",
    description:
      "Ashdod, grande ville côtière et l'une des plus importantes communautés francophones d'Israël. Découvrez le programme Dor Hadash (contenu en cours de finalisation).",
  },
  "/bat-yam": {
    title: "Faire son Alya à Bat Yam | Dor Hadash",
    description:
      "Bat Yam, ville côtière aux portes de Tel Aviv. Découvrez le programme Dor Hadash pour votre Alya (contenu en cours de finalisation).",
  },
  "/blog": {
    title: "Blog | Conseils et actualités Alya - Dor Hadash",
    description:
      "Conseils pratiques, témoignages et actualités pour préparer votre Alya en Israël : démarches, logement, emploi, éducation. Le blog de Dor Hadash.",
  },
  "/nous-contacter": {
    title: "Nous contacter | Dor Hadash",
    description:
      "Une question sur votre Alya ? Contactez l'équipe Dor Hadash par téléphone, email ou via notre formulaire. Réponse rapide garantie.",
  },
  "/temoignages-videos": {
    title: "Témoignages | Dor Hadash",
    description:
      "Découvrez en vidéo le témoignage d'olim accompagnés par Dor Hadash dans leur installation en Israël.",
  },
};

export const defaultSeo: SeoEntry = {
  title: "Dor Hadash | Incubateur d'Alya francophone",
  description:
    "Dor Hadash accompagne les francophones dans leur Alya en Israël : logement, immersion, éducation, emploi.",
};
