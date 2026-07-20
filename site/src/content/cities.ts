export type CitySection = {
  heading: string;
  paragraphs: string[];
};

export type CityTestimonial = {
  name: string;
  quote: string;
};

export type City = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  isDraft?: boolean;
  lowResImage?: boolean; // vraie photo mais résolution trop faible pour la grande bannière
  photoCredit?: { text: string; url: string }; // requis pour les photos sous licence Creative Commons (attribution)
  intro: string[];
  sections: CitySection[];
  testimonials: CityTestimonial[];
};

export const cities: City[] = [
  {
    slug: "karmiel",
    name: "Karmiel",
    tagline: "La plus belle ville d'Israël… après Jérusalem !",
    image: "/images/karmiel.jpg",
    photoCredit: {
      text: "Photo : Wikimedia Commons (CC BY-SA 3.0)",
      url: "https://commons.wikimedia.org/wiki/File:Karmiel_-_Israel_2008.jpg",
    },
    intro: [
      "L'Association Dor Hadash, incubateur d'Alya, vous accompagne dans la ville du Projet de Développement de la Galilée Centrale : Karmiel.",
      "Attractive aux jeunes couples et familles, son dynamisme vous plaira d'emblée. Dès 1981, Karmiel obtenait la double reconnaissance du Prix Beautiful Israël (6 fois de suite comme la plus belle ville d'Israël après Jérusalem) et du Prix Kaplan pour sa gestion et ses services.",
    ],
    sections: [
      {
        heading: "Transports et développement économique",
        paragraphs: [
          "Karmiel est idéalement située dans la vallée de Beit Hakerem, sur la route qui va d'Akko à Meiron, Sfat et Tibériade — région historique du judaïsme.",
          "Son réseau routier et ferroviaire la relient à tous les grands centres de vie israéliens et à l'aéroport Ben Gourion, ainsi qu'au grand centre portuaire et industriel de Haïfa.",
          "À peu de distance de la Méditerranée (20 km), au seuil de la Haute-Galilée, la ville a fait le choix de l'environnement : nombreux parcs et jardins, caractère charmant de ville moyenne (48 000 habitants), accueillante envers les familles.",
        ],
      },
      {
        heading: "Éducation",
        paragraphs: [
          "8 écoles secondaires, 9 écoles publiques élémentaires, une école religieuse avec cursus secondaire, une école élémentaire indépendante, une école pour enfants surdoués, de nombreux jardins d'enfants et garderies.",
          "Le collège d'ingénierie ORT Braude (3 500 étudiants) forme en informatique, électronique, administration et biotechnologie industrielle. Une Silicon Wadi locale émerge, avec des hubs comme Kerem-Tech.",
        ],
      },
      {
        heading: "Intégration & sécurité",
        paragraphs: [
          "Population diversifiée et tolérante, plus de 30 synagogues, minorité druze facilitant l'intégration. Karmiel offre les avantages de la ville « périphérique », avec les aides financières du Ministère de l'Intégration et de l'Alya.",
          "Dor Hadash, en partenariat avec la municipalité, vous accompagne à chaque étape : démarches administratives, logement en Mercaz Klita à moindre coût, Oulpan, formation, emploi, éducation, vie culturelle.",
        ],
      },
      {
        heading: "La prépa Dor Hadash",
        paragraphs: [
          "Une préparation pré-Alya : un Oulpan de 5 mois en Zoom, un atelier Budget individuel, une préparation professionnelle avec le Hub de l'Emploi de Qualita.",
        ],
      },
    ],
    testimonials: [],
  },
  {
    slug: "haifa",
    name: "Haïfa",
    tagline: "Une ville qui travaille, entre mer et Technion",
    image: "/images/haifa.jpg",
    intro: [
      "Dor Hadash à Haïfa, c'est une organisation d'accueil par un coordinateur municipal, interface entre les olim et le lieu d'accueil, ainsi qu'un accompagnement administratif porté par la communauté du Rav Dr Elyaou Zini, Rabbin du Technion.",
      "Un programme complet : logement à loyer modéré, éducation de qualité subventionnée, oulpan accompagné de bénévolat, formation professionnelle en entreprise ou en établissement universitaire.",
    ],
    sections: [
      {
        heading: "Bienvenue à Haïfa",
        paragraphs: [
          "Haïfa dément son stéréotype somnolent et attire de plus en plus d'Israéliens grâce à ses logements abordables, sa diversité, son ambiance détendue et son judaïsme pratiqué.",
          "Ville portuaire de 280 000 habitants, Haïfa abrite le complexe Matam (Intel, IBM, Motorola, Google, Yahoo!, Philips) ainsi que le Technion et l'université de Haïfa. Le quartier du port a été entièrement réhabilité.",
        ],
      },
      {
        heading: "Immobilier, transports et commerces",
        paragraphs: [
          "Les loyers du centre-ville restent inférieurs à ceux des autres grandes villes. Transports remarquables : train, bus hybrides et le seul métro d'Israël. Croissance démographique attendue de 60 000 habitants d'ici 2025.",
        ],
      },
      {
        heading: "Logement, immersion, éducation, emploi",
        paragraphs: [
          "Logement : aide à la recherche sur place ou en visio, prix 30% moins chers que le marché national (2 500 à 3 500 shekels selon quartier et meublé ou non).",
          "Immersion : oulpan intensif le matin pendant 5 mois, activité bénévole ou professionnelle l'après-midi, parrainage par des familles francophones locales.",
          "Éducation : écoles de haut niveau, traditionnalistes et religieuses.",
          "Emploi : bilan de compétences, formation professionnelle, accompagnement à la création d'entreprise ou emploi rémunéré l'après-midi.",
        ],
      },
    ],
    testimonials: [],
  },
  {
    slug: "jerusalem",
    name: "Jérusalem",
    tagline: "Le lien profond entre la ville sainte et votre retour",
    image: "/images/jerusalem.jpg",
    intro: [
      "Dor Hadash à Jérusalem, c'est un accueil porté par la communauté francophone Ahavat Israël, un coordinateur municipal, un accompagnement administratif, éducatif, social et professionnel, le soutien de Qualita, et un coach émotionnel avant et après votre Alya.",
      "Nouveau : une préparation pré-Alya incluant un Oulpan de 5 mois, un atelier Budget individuel, un coaching de vie émotionnel et une préparation professionnelle avec le Hub de l'emploi de Qualita.",
    ],
    sections: [
      {
        heading: "Pisgat Zeev — votre quartier à Jérusalem",
        paragraphs: [
          "Le plus grand quartier de Jérusalem (50 000 habitants), au Nord de la ville, proche de l'Université Hébraïque du Mont Scopus et de l'hôpital Hadassah Har Hatsofim.",
          "Population diversifiée, plus de 50 synagogues, 15 écoles primaires et secondaires, centres sportifs récents (piscines, stades), centre culturel avec permanence dédiée aux nouveaux immigrants.",
          "La ville offre gratuitement aux nouveaux arrivants 10 jours d'hébergement et l'aide d'une association spécialisée pour trouver un logement.",
        ],
      },
      {
        heading: "Transports, santé et climat",
        paragraphs: [
          "Bus et tramway (4 stations à Pisgat Zeev), connexion directe aux routes rapides Jérusalem–Tel Aviv et vers Modiin. Toutes les caisses de santé sont représentées.",
          "Climat doux toute l'année, nuits fraîches en été, hiver moins rude qu'ailleurs grâce à la proximité du désert, avec vue sur le désert de Judée et la Mer Morte.",
        ],
      },
      {
        heading: "Logement, immersion, éducation, emploi",
        paragraphs: [
          "Logement : aide à la recherche sur place ou en visio avant l'arrivée.",
          "Immersion : oulpan intensif le matin pendant 5 mois, activité bénévole ou professionnelle l'après-midi, parrainage par des familles francophones.",
          "Éducation : écoles de haut niveau, traditionnalistes et religieuses.",
          "Emploi : bilan de compétences, formation, suivi personnalisé du Hub de l'emploi de Qualita.",
        ],
      },
    ],
    testimonials: [],
  },
  {
    slug: "nof-hagalil",
    name: "Nof HaGalil",
    tagline: "La plus grande ville de Galilée, entourée de nature",
    image: "/images/nof-hagalil.jpg",
    intro: [
      "La ville de Nof HaGalil et l'association Dor Hadash unissent leurs atouts pour un programme complet d'une année : logement à loyer modéré, éducation subventionnée, oulpan avec bénévolat, formation en alternance rémunérée avec proposition d'embauche à la clé.",
      "Nof HaGalil se trouve à 38 km de Haïfa et 126 km de Tel Aviv, à 577 mètres d'altitude, entourée de montagnes, forêts et vallées verdoyantes.",
    ],
    sections: [
      {
        heading: "La ville et sa culture",
        paragraphs: [
          "70% de la ville est composée d'espaces verts, forêts et réserves naturelles : sentiers de randonnée, pistes cyclables, nombreuses aires de jeux.",
          "8 centres communautaires dont la salle des arts « Mr Green », un complexe avec spa, piscine et salle de sport.",
        ],
      },
      {
        heading: "Accueil des Olim",
        paragraphs: [
          "Un département municipal dédié accompagne les nouveaux arrivants, en lien avec le ministère du Développement du Néguev et de la Galilée. Un coordinateur francophone et un réseau de bénévoles francophones épaulent au quotidien les nouveaux arrivants.",
          "Avantage spécifique : réduction de 90% sur les taxes municipales la première année d'installation. Parc locatif de logements temporaires disponible.",
        ],
      },
      {
        heading: "Transports, commerce et emploi",
        paragraphs: [
          "Réseau de bus reliant toutes les zones de la ville vers Tel Aviv, Netanya, Haïfa, Jérusalem. Un projet de ligne ferroviaire vers Haïfa est prévu dans les 4 prochaines années.",
          "3 zones industrielles dont le pôle Ziporit (une quarantaine d'entreprises, dont de la haute technologie). Le plus grand supermarché du Moyen-Orient, « Mercaz Mazon », attire des milliers de visiteurs par jour.",
        ],
      },
      {
        heading: "Éducation",
        paragraphs: [
          "Écoles équipées d'écrans interactifs, journée continue jusqu'à 15h20, écoles religieuses de différentes tendances du judaïsme.",
        ],
      },
    ],
    testimonials: [],
  },
  {
    slug: "ashdod",
    name: "Ashdod",
    tagline: "Grande ville côtière, l'une des plus grandes communautés francophones du pays",
    image: "/images/cities/ashdod.jpg",
    photoCredit: {
      text: "Photo : Amos Meron, Wikimedia Commons (CC BY-SA 3.0)",
      url: "https://commons.wikimedia.org/wiki/File:Ashdod_Marina_Aerial_View.jpg",
    },
    isDraft: true,
    intro: [
      "Dor Hadash à Ashdod : [à compléter avec vous — préciser l'organisation d'accueil et un éventuel partenariat municipal, comme pour Haïfa, Jérusalem et Nof HaGalil].",
      "Ashdod est la 6ᵉ plus grande ville d'Israël, sur la côte méditerranéenne, à environ 30 km au sud de Tel Aviv. Ville portuaire (le plus grand port du pays), réputée pour ses larges plages et l'une des plus importantes communautés francophones d'Israël.",
    ],
    sections: [
      {
        heading: "La ville",
        paragraphs: [
          "Urbanisme aéré organisé en quartiers (« rovot »), plages, parcs, pistes cyclables reliant les quartiers. Infrastructures communautaires francophones déjà bien implantées (synagogues, écoles, commerces).",
        ],
      },
      {
        heading: "Transports et commerces",
        paragraphs: [
          "Ligne ferroviaire côtière reliant Tel Aviv, Ashkelon et le sud du pays, réseau de bus interne dense. [À compléter : temps de trajet, quartiers recommandés par Dor Hadash].",
        ],
      },
      {
        heading: "Logement, éducation, emploi",
        paragraphs: [
          "[À compléter avec vous : loyers moyens, quartiers recommandés, écoles ou dispositifs spécifiques, bassin d'emploi local (port, industrie, zones commerciales)].",
        ],
      },
    ],
    testimonials: [],
  },
  {
    slug: "bat-yam",
    name: "Bat Yam",
    tagline: "La mer aux portes de Tel Aviv",
    image: "/images/cities/bat-yam.jpg",
    photoCredit: {
      text: "Photo : Ynhockey, Wikimedia Commons (CC BY-SA 4.0)",
      url: "https://commons.wikimedia.org/wiki/File:City_Park_Bat_Yam_05.jpg",
    },
    isDraft: true,
    intro: [
      "Dor Hadash à Bat Yam : [à compléter avec vous — préciser l'organisation d'accueil et un éventuel partenariat municipal].",
      "Bat Yam est une ville côtière contiguë à Tel Aviv, en plein renouveau urbain : rénovation du front de mer, nouvelles tours résidentielles. Elle attire de plus en plus de francophones grâce à des prix plus accessibles que Tel Aviv, tout en gardant l'ambiance de bord de mer.",
    ],
    sections: [
      {
        heading: "La ville",
        paragraphs: [
          "Accès direct à la plage sur toute la façade, promenade très fréquentée, vie de quartier dense, à quelques minutes de Tel Aviv.",
        ],
      },
      {
        heading: "Transports",
        paragraphs: [
          "Réseau de bus dense vers Tel Aviv et le Goush Dan, extensions progressives du métro léger de Tel Aviv desservant la région. [À compléter : lignes précises, temps de trajet].",
        ],
      },
      {
        heading: "Logement, éducation, emploi",
        paragraphs: [
          "[À compléter avec vous : loyers moyens, quartiers recommandés, écoles locales, dispositifs d'accompagnement à l'emploi — proximité immédiate du bassin d'emploi de Tel Aviv].",
        ],
      },
    ],
    testimonials: [],
  },
];

export const getCityBySlug = (slug: string) =>
  cities.find((c) => c.slug === slug);
