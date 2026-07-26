export type CitySection = {
  heading: string;
  paragraphs: string[];
};

export type CityTestimonial = {
  name: string;
  quote: string;
};

export type CityGalleryImage = {
  src: string;
  caption: string;
};

export type City = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  isDraft?: boolean;
  lowResImage?: boolean; // vraie photo mais résolution trop faible pour la grande bannière
  photoCredit?: { text: string; url: string }; // requis pour les photos sous licence Creative Commons (attribution)
  gallery?: CityGalleryImage[];
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
    tagline: "Une ville religieuse et branchée — nouvel incubateur d'Alya Dor Hadash",
    image: "/images/jerusalem.jpg",
    gallery: [
      {
        src: "/images/cities/jerusalem/pisgat-zeev-vue-vallee.jpg",
        caption: "Pisgat Ze'ev — vue sur le quartier et sa vallée verdoyante",
      },
      {
        src: "/images/cities/jerusalem/pisgat-zeev-quartier.jpg",
        caption: "Le tissu résidentiel de Pisgat Ze'ev, entre verdure et collines",
      },
      {
        src: "/images/cities/jerusalem/pisgat-zeev-tramway-mall.jpg",
        caption: "Tramway et centre commercial — commerces, services et mobilité au quotidien",
      },
      {
        src: "/images/cities/jerusalem/pisgat-zeev-vue-desert.jpg",
        caption: "Vue vers le désert de Judée depuis Pisgat Ze'ev",
      },
    ],
    intro: [
      "Accueillir les olim hadashim à Jérusalem symbolise le lien profond entre la ville sainte et le retour des nouveaux immigrants sur leur terre. Dor Hadash y implante son nouvel incubateur d'Alya — un programme sioniste qui facilite l'intégration des olim de France.",
      "Dor Hadash à Jérusalem, c'est une organisation d'accueil et d'accompagnement : un coordinateur municipal interface entre les olim et le lieu d'accueil ; un accompagnement municipal administratif, éducatif, social et professionnel ; le soutien de Qualita pour l'obtention des droits ; la communauté francophone Ahavat Israël ; et un coach émotionnel avant le départ puis sur place après l'Alya.",
      "Préparation pré-Alya : Oulpan de 5 mois, atelier Budget individuel, coaching de vie émotionnel ciblé Alya et intégration, et préparation professionnelle avec le Hub de l'emploi de Qualita.",
    ],
    sections: [
      {
        heading: "Bienvenue à Jérusalem",
        paragraphs: [
          "Vivre à Jérusalem offre une riche histoire culturelle, des sites religieux importants, une diversité culinaire et une vie sociale animée. La ville est aussi un centre économique en croissance, avec des opportunités professionnelles variées et avant-gardistes.",
          "La municipalité de Jérusalem, leader dans l'intégration des olim, investit constamment dans les services municipaux destinés aux olim francophones, grâce à Qualita, à l'Autorité municipale pour l'Alya et l'Intégration, et aux organismes partenaires.",
          "Elle offre gratuitement aux nouveaux arrivants 10 jours d'hébergement et l'aide d'une association spécialisée dans l'immobilier pour trouver un logement.",
        ],
      },
      {
        heading: "Pisgat Ze'ev — votre quartier à Jérusalem",
        paragraphs: [
          "C'est le plus grand quartier de Jérusalem, avec environ 50 000 habitants. Situé au nord de la ville, proche de Neve Yaacov, Ramat Eshkol et Giva'a Tzarfatit, il est non loin de l'Université Hébraïque du Mont Scopus, de l'hôpital Hadassah Har Hatsofim et du centre de haute technologie du Mont Hotzvim.",
          "La population est diversifiée : religieux, laïcs et traditionalistes. Plus de 50 synagogues actives et des centres de prière et d'études de tous rites — un melting-pot d'Israéliens de toutes origines.",
          "On y trouve des ganim, 15 écoles primaires et secondaires, un country club, un centre de jeunes et de culture, des centres sportifs récents (trois piscines, stades illuminés, parcours de santé), le Centre Paiis pour la culture et les arts (salle de 400 places), et un matnas avec permanence dédiée aux nouveaux immigrants : activités pour enfants, femmes et adultes, bibliothèque, club retraités, atelier lecture en français, conférences et excursions.",
          "La communauté Ahavat Israël, francophone et administrée par d'anciens olim (souvent plus de 15 ans en Israël), accompagne l'intégration : prières en semaine et le Shabbat, cours, collations, repas communautaires et excursions.",
          "Malgré l'inflation de l'immobilier, Pisgat Ze'ev reste un quartier aux constructions assez récentes, parmi les tarifs les plus avantageux de Jérusalem.",
        ],
      },
      {
        heading: "Transports, santé, commerces et climat",
        paragraphs: [
          "Les transports publics relient Pisgat Ze'ev au cœur de Jérusalem par un large réseau de bus et par le tramway (4 stations dans le quartier, avec des extensions à venir). Le quartier est directement connecté à la route 1 (Jérusalem–Tel Aviv, en évitant l'entrée de la ville) et à la route 443 (vers Modiin).",
          "Toutes les caisses de santé sont représentées : Maccabi, Meuhedet, Leumi, Clalit, ainsi que le centre de protection du nourrisson. Magasins, supermarchés modernes et un centre commercial avec boutiques et restaurants couvrent les besoins du quotidien.",
          "Climat doux toute l'année : nuits d'été fraîches comme à Jérusalem, hiver moins rude grâce à la proximité du désert. Les paysages et le point de vue sur le désert de Judée et la Mer Morte sont à couper le souffle.",
        ],
      },
      {
        heading: "Le programme Dor Hadash à Jérusalem",
        paragraphs: [
          "Logement : aide à la recherche d'un logement sur place ou en visio avant l'arrivée du olé et de sa famille.",
          "Immersion : oulpan intensif tous les matins pendant les 5 premiers mois ; activité bénévole tous les après-midis (parrainage par des familles francophones locales) ou activité professionnelle d'appoint.",
          "Éducation : scolarité de haut niveau, traditionnaliste et religieuse, dans les multiples écoles de la ville.",
          "Emploi : bilan de compétences, formation professionnelle, accompagnement à la création d'entreprise ou à l'emploi (ateliers, emploi rémunéré l'après-midi en entreprise locale), suivi personnalisé du Hub de l'emploi de Qualita.",
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
