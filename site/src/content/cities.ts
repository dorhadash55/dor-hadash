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
  /** contain = slide entière (plaquette) ; cover = photo paysage (défaut) */
  fit?: "cover" | "contain";
};

export type City = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  isDraft?: boolean;
  lowResImage?: boolean; // vraie photo mais résolution trop faible pour la grande bannière
  photoCredit?: { text: string; url: string }; // requis pour les photos sous licence Creative Commons (attribution)
  /** Carrousel bannière (photos larges) */
  gallery?: CityGalleryImage[];
  /** Galerie plus bas dans la page (slides détaillées, etc.) */
  galleryMore?: CityGalleryImage[];
  intro: string[];
  sections: CitySection[];
  testimonials: CityTestimonial[];
};

export const cities: City[] = [
  {
    slug: "karmiel",
    name: "Karmiel",
    tagline: "Le cœur de la Galilée — plus belle ville d'Israël… après Jérusalem !",
    image: "/images/karmiel.jpg",
    // Haut de page : 3 photos larges
    gallery: [
      {
        src: "/images/cities/karmiel/bienvenue.jpg",
        caption: "Bienvenue à Karmiel",
        fit: "cover",
      },
      {
        src: "/images/cities/karmiel/coeur-galilee.jpg",
        caption: "Karmiel, le cœur de la Galilée",
        fit: "cover",
      },
      {
        src: "/images/cities/karmiel/culture-loisirs.jpg",
        caption: "Culture et loisirs à Karmiel",
        fit: "cover",
      },
    ],
    // Plus bas : slides détaillées (lisibles en grand, une par une sur mobile)
    galleryMore: [
      {
        src: "/images/cities/karmiel/centre-galilee.jpg",
        caption: "Au centre de la Galilée",
        fit: "contain",
      },
      {
        src: "/images/cities/karmiel/situation-geographique.jpg",
        caption: "Situation géographique et transports",
        fit: "contain",
      },
      {
        src: "/images/cities/karmiel/organisation-ville.jpg",
        caption: "Organisation et développement de la ville",
        fit: "contain",
      },
      {
        src: "/images/cities/karmiel/securite.jpg",
        caption: "Sécurité collective",
        fit: "contain",
      },
      {
        src: "/images/cities/karmiel/education.jpg",
        caption: "Éducation",
        fit: "contain",
      },
      {
        src: "/images/cities/karmiel/mairie-integration.jpg",
        caption: "Mairie et intégration",
        fit: "contain",
      },
      {
        src: "/images/cities/karmiel/evenements.jpg",
        caption: "Festivals et événements",
        fit: "contain",
      },
      {
        src: "/images/cities/karmiel/industrie-emploi.jpg",
        caption: "Industrie et emploi",
        fit: "contain",
      },
      {
        src: "/images/cities/karmiel/commerces-services.jpg",
        caption: "Commerces et services",
        fit: "contain",
      },
      {
        src: "/images/cities/karmiel/sante.jpg",
        caption: "Services de santé",
        fit: "contain",
      },
    ],
    intro: [
      "L'Association Dor Hadash, incubateur d'Alya, vous accompagne dans la ville du Projet de Développement de la Galilée Centrale : Karmiel — le cœur de la Galilée.",
      "Attractive aux jeunes couples et familles, son dynamisme vous plaira d'emblée. Dès 1981, Karmiel obtenait la double reconnaissance du Prix Beautiful Israël (6 fois de suite comme la plus belle ville d'Israël après Jérusalem) et du Prix Kaplan pour sa gestion et ses services.",
    ],
    sections: [
      {
        heading: "Situation géographique",
        paragraphs: [
          "Karmiel est idéalement située dans la vallée de Beit Hakerem, au centre de la Galilée : à environ 25 km de la mer (Acre et Nahariya), 25 km de Tibériade et 40 km de Haïfa — avec Sfat et Nazareth à proximité.",
          "Les transports en commun sont excellents : train et bus relient Karmiel à tout Israël, aux grands centres de vie et à l'aéroport Ben Gourion, ainsi qu'au pôle portuaire et industriel de Haïfa.",
        ],
      },
      {
        heading: "Organisation et développement de la ville",
        paragraphs: [
          "Ville nouvelle créée en 1964, Karmiel compte environ 53 000 habitants (âge moyen autour de 42 ans). Elle fait partie des rares villes conçues selon un plan directeur fondé sur une excellente infrastructure urbaine.",
          "La protection de l'environnement repose sur une séparation nette entre zones d'habitation et zones industrielles. Plusieurs dizaines de parcs et d'espaces verts : à Karmiel, on respire un air pur.",
          "De nouveaux quartiers modernes se construisent selon des standards architecturaux élevés, avec des prix de vente d'appartements raisonnables.",
        ],
      },
      {
        heading: "Sécurité collective",
        paragraphs: [
          "Karmiel compte parmi les villes les plus sûres d'Israël. Le taux de délinquance de rue est parmi les plus bas du pays, notamment grâce à environ 400 caméras de sécurité réparties dans la cité.",
          "La police municipale, entraînée et professionnelle, est présente 24 h/24 et 7 j/7. De nombreux programmes luttent contre les incivilités et les comportements délinquants.",
        ],
      },
      {
        heading: "Éducation",
        paragraphs: [
          "84 jardins d'enfants municipaux, 9 écoles primaires, 5 lycées, une éducation spécialisée pour les enfants à besoins particuliers, des classes d'accueil pour enfants surdoués, et une grande variété d'activités pour tous les âges.",
          "Académie sportive, conservatoire de musique, country club, piscine, salles de sport, courts de tennis, centres de soins et mouvements de jeunesse.",
          "Le centre universitaire Braude forme des techniciens et ingénieurs, avec un département de biotechnologie. Une Silicon Wadi locale émerge, avec des hubs comme Kerem-Tech.",
        ],
      },
      {
        heading: "Mairie et intégration",
        paragraphs: [
          "Excellence de la gestion financière et des services municipaux. Accompagnement personnalisé de chaque nouvel immigrant, avec des aides à tous les niveaux pour une intégration réussie.",
          "Centre d'intégration moderne et confortable (Agence juive) proposant un hébergement jusqu'à 5 mois, et appartements d'intégration en location pour une durée limitée.",
          "Oulpans d'hébreu pour débutants et avancés, groupes de conversation, et une communauté chaleureuse toujours prête à aider. À Karmiel, on se sent à la maison.",
          "Dor Hadash, en partenariat avec la municipalité, vous accompagne à chaque étape : démarches administratives, logement en Mercaz Klita à moindre coût, oulpan, formation, emploi, éducation et vie culturelle.",
        ],
      },
      {
        heading: "Culture et loisirs",
        paragraphs: [
          "Festival international annuel de danses, exposition de voitures de collection, expositions Pourim, festival de la bière, fête de la jeunesse, concerts classiques, spectacles vivants, théâtre national et pour enfants, spectacles de rue, cinémas, restaurants et cafés.",
          "Événements collectifs, sorties, conférences et activités pour toute la population — une vie culturelle et sociale très riche.",
        ],
      },
      {
        heading: "Industrie et emploi",
        paragraphs: [
          "Parc industriel de 270 hectares en pleine expansion près de la ville, avec environ 200 entreprises (textile, plastique, électronique, métaux, médecine, etc.).",
          "Trois zones industrielles aux abords de la ville, dont de nombreuses entreprises de haute technologie, et un nouveau centre industriel et tertiaire sur le site de la gare ferroviaire.",
        ],
      },
      {
        heading: "Commerces, services et santé",
        paragraphs: [
          "Supermarchés, centres commerciaux, shopping, banques, salles de sport et spas, antennes des administrations de l'État : à Karmiel, il y a tout ce dont on a besoin.",
          "Quatre koupot holim (Clalit, Maccabi, Leumit, Meuhedet), médecine généraliste et spécialisée, radiologie, laboratoires, santé mentale, physiothérapie, dentaires, développement de l'enfant, urgences Terem, et maisons de personnes âgées. Ouverture prévue en 2025 d'un centre médical de rééducation et de recherche.",
          "Hôpitaux de la région à proximité : Safed, Tibériade, Nazareth, Afula, Haïfa et Saint-Jean-d'Acre.",
        ],
      },
      {
        heading: "La prépa Dor Hadash",
        paragraphs: [
          "Une préparation pré-Alya : oulpan de 5 mois en Zoom, atelier Budget individuel, préparation professionnelle avec le Hub de l'emploi de Qualita.",
          "Dor Hadash à Karmiel, c'est une organisation d'accueil : coordinateur municipal (interface avec le Mercaz Klita), accompagnement administratif, éducatif, social et professionnel, soutien Qualita pour les droits, et communauté francophone active et bienveillante.",
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
    tagline: "Une ville en plein développement, au cœur de la Galilée",
    image: "/images/nof-hagalil.jpg",
    gallery: [
      {
        src: "/images/cities/nof-hagalil/vue-ville.jpg",
        caption: "Nof HaGalil, au cœur de la Galilée",
        fit: "cover",
      },
      {
        src: "/images/cities/nof-hagalil/quartier-moderne.jpg",
        caption: "Une ville en plein développement",
        fit: "cover",
      },
      {
        src: "/images/cities/nof-hagalil/paysage-galilee.jpg",
        caption: "Cadre de vie verdoyant et familial",
        fit: "cover",
      },
    ],
    galleryMore: [
      {
        src: "/images/cities/nof-hagalil/plaquette.jpg",
        caption: "Programme Dor Hadash à Nof HaGalil",
        fit: "contain",
      },
      {
        src: "/images/cities/nof-hagalil/mairie.jpg",
        caption: "Municipalité de Nof HaGalil",
        fit: "contain",
      },
      {
        src: "/images/cities/nof-hagalil/developpement.jpg",
        caption: "Commerces, bureaux et chantiers en expansion",
        fit: "contain",
      },
      {
        src: "/images/cities/nof-hagalil/residence-neuve.jpg",
        caption: "Logements modernes et accessibles",
        fit: "contain",
      },
      {
        src: "/images/cities/nof-hagalil/loisirs-aquatiques.jpg",
        caption: "Loisirs aquatiques pour toute la famille",
        fit: "contain",
      },
      {
        src: "/images/cities/nof-hagalil/sport-piscine.jpg",
        caption: "Sport et piscine",
        fit: "contain",
      },
      {
        src: "/images/cities/nof-hagalil/piscine-couverte.jpg",
        caption: "Complexe aquatique couvert",
        fit: "contain",
      },
      {
        src: "/images/cities/nof-hagalil/amphitheatre.jpg",
        caption: "Culture et espace public",
        fit: "contain",
      },
      {
        src: "/images/cities/nof-hagalil/padel.jpg",
        caption: "Infrastructures sportives modernes",
        fit: "contain",
      },
      {
        src: "/images/cities/nof-hagalil/transports.jpg",
        caption: "Transports et connexions en développement",
        fit: "contain",
      },
      {
        src: "/images/cities/nof-hagalil/education.jpg",
        caption: "Éducation et intégration",
        fit: "contain",
      },
    ],
    intro: [
      "Située au cœur de la Galilée, Nof HaGalil offre un cadre de vie moderne, familial et sécurisé, avec une forte croissance économique et d'excellentes infrastructures.",
      "À seulement 45 minutes de Haïfa et de Tibériade, et à moins de 20 minutes d'Afula, la ville combine avantages fiscaux, logement abordable et accompagnement personnalisé pour réussir son Alya.",
    ],
    sections: [
      {
        heading: "Les avantages",
        paragraphs: [
          "Réduction d'impôt pouvant atteindre 18 %, pour un soutien financier concret aux familles et aux professionnels.",
          "Jusqu'à 2 000 ₪ d'aide au loyer par mois pendant 2 ans. Ces aides sont cumulables avec celles du Ministère de l'Intégration.",
          "Coût de la vie et immobilier plus accessibles que dans le centre d'Israël — loyers et achats nettement plus abordables qu'à Tel Aviv ou dans le centre du pays.",
        ],
      },
      {
        heading: "Un accompagnement complet",
        paragraphs: [
          "Dor Hadash accompagne les familles avant, pendant et après l'Alya : oulpan intensif, accompagnement administratif et professionnel, conseils budgétaires, coordinateur dédié, et intégration au sein d'une communauté francophone.",
          "Préparation pré-Alya : oulpan intensif adapté à votre niveau, atelier budget et organisation financière, préparation professionnelle, et orientation vers un réseau francophone accueillant.",
          "Sur place : partenariat actif avec la municipalité, structuration communautaire et religieuse francophone, et suivi personnalisé pour une intégration réussie.",
        ],
      },
      {
        heading: "Pour qui ?",
        paragraphs: [
          "Ce programme s'adresse prioritairement aux familles francophones, aux jeunes couples avec enfants, et aux familles souhaitant un environnement stable pour une intégration réussie.",
        ],
      },
      {
        heading: "Pourquoi choisir Nof HaGalil ?",
        paragraphs: [
          "Une ville dynamique qui combine avantages fiscaux, logement abordable, qualité de vie et accompagnement personnalisé pour réussir son Alya.",
          "Ville prioritaire du développement national, Nof HaGalil bénéficie d'un fort soutien gouvernemental, d'infrastructures modernes, d'un réseau de transports en expansion, et d'un cadre familial, vert et sécurisé.",
          "Espaces verts, sport, loisirs et équipements culturels : piscines, terrains, amphithéâtre et commerces — une ville qui grandit et accueille chaque année de nouvelles familles.",
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
