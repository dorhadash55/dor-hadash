# Inventaire de contenu — dor-hadash.com (WordPress actuel)

Extraction réalisée le 2026-07-19 par scraping des pages publiques (accès admin WP non fourni). Le contenu complet de chaque page est aussi sauvegardé en texte brut dans `pages/*.md` et `blog/*.md` pour ne rien perdre.

**⚠️ À valider avant de commencer le code React.**

---

## 1. Arborescence / Navigation

Menu principal (identique desktop) :

```
Accueil                    /
Mission                    /mission/
L'équipe                   /lequipe/
Nos Villes                 /nos-villes/        (parent, contenu quasi vide — voir §6)
  ├─ Karmiel               /karmiel/
  ├─ Haïfa                 /haifa/
  ├─ Jérusalem             /jerusalem/
  └─ Nof HaGalil           /nof-hagalil/
Blog                       /blog/
Nous Contacter              /nous-contacter/
```

Page orpheline trouvée (liée nulle part dans le menu, mais existe et est indexable) :
```
Inscription/Dons           /inscription-dons/   → contenu VIDE (voir §6)
```

Le site compte **11 pages** et **7 articles de blog**, confirmé via l'API REST WordPress (`/wp-json/wp/v2/pages` et `/posts`) — donc pas de contenu caché qui m'aurait échappé en suivant les liens.

---

## 2. Pages — vue d'ensemble

| Page | URL actuelle | `<title>` actuel | Meta description | H1 | Notes |
|---|---|---|---|---|---|
| Accueil | `/` | DOR HADASH \| Incubateur d'alya francophone | ❌ aucune | **6 H1** (problème SEO) | Hero + 4 services (Logement/Immersion/Éducation/Emploi) + bloc "Accompagnement" |
| Mission | `/mission/` | (à copier depuis le site, non extrait ici) | ❌ aucune | 2 H1 | Citation de la Présidente + présentation du concept "village communautaire" |
| L'équipe | `/lequipe/` | — | ❌ aucune | 2 H1 | 6 membres + formulaire de contact (variante avec champ "Pays") |
| Nos Villes | `/nos-villes/` | — | ❌ aucune | 1 H1 | **Quasi vide** : juste un titre, le "contenu" ce sont les 4 liens du sous-menu (confirme votre remarque — pas de vraies cartes) |
| Karmiel | `/karmiel/` | — | ❌ aucune | 2 H1 | Contenu riche (transports, éducation, sécurité, partenaires) |
| Haïfa | `/haifa/` | — | ❌ aucune | 2 H1 | idem |
| Jérusalem | `/jerusalem/` | — | ❌ aucune | 2 H1 | Mentionne un quartier "Pisgat Zeev" |
| Nof HaGalil | `/nof-hagalil/` | — | ❌ aucune | 2 H1 | H1 = "le projet en cours" (pas le nom de la ville — à corriger) |
| Blog | `/blog/` | — | ❌ aucune | 1 H1 | Liste des 7 articles, pas de pagination |
| Nous Contacter | `/nous-contacter/` | — | ❌ aucune | 1 H1 | Formulaire (variante avec captcha maths, sans champ "Pays") |
| Inscription/Dons | `/inscription-dons/` | — | ❌ aucune | 0 H1 | **Vide** — section Divi sans contenu |

Constat SEO général : **aucune page n'a de meta description, pas de balises Open Graph, pas de JSON-LD.** Plusieurs pages ont 2 H1 (voire 6 sur l'accueil). C'est exactement le genre de dette technique que l'étape 2/2bis doit corriger.

Contenu texte intégral de chaque page : voir `pages/<nom>.md`.

---

## 3. Blog — 7 articles

| Titre | Slug / URL | Date | Auteur |
|---|---|---|---|
| Faire son Alya a Karmiel, un programme clef en main !!! | `/2024/08/06/faire-son-alya-a-karmiel-un-programme-clef-en-main/` | 2024-08-06 | Patricia Hassoun |
| Nof HaGalil – Construire l'avenir ensemble en Galilée | `/2025/09/15/nof-hagalil-construire-lavenir-ensemble-en-galilee/` | 2025-09-15 | Patricia Hassoun |
| Les astuces pour bien préparer votre déménagement à l'international | `/2025/10/12/les-astuces-pour-bien-preparer-votre-demenagement-a-linternational/` | 2025-10-12 | Patricia Hassoun |
| Guide sur les taxes d'importation pour les nouveaux immigrants | `/2025/10/22/guide-sur-les-taxes-dimportation-pour-les-nouveaux-immigrants/` | 2025-10-22 | Patricia Hassoun |
| Chers parents olim : et si le système israélien avait raison ? | `/2026/02/25/chers-parents-olim-et-si-le-systeme-israelien-avait-raison/` | 2026-02-25 | Patricia Hassoun |
| Nof HaGalil à l'aube d'un tournant historique... | `/2026/02/27/nof-hagalil-a-laube-dun-tournant-historique.../` | 2026-02-27 | Patricia Hassoun |
| Faire son Alya en famille : une aventure magnifique... qui se prépare | `/2026/03/17/faire-son-alya-en-famille-une-aventure-magnifique-qui-se-prepare/` | 2026-03-17 | Patricia Hassoun |

