export type SeoEntry = {
  title: string;
  description: string;
};

export const seoByPath: Record<string, SeoEntry> = {
  "/": {
    title: "Dor Hadash | Incubateur d'Alya francophone en Israël",
    description:
      "Dor Hadash accompagne les francophones dans leur Alya en Israël : logement, immersion, éducation, emploi. Un parcours complet pour réussir votre intégration.",
  },
  "/mission": {
    title: "Notre accompagnement | Dor Hadash",
    description:
      "Accompagnement Dor Hadash : 6 mois avant l'Alya et 12 mois après — logement, immersion, éducation et emploi, selon votre profil et votre ville.",
  },
  "/preparer-mon-alya": {
    title: "Préparer mon Alya | Dor Hadash",
    description:
      "Chronologie, checklist olim téléchargeable, budget, scolarité, premiers jours en Israël et FAQ pour préparer votre Alya avec Dor Hadash.",
  },
  "/lequipe": {
    title: "L'équipe Dor Hadash | Qui sommes-nous ?",
    description:
      "Rencontrez l'équipe de l'association Dor Hadash : présidente, trésorier, avocat et commissions dédiées, au service de votre projet d'Alya.",
  },
  "/partenaires": {
    title: "Nos partenaires | Dor Hadash",
    description:
      "Partenaires Dor Hadash : Agence Juive, Misrad HaKlita, Qualita, Gvahim, Oulpan Zahav, municipalités et plus.",
  },
  "/nos-villes": {
    title: "Nos villes d'accueil | Dor Hadash",
    description:
      "Villes partenaires Dor Hadash : Karmiel, Haïfa, Jérusalem, Nof HaGalil, Netivot, Ashdod et Bat Yam. Comparez, consultez les loyers indicatifs et les coordinateurs locaux.",
  },
  "/karmiel": {
    title: "Faire son Alya à Karmiel | Dor Hadash",
    description:
      "Installez-vous à Karmiel, l'une des plus belles villes d'Israël : logement, éducation, transports, sécurité. Dor Hadash vous accompagne à chaque étape.",
  },
  "/haifa": {
    title: "Faire son Alya à Haïfa | Dor Hadash",
    description:
      "Haïfa, ville abordable, religieuse et branchée entre mer et Carmel : logement, oulpan, éducation et emploi avec l'incubateur d'Alya Dor Hadash.",
  },
  "/jerusalem": {
    title: "Faire son Alya à Jérusalem | Dor Hadash",
    description:
      "Installez-vous à Jérusalem : accompagnement communautaire, oulpan, coaching emploi et intégration réussie avec le programme Dor Hadash.",
  },
  "/nof-hagalil": {
    title: "Faire son Alya à Nof HaGalil | Dor Hadash",
    description:
      "Nof HaGalil, au cœur de la Galilée : avantages fiscaux jusqu'à 18 %, aide au loyer, cadre familial et accompagnement Dor Hadash.",
  },
  "/netivot": {
    title: "Faire son Alya à Netivot | Dor Hadash",
    description:
      "Netivot, ville familiale du Neguev : avantages fiscaux, aide au loyer pour olim, éducation, emploi et communauté francophone. Découvrez le programme Dor Hadash.",
  },
  "/ashdod": {
    title: "Faire son Alya à Ashdod | Dor Hadash",
    description:
      "Ashdod, ville méditerranéenne familiale : plages, marina, communauté francophone et accompagnement Dor Hadash avant, pendant et après l'Alya.",
  },
  "/bat-yam": {
    title: "Faire son Alya à Bat Yam | Dor Hadash",
    description:
      "Bat Yam, Méditerranée aux portes de Tel-Aviv : plages, tram ligne rouge, vie de quartier et accompagnement Dor Hadash avant, pendant et après l'Alya.",
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
      "Témoignages écrits et vidéos d'olim francophones : logement, école, emploi et accompagnement Dor Hadash pour préparer votre Alya.",
  },
};

export const defaultSeo: SeoEntry = {
  title: "Dor Hadash | Incubateur d'Alya francophone en Israël",
  description:
    "Dor Hadash accompagne les francophones dans leur Alya en Israël : logement, immersion, éducation, emploi. Un parcours complet pour réussir votre intégration.",
};
