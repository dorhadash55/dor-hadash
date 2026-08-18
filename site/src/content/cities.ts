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
    // Pas de gallery hero : photo propre via `image` (les slides PPT ont du texte intégré)
    galleryMore: [
      {
        src: "/images/cities/karmiel/bienvenue.jpg",
        caption: "Bienvenue à Karmiel",
        fit: "contain",
      },
      {
        src: "/images/cities/karmiel/coeur-galilee.jpg",
        caption: "Karmiel, le cœur de la Galilée",
        fit: "contain",
      },
      {
        src: "/images/cities/karmiel/culture-loisirs.jpg",
        caption: "Culture et loisirs à Karmiel",
        fit: "contain",
      },
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
    tagline: "Une ville abordable, religieuse et branchée — entre mer et Carmel",
    image: "/images/haifa.jpg",
    gallery: [
      {
        src: "/images/cities/haifa/vue-baie.jpg",
        caption: "Haïfa, entre le Carmel et la mer",
        fit: "cover",
      },
      {
        src: "/images/cities/haifa/plage-coucher.jpg",
        caption: "La grande bleue au pied de la ville",
        fit: "cover",
      },
      {
        src: "/images/cities/haifa/rue-palmiers.jpg",
        caption: "Vie de quartier, cafés et palmiers",
        fit: "cover",
      },
    ],
    galleryMore: [
      {
        src: "/images/cities/haifa/plaquette-recto.jpg",
        caption: "Dor Hadash implante son incubateur d'Alya à Haïfa",
        fit: "contain",
      },
      {
        src: "/images/cities/haifa/plaquette-verso.jpg",
        caption: "Programme et piliers d'intégration à Haïfa",
        fit: "contain",
      },
      {
        src: "/images/cities/haifa/vue-port.jpg",
        caption: "Ville portuaire dynamique",
        fit: "contain",
      },
    ],
    intro: [
      "Tel Aviv fait la fête, Jérusalem prie, Haïfa travaille. Ville portuaire dynamique de 280 000 habitants, Haïfa dément son stéréotype somnolent grâce à ses logements abordables, sa diversité, son ambiance détendue et son judaïsme pratiqué.",
      "Dor Hadash y déploie son incubateur d'Alya : organisation d'accueil avec coordinateur municipal, accompagnement administratif, et ancrage dans la communauté francophone du Rav Dr Elyaou Zini, rabbin du Technion.",
    ],
    sections: [
      {
        heading: "Une ville qui travaille, entre mer et Carmel",
        paragraphs: [
          "Haïfa abrite le complexe Matam dédié à la high-tech (Intel, IBM, Motorola, Google, Yahoo!, Philips), ainsi que le Technion et l'université de Haïfa. Le quartier du port a été entièrement réhabilité.",
          "Entre la mer et le mont Carmel, la ville offre aussi les jardins bahaïs, des malls, cinémas et espaces de loisirs — une ville vivante, verdoyante et ouverte.",
        ],
      },
      {
        heading: "Logement, transports et croissance",
        paragraphs: [
          "Les loyers du centre-ville restent nettement inférieurs à ceux des autres grandes villes. Les prix sont environ 30 % moins chers que le marché national (environ 2 500 à 3 500 ₪ selon la taille, le quartier et le meublé).",
          "Transports remarquables : train, bus hybrides et le seul métro d'Israël. Une croissance démographique de 60 000 habitants est attendue d'ici 2025.",
        ],
      },
      {
        heading: "Dor Hadash à Haïfa",
        paragraphs: [
          "Une organisation d'accueil par un coordinateur municipal, interface entre les olim et le lieu d'accueil, et un accompagnement administratif porté par la communauté bienveillante et intégrée du Rav Dr Elyaou Zini.",
          "Partenaires : Agence juive, municipalité de Haïfa, communauté du Rav Zini, et Qualita — pour faciliter l'intégration des olim de France.",
        ],
      },
      {
        heading: "Logement, immersion, éducation, emploi",
        paragraphs: [
          "Logement : aide à la recherche sur place ou en visio avant l'arrivée — loyers accessibles selon quartier et meublé.",
          "Immersion : oulpan intensif tous les matins pendant les 5 premiers mois ; activité bénévole l'après-midi (parrainage par des familles francophones locales) ou activité professionnelle d'appoint.",
          "Éducation : orientation scolaire selon le profil de la famille (réseau traditionnaliste et religieux disponible selon les établissements).",
          "Emploi : bilan de compétences, formation et orientation professionnelle — les opportunités dépendent du profil, de la ville et de l'éligibilité aux dispositifs.",
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
          "Éducation : orientation scolaire dans le réseau de la ville — établissements traditionnalistes et religieux selon le projet familial.",
          "Emploi : bilan de compétences, formation et suivi avec le Hub de l'emploi de Qualita — selon le profil et les dispositifs disponibles.",
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
          "Réduction d'impôt pouvant atteindre 18 % selon les critères d'éligibilité — un levier utile pour les familles et les professionnels, à confirmer au cas par cas.",
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
    slug: "netivot",
    name: "Netivot",
    tagline: "Ville familiale du Neguev — croissance, avantages fiscaux et communauté francophone",
    image: "/images/netivot.jpg",
    gallery: [
      {
        src: "/images/cities/netivot/vue-aerienne.jpg",
        caption: "Netivot, ville en plein essor",
        fit: "cover",
      },
      {
        src: "/images/cities/netivot/ville-familiale.jpg",
        caption: "Une ville familiale",
        fit: "contain",
      },
      {
        src: "/images/cities/netivot/centre-ville.jpg",
        caption: "Centre-ville et commerces",
        fit: "contain",
      },
    ],
    galleryMore: [
      {
        src: "/images/cities/netivot/bienvenue.jpg",
        caption: "Présentation de Netivot",
        fit: "contain",
      },
      {
        src: "/images/cities/netivot/education.jpg",
        caption: "Éducation",
        fit: "contain",
      },
      {
        src: "/images/cities/netivot/services-publics.jpg",
        caption: "Services publics",
        fit: "contain",
      },
      {
        src: "/images/cities/netivot/travail.jpg",
        caption: "Emploi et insertion",
        fit: "contain",
      },
      {
        src: "/images/cities/netivot/avantages.jpg",
        caption: "Les avantages de vivre à Netivot",
        fit: "contain",
      },
      {
        src: "/images/cities/netivot/projets.jpg",
        caption: "Projets à venir",
        fit: "contain",
      },
      {
        src: "/images/cities/netivot/quartiers.jpg",
        caption: "Quartiers en construction",
        fit: "contain",
      },
      {
        src: "/images/cities/netivot/communautes.jpg",
        caption: "Diverses communautés",
        fit: "contain",
      },
      {
        src: "/images/cities/netivot/contact.jpg",
        caption: "Contact mairie — Yael Nahmias",
        fit: "contain",
      },
    ],
    intro: [
      "Fondée en 1956, Netivot a obtenu le statut de ville en 2001. Elle compte aujourd'hui environ 60 000 habitants.",
      "Un accord d'extension prévoit 32 000 nouveaux logements, avec un objectif d'environ 140 000 habitants. Ville paisible et chaleureuse — connue comme la ville de Baba Salé — Netivot attire de plus en plus de familles francophones.",
    ],
    sections: [
      {
        heading: "Situation et avantages",
        paragraphs: [
          "Netivot est proche du centre du pays : environ 80 km de Tel Aviv, 90 km de Jérusalem, et 28 km de Beer Sheva et Ashkelon. Grâce à l'amélioration des lignes ferroviaires, le trajet jusqu'à Tel Aviv prend environ 60 minutes.",
          "Avantages fiscaux pour les résidents : les salaires jusqu'à 16 000 shekels par mois ne sont pas soumis à l'impôt sur le revenu. Les loyers et les prix d'achat sont nettement inférieurs à ceux du centre et d'autres villes du sud.",
          "Grâce à une nouvelle loi, les olim hadashim qui s'installent à Netivot peuvent bénéficier d'une aide au loyer allant jusqu'à 2 000 shekels par famille et par mois pendant 2 ans.",
        ],
      },
      {
        heading: "Éducation",
        paragraphs: [
          "Netivot offre un large choix d'écoles et de maternelles correspondant aux différents niveaux religieux : haredi, torani, dati leumi, memlahti.",
          "Les établissements proposent plusieurs parcours, notamment en sciences. La ville a développé un modèle de recherche urbaine en partenariat avec le ministère de l'Éducation : chaque école mène des projets adaptés à son public, avec l'appui d'entreprises, d'institutions académiques et d'enseignants spécialistes.",
          "Un campus religieux (hommes et femmes séparés) permet des études supérieures — par exemple licence en travail social, économie et comptabilité, génie industriel et gestion, ou éducation.",
        ],
      },
      {
        heading: "Emploi",
        paragraphs: [
          "À Netivot et dans ses alentours, des services d'emploi accompagnent la recherche de travail. La ville développe des centres dédiés à l'essor de l'industrie et à la création d'emplois de qualité.",
          "Le centre municipal d'opportunités d'emploi accompagne les résidents de 18 à 67 ans : diagnostic initial, accompagnement personnalisé, suivi jusqu'à l'insertion, formation professionnelle et mise en relation avec les employeurs.",
          "Des débouchés existent notamment dans l'éducation, la comptabilité et l'industrie.",
        ],
      },
      {
        heading: "Vie familiale et services",
        paragraphs: [
          "Chaque quartier dispose de plusieurs parcs. On y trouve un lac artificiel idéal pour les pique-niques, des terrains de foot et de basket, une promenade piétonne et cyclable, une aire de jeux et un pumptrack.",
          "Dans le complexe résidentiel Manhattan, un espace de jeux spectaculaire avec jets d'eau. Un parc commémoratif rénové accueille des événements pour les écoles et le public. La ville compte aussi deux piscines municipales, dont une avec horaires séparés.",
          "Bibliothèque, conservatoire (cours de musique et concerts), Mishkan Apais pour les spectacles, salle de jeux pour enfants : un large choix d'activités toute l'année, y compris extrascolaires.",
        ],
      },
      {
        heading: "Logement et projets",
        paragraphs: [
          "Ces dernières années, 17 000 logements ont été commercialisés dans les quartiers ouest. Un second accord-cadre pour 32 000 logements vise 140 000 habitants d'ici dix ans. Les prix restent nettement plus bas que dans le centre ou d'autres villes du sud.",
          "Début 2026, l'hôpital Hadassah ouvrira ses portes avec des urgences et d'autres services. Un grand country club familial est en construction. La synagogue francophone, avec son centre d'étude, devrait être achevée d'ici environ un an et demi.",
        ],
      },
      {
        heading: "Communauté francophone",
        paragraphs: [
          "Ville de Baba Salé : une ville centrée sur la foi, avec de nombreuses synagogues, mikvés, cours de Torah et activités pour toute la famille.",
          "Vous y trouverez un large éventail de communautés — une belle et grande communauté francophone, ainsi que des communautés haredim ashkénazes ou séfarades, dati leumi… Chaque communauté propose des activités pour les fêtes et tout au long de l'année.",
          "La communauté francophone, en partenariat avec la mairie, propose études, cours de Torah, soirées femmes pour Roch Hodech et activités pendant les vacances scolaires.",
        ],
      },
      {
        heading: "Contact mairie",
        paragraphs: [
          "Yael Nahmias, coordinatrice des olim hadashim pour la mairie de Netivot — 054-945-2055 · yael.n@netivot.muni.il",
        ],
      },
    ],
    testimonials: [],
  },
  {
    slug: "ashdod",
    name: "Ashdod",
    tagline: "La Méditerranée, une communauté chaleureuse, une ville où construire son avenir",
    image: "/images/cities/ashdod.jpg",
    gallery: [
      {
        src: "/images/cities/ashdod/parc-yam.jpg",
        caption: "Parc Ashdod-Yam — lac et front de mer",
        fit: "cover",
      },
      {
        src: "/images/cities/ashdod/parc-lac.jpg",
        caption: "Promenade et lac du parc Yam",
        fit: "cover",
      },
      {
        src: "/images/cities/ashdod/plage.jpg",
        caption: "Plages d'Ashdod",
        fit: "cover",
      },
      {
        src: "/images/cities/ashdod/marina-soleil.jpg",
        caption: "Marina d'Ashdod au coucher du soleil",
        fit: "cover",
      },
      {
        src: "/images/cities/ashdod/promenade-nuit.jpg",
        caption: "Front de mer illuminé",
        fit: "cover",
      },
    ],
    galleryMore: [
      {
        src: "/images/cities/ashdod/fontaines.jpg",
        caption: "Espaces de loisirs en bord de mer",
        fit: "cover",
      },
      {
        src: "/images/cities/ashdod/marina.jpg",
        caption: "Marina et vie nautique",
        fit: "cover",
      },
      {
        src: "/images/cities/ashdod/kitesurf.jpg",
        caption: "Sports et activités sur la plage",
        fit: "cover",
      },
      {
        src: "/images/cities/ashdod/sculpture.jpg",
        caption: "Ashdod — landmarks et vie urbaine",
        fit: "contain",
      },
    ],
    intro: [
      "Ashdod séduit par son équilibre rare : une grande ville israélienne ouverte sur la mer, dynamique et familiale, où chacun peut trouver sa place. Son identité s'est construite grâce aux vagues d'Alya successives, qui ont créé une mosaïque humaine riche, une vie juive plurielle et un véritable esprit d'entraide.",
      "À une quarantaine de kilomètres de Tel-Aviv, la ville associe plages, parcs, équipements culturels et sportifs, services de santé modernes et bassins d'emploi diversifiés. Sa communauté francophone déjà bien implantée permet aux nouveaux olim d'être entourés dès leur arrivée, tout en avançant progressivement vers une intégration pleine dans la société israélienne.",
    ],
    sections: [
      {
        heading: "Une ville pensée pour la vie quotidienne",
        paragraphs: [
          "Ville portuaire majeure, Ashdod est aussi une ville de quartiers : chaque secteur possède ses commerces, établissements scolaires, synagogues, espaces verts et services de proximité. Cette organisation facilite la vie des familles et permet de choisir un environnement adapté à son mode de vie — laïc, traditionnel ou religieux.",
        ],
      },
      {
        heading: "Un cadre de vie méditerranéen",
        paragraphs: [
          "Un vaste littoral, des plages accessibles, une promenade maritime et une marina. De grands espaces verts, notamment le parc Ashdod-Yam et le parc du Lakhish.",
          "Une programmation culturelle variée : spectacles, musées, festivals, médiathèques et activités municipales. De nombreux équipements sportifs, centres communautaires et activités pour tous les âges.",
        ],
      },
      {
        heading: "Une ville connectée et équipée",
        paragraphs: [
          "La gare Ashdod Ad Halom relie la ville au centre du pays et au sud ; un réseau de bus dessert les quartiers. Le port et les zones industrielles soutiennent un important bassin économique et logistique.",
          "L'hôpital public universitaire Assuta Ashdod renforce l'offre médicale locale, aux côtés des quatre caisses de santé.",
        ],
      },
      {
        heading: "Une ville d'Alya",
        paragraphs: [
          "Ashdod accueille depuis toujours des populations venues de nombreux pays. La municipalité dispose d'un service dédié à l'Alya et à la Klita, avec des coordinateurs parlant notamment français. Les nouveaux immigrants peuvent y recevoir une première orientation, une aide pour certaines démarches en hébreu et un accompagnement vers les services municipaux et nationaux.",
          "Pour un nouvel olé francophone, cette présence institutionnelle, associative et communautaire constitue un appui précieux — sans remplacer l'apprentissage de l'hébreu, clé de l'autonomie et de l'intégration durable.",
        ],
      },
      {
        heading: "Dor Hadash à Ashdod",
        paragraphs: [
          "Dor Hadash prépare chaque famille en amont, sécurise son installation et reste présente après l'arrivée. À Ashdod, cet accompagnement s'appuie sur la connaissance du terrain, un réseau de bénévoles et des partenaires spécialisés.",
          "Avant l'Alya : étude personnalisée du projet (composition familiale, budget, emploi, scolarité, santé et choix du quartier), préparation administrative, Oulpan Zahav pour adultes et enfants, et préparation professionnelle.",
          "À l'arrivée : orientation vers les premières formalités (banque, caisse de santé, ministère de l'Alya et de l'Intégration, Bituah Leumi, municipalité), aide à la recherche d'un logement, inscriptions scolaires et mise en relation avec la communauté locale.",
          "Dans la durée : suivi de l'intégration familiale, scolaire et professionnelle ; Pont Éducatif pour l'école israélienne ; point financier au huitième mois ; orientation vers les bons interlocuteurs selon les besoins.",
        ],
      },
      {
        heading: "Les 4 piliers de votre installation",
        paragraphs: [
          "Logement : définition des quartiers compatibles avec votre budget et votre mode de vie ; recherche à distance ou sur place ; lecture des conditions du bail et anticipation des garanties demandées.",
          "Immersion : oulpan, pratique quotidienne de l'hébreu, activités municipales, bénévolat et rencontres avec des familles déjà installées — pour créer rapidement des repères et un réseau local.",
          "Éducation : orientation vers les établissements adaptés — publics, publics religieux ou autres cadres reconnus — puis suivi des inscriptions et de l'adaptation scolaire grâce au Pont Éducatif.",
          "Emploi : clarification du projet professionnel, adaptation du CV au marché israélien, activation des réseaux, orientation vers la formation, l'emploi salarié ou la création d'activité.",
        ],
      },
      {
        heading: "Partenaires et relais",
        paragraphs: [
          "Agence Juive pour Israël, Ministère de l'Alya et de l'Intégration, municipalité d'Ashdod, partenaires associatifs et professionnels.",
        ],
      },
    ],
    testimonials: [],
  },
  {
    slug: "bat-yam",
    name: "Bat Yam",
    tagline: "La Méditerranée aux portes de Tel-Aviv, une ville en pleine transformation",
    image: "/images/cities/bat-yam.jpg",
    gallery: [
      {
        src: "/images/cities/bat-yam/fleurs-mer.jpg",
        caption: "La Méditerranée vue depuis Bat Yam",
        fit: "cover",
      },
      {
        src: "/images/cities/bat-yam/promenade-sculpture.jpg",
        caption: "Promenade maritime — Bat Yam 100 ans",
        fit: "cover",
      },
      {
        src: "/images/cities/bat-yam/paddle.jpg",
        caption: "Plages et sports nautiques",
        fit: "cover",
      },
      {
        src: "/images/cities/bat-yam/tours.jpg",
        caption: "Renouvellement urbain et nouveaux quartiers",
        fit: "cover",
      },
      {
        src: "/images/cities/bat-yam/promenade-coucher.jpg",
        caption: "Promenade au coucher du soleil",
        fit: "cover",
      },
    ],
    intro: [
      "Bat Yam offre un cadre rare au cœur du Goush Dan : une ville méditerranéenne, familiale et populaire, directement reliée à Tel-Aviv. En 2026, elle célèbre son centenaire et affirme une identité tournée vers la mer, la vie de quartier et le renouvellement urbain.",
      "Avec plus de 125 000 habitants, Bat Yam réunit plages, promenade maritime, équipements culturels, écoles et services de proximité sur un territoire compact. Sa situation permet de profiter des opportunités professionnelles, universitaires et médicales de toute la métropole, tout en conservant une atmosphère plus accessible et communautaire.",
    ],
    sections: [
      {
        heading: "Bat Yam, la Méditerranée au cœur du Goush Dan",
        paragraphs: [
          "Bat Yam est une ville dense et vivante, organisée autour de quartiers aux identités distinctes. Commerces, écoles, synagogues, centres communautaires et transports sont généralement proches, ce qui simplifie le quotidien et permet de choisir un environnement correspondant à son mode de vie — laïc, traditionnel ou religieux.",
        ],
      },
      {
        heading: "Un cadre de vie tourné vers la mer",
        paragraphs: [
          "Une promenade maritime animée et des plages accessibles pour la baignade, le sport et les sorties en famille. Un littoral en renouvellement, des espaces publics réaménagés et une vie de quartier à taille humaine.",
          "Une offre culturelle active : Palais de la culture, réseau de bibliothèques, musées de Bat Yam, conservatoire, spectacles et festivals. Des centres communautaires, équipements sportifs et activités municipales pour les enfants, les jeunes, les familles et les seniors.",
        ],
      },
      {
        heading: "Une ville connectée à toute la métropole",
        paragraphs: [
          "La ligne rouge du tramway dessert Bat Yam par dix stations et la relie directement à Tel-Aviv, Ramat Gan, Bnei Brak et Petah Tikva. Les gares Bat Yam–Yoseftal et Bat Yam–Komemiyut, les bus et l'accès à l'Ayalon complètent les déplacements vers le centre du pays.",
          "Les quatre caisses de santé sont présentes en ville ; l'hôpital Wolfson à Holon et les grands centres médicaux de Tel-Aviv sont rapidement accessibles.",
        ],
      },
      {
        heading: "Une ville d'Alya et de diversité",
        paragraphs: [
          "Bat Yam s'est construite grâce à plusieurs vagues d'Alya et accueille des habitants venus de nombreux pays. Le service municipal de l'Alya et de la Klita accompagne les nouveaux immigrants, les oriente dans leurs démarches et propose des activités favorisant l'intégration sociale et communautaire.",
          "Pour un nouvel olé francophone, la proximité de Tel-Aviv et la présence de services municipaux et communautaires constituent de vrais atouts — sans remplacer l'apprentissage de l'hébreu, clé de l'autonomie et de l'intégration durable.",
        ],
      },
      {
        heading: "Dor Hadash à Bat Yam",
        paragraphs: [
          "Dor Hadash prépare chaque famille en amont, sécurise son installation et reste présente après l'arrivée. À Bat Yam, cet accompagnement tient compte des réalités du Goush Dan : marché locatif tendu, déplacements métropolitains, scolarité, emploi et construction rapide d'un réseau local.",
          "Avant l'Alya : étude personnalisée du projet (composition familiale, budget, emploi, scolarité, santé et choix du quartier), préparation administrative, Oulpan Zahav pour adultes et enfants, et préparation professionnelle.",
          "À l'arrivée : orientation vers les premières formalités (banque, caisse de santé, ministère de l'Alya et de l'Intégration, Bituah Leumi, municipalité), aide à la recherche d'un logement, inscriptions scolaires et mise en relation avec la communauté locale.",
          "Dans la durée : suivi de l'intégration familiale, scolaire et professionnelle ; Pont Éducatif pour l'école israélienne ; point financier au huitième mois ; orientation vers les bons interlocuteurs selon les besoins.",
        ],
      },
      {
        heading: "Les 4 piliers de votre installation",
        paragraphs: [
          "Logement : choix du quartier selon le budget, le mode de vie et l'accès aux transports ; recherche à distance ou sur place ; lecture du bail, vérification du contexte de rénovation urbaine et anticipation des garanties demandées.",
          "Immersion : oulpan, pratique quotidienne de l'hébreu, activités municipales, bénévolat et rencontres avec des familles déjà installées — pour créer rapidement des repères et un réseau local.",
          "Éducation : orientation vers les établissements adaptés — publics, publics religieux ou autres cadres reconnus — puis suivi des inscriptions et de l'adaptation scolaire grâce au Pont Éducatif.",
          "Emploi : clarification du projet professionnel, adaptation du CV au marché israélien, activation des réseaux et accès aux opportunités de Bat Yam, Holon, Tel-Aviv et de l'ensemble du Goush Dan.",
        ],
      },
      {
        heading: "Partenaires et relais",
        paragraphs: [
          "Agence Juive pour Israël, Ministère de l'Alya et de l'Intégration, municipalité de Bat Yam, partenaires associatifs et professionnels.",
        ],
      },
    ],
    testimonials: [],
  },
];

export const getCityBySlug = (slug: string) =>
  cities.find((c) => c.slug === slug);