**Important pour le SEO / les redirections** : les URLs WordPress actuelles des articles utilisent le format `/AAAA/MM/JJ/slug/` (pas `/blog/slug/`). Le prompt initial demande de nouvelles URLs du type `/blog/nom-de-larticle` pour les *nouveaux* articles — mais si on veut **ne rien casser côté SEO existant**, il faudra soit garder les anciennes URLs `/AAAA/MM/JJ/slug/` pour ces 7 articles existants, soit mettre en place des redirections 301 propres de l'ancienne URL vers la nouvelle. Je vous poserai la question au moment de coder le blog.

Contenu intégral de chaque article : voir `blog/*.md`.

---

## 4. Équipe (page `/lequipe/`)

| Nom | Rôle | Photo |
|---|---|---|
| Patricia Hassoun | Présidente | `patricia-hassoun.png` |
| Eugène Slama | Vice-Président — Commission financière, collecte de fonds | `eugene-slama.png` |
| Rav Yoël Kling | Commission Éthique et Éducation | `rav-yoel-kling.png` |
| Maurice Hassoun | Trésorier — Commission financière | `maurice-hassoun.png` |
| Johann Habib | Avocat — Commission Éthique et Éducation, Relations extérieures | `johann-habib.png` |
| Guillaume Hassoun | Commission communication | `guillaume-hassoun.jpeg` |

---

## 5. Contact, réseaux sociaux, formulaires existants

**Coordonnées :**
- Email : `dorhadash5780@gmail.com`
- Téléphone Israël : `+972-52-226-3776` et `+972-54-692-8792`
- Téléphone France : `+33-1-86-98-19-43`
- Facebook : `facebook.com/dorhadashisrael`
- (liens LinkedIn personnels de 2 membres de l'équipe, pas un compte "Dor Hadash" officiel)

**⚠️ Deux formulaires différents cohabitent actuellement** (ce sera à unifier dans le nouveau formulaire — étape 2bis point 7) :
1. Sur `/nous-contacter/` : Nom, Adresse e-mail, Téléphone, Message + captcha mathématique simple (ex. "4 + 12 = ?")
2. Sur `/lequipe/` (et repris en bas des pages villes) : Nom, Votre email, Téléphone, **Pays de résidence actuel** (France / Israël / Autre), Message — sans captcha

Aucun champ "ville envisagée" ni "horizon de départ" n'existe actuellement — ce sont de vrais ajouts (conforme à ce qui est demandé).

Formulaire "Newsletter" en pied de page (widget simple email + bouton "Ok") sur toutes les pages.

---

## 6. Points d'attention / décisions à prendre avec vous

1. **`/nos-villes/` est quasi vide** : le contenu réel de "Nos villes" ce sont uniquement les 4 sous-pages. Il n'y a pas de témoignages/citations existants à réutiliser sur cette page — les citations d'olim par ville (étape 2bis §4) seront donc **100% du contenu que vous me fournirez**, rien à extraire du site actuel.
2. **`/inscription-dons/` est une page vide** (juste le header/footer, aucun contenu réel), non reliée au menu. À garder (et remplir), rediriger, ou supprimer dans le nouveau site ? Je recommande de la fusionner avec le nouveau formulaire de contact modernisé, mais c'est votre décision.
3. **H1 "le projet en cours"** sur la page Nof HaGalil au lieu du nom de la ville — bug existant, à corriger dans la refonte.
4. **URLs des articles de blog existants** en `/AAAA/MM/JJ/slug/` — à trancher : on garde ce format pour ne rien casser côté Google, ou on migre vers `/blog/slug/` avec redirections 301 (recommandé si on veut le format demandé en étape 2bis, mais nécessite des redirections propres après bascule DNS).
5. Je n'ai pas pu extraire le `<title>` exact ni un éventuel texte "à propos"/meta caché sur chaque page individuellement au-delà de l'accueil (le scraping public ne montre que ce qui est réellement affiché) — si un texte vous semble manquant dans `pages/*.md`, dites-le moi et je re-vérifierai la page concernée.

---

## 7. Charte graphique actuelle (extraite du code des pages)

**Couleurs** (hex trouvés dans les styles des blocs Divi, par fréquence d'usage) :

| Couleur | Usage apparent | Fréquence |
|---|---|---|
| `#0038B8` | Bleu principal (titres, accents) | dominant |
| `#084C93` | Bleu foncé secondaire | fréquent |
| `#2B87DA` | Bleu clair (liens/accents) | fréquent |
| `#29C4A9` | Vert/turquoise (accent) | fréquent |
| `#032D7A` | Bleu très foncé | occasionnel |
| `#ED4441` | Rouge/corail (accent, alertes ou CTA) | occasionnel |
| `#1A1A1A` | Texte foncé | fréquent |
| `#FFFFFF` | Fond blanc | dominant |
| `#233B4E`, `#2C55B7` | Variantes ponctuelles | rares |

**Polices** utilisées : `Roboto` (dominante), `Open Sans`, `Oswald`, `Didact Gothic`.

**Logo** : `dh_logo_apr5780_1280x1280_website.png` (1920×1050, fond probablement transparent — à vérifier à l'ouverture du fichier).
Variante trouvée : `logoBlue.png`.

**Favicon** : `cropped-favicon-{32,180,192,270}x{...}.png`.

**Pied de page** : "DOR HADASH 2020 - Tous droits réservés - Reproduction partielle ou totale interdite" (mention d'une ancienne agence web, sans impact sur la refonte).

---

## 8. Médias identifiés (à retélécharger avant la bascule DNS)

Liste complète des fichiers médias référencés dans les pages : voir `medias.json`. En résumé :
- Logo + favicon (voir §7)
- 6 photos de l'équipe (voir §4)
- Logos partenaires villes : `LOGO-Haifa-2.png`, `logo-nof-hagalil2.png`
- Photos illustratives par ville (Karmiel, Nof HaGalil, Jérusalem — captures d'écran, photos de rue, une photo générée par IA pour Karmiel)
- Une courte vidéo WhatsApp (`WhatsApp-Video-2023-12-13-at-12.40.44.mp4`) et plusieurs captures liées, utilisées sur une page ville (probablement Haïfa ou Jérusalem, à confirmer visuellement)
- Aucune vidéo YouTube intégrée actuellement (confirme que la section "témoignages vidéo" de l'étape 2bis est bien une nouveauté à 100%)

**Recommandation** : avant la bascule DNS finale, retélécharger tous ces fichiers depuis `wp-content/uploads/` et les héberger dans le nouveau projet (Vercel/Netlify), car ils cesseront d'être accessibles si l'hébergement OVH du WordPress est un jour coupé.

---

## Fichiers de cet inventaire

```
01-inventaire-contenu/
├── README.md              ← ce fichier (synthèse à valider)
├── inventaire.json        ← données structurées (pages, posts, images, nav, couleurs)
├── pages/                 ← contenu texte intégral de chaque page
│   ├── home.md, mission.md, lequipe.md, nos-villes.md,
│   ├── karmiel.md, haifa.md, jerusalem.md, nof-hagalil.md,
│   └── blog.md, nous-contacter.md, inscription-dons.md
└── blog/                  ← contenu texte intégral de chaque article
    └── post-*.md (7 fichiers)
```

**Prochaine étape** : dites-moi si cet inventaire vous semble complet et correct (notamment les points de la section 6), et je passerai à l'étape 2 (reconstruction React) une fois validé.

---

## 9. Ajouts au scope (suite à vos retours du 2026-07-19)

- **Propositions SEO** (title + meta description par page, basées sur le contenu réel existant) : voir `seo-propositions.md`.
- **Design** : le nouveau site doit avoir un rendu plus frais/friendly et une UI mobile particulièrement soignée — objectif explicite de faire mieux que l'existant (qui est un thème Divi assez daté), tout en gardant la charte graphique (couleurs, polices, logo).
- **2 nouvelles villes à ajouter : Ashdod et Bat Yam**, en plus des 4 existantes (Karmiel, Haïfa, Jérusalem, Nof HaGalil) → 6 villes au total dans "Nos Villes", dans les cartes témoignages, et dans le menu déroulant du formulaire de contact.
  - Aucun contenu source n'existe pour ces 2 villes → un premier brouillon a été rédigé dans `villes-nouvelles-brouillon/ashdod.md` et `bat-yam.md`, à valider/corriger. Les faits géographiques généraux sont vérifiables ; tout ce qui dépend du programme Dor Hadash (tarifs, partenariats, témoignages réels) est marqué `[À COMPLÉTER]` plutôt qu'inventé.
- **Page dédiée "Témoignages vidéo"** (`/temoignages-videos/`, à ajouter au menu) qui liste toutes les vidéos stockées dans Firestore (nombre illimité, gérable depuis l'admin), + un aperçu de 2-3 vidéos en teaser sur l'accueil avec lien vers cette page.
- **Articles de blog gérables depuis l'admin** (CRUD complet) — déjà prévu à l'étape 2ter, confirmé.

