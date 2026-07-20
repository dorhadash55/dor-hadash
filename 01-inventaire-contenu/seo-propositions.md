# Propositions SEO (title + meta description) par page

Basé sur le contenu réel déjà présent sur le site (voir `pages/*.md` et `blog/*.md`). Aucune page actuelle n'a de meta description ni de title optimisé — voici des propositions à valider/ajuster avant intégration dans le code.

## Pages

| Page | Title proposé | Meta description proposée |
|---|---|---|
| Accueil `/` | Dor Hadash \| Incubateur d'Alya francophone en Israël | Dor Hadash accompagne les francophones dans leur Alya en Israël : logement, immersion, éducation, emploi. Un accompagnement complet pour réussir votre intégration. |
| Mission `/mission/` | Notre mission \| Dor Hadash | Découvrez la mission de Dor Hadash, incubateur d'Alya pensé pour une intégration sociale et professionnelle réussie des olim francophones en Israël. |
| L'équipe `/lequipe/` | L'équipe Dor Hadash \| Qui sommes-nous ? | Rencontrez l'équipe de l'association Dor Hadash : présidente, trésorier, avocat et commissions dédiées, au service de votre projet d'Alya. |
| Nos Villes `/nos-villes/` | Nos villes d'accueil \| Dor Hadash | Découvrez les villes partenaires de Dor Hadash pour votre Alya : Karmiel, Haïfa, Jérusalem, Nof HaGalil, Ashdod et Bat Yam. Trouvez la ville qui vous correspond. |
| Karmiel `/karmiel/` | Faire son Alya à Karmiel \| Dor Hadash | Installez-vous à Karmiel, l'une des plus belles villes d'Israël : logement, éducation, transports, sécurité. Dor Hadash vous accompagne à chaque étape. |
| Haïfa `/haifa/` | Faire son Alya à Haïfa \| Dor Hadash | Haïfa, ville portuaire dynamique et abordable : logement à loyer modéré, éducation de qualité, oulpan et formation professionnelle avec Dor Hadash. |
| Jérusalem `/jerusalem/` | Faire son Alya à Jérusalem \| Dor Hadash | Installez-vous à Jérusalem : accompagnement communautaire, oulpan, coaching emploi et intégration réussie avec le programme Dor Hadash. |
| Nof HaGalil `/nof-hagalil/` | Faire son Alya à Nof HaGalil \| Dor Hadash | Nof HaGalil, la plus grande ville de Galilée : logement, éducation, formation en alternance. Un programme d'un an avec Dor Hadash pour réussir votre Alya. |
| Ashdod `/ashdod/` *(nouvelle page)* | Faire son Alya à Ashdod \| Dor Hadash | **⚠️ à rédiger avec vous — pas de contenu source existant, voir question ouverte** |
| Bat Yam `/bat-yam/` *(nouvelle page)* | Faire son Alya à Bat Yam \| Dor Hadash | **⚠️ à rédiger avec vous — pas de contenu source existant, voir question ouverte** |
| Blog `/blog/` | Blog \| Conseils et actualités Alya - Dor Hadash | Conseils pratiques, témoignages et actualités pour préparer votre Alya en Israël : démarches, logement, emploi, éducation. Le blog de Dor Hadash. |
| Nous Contacter `/nous-contacter/` | Nous contacter \| Dor Hadash | Une question sur votre Alya ? Contactez l'équipe Dor Hadash par téléphone, email ou via notre formulaire. Réponse rapide garantie. |

## Articles de blog

| Article | Meta description proposée |
|---|---|
| Faire son Alya a Karmiel, un programme clef en main | Dor Hadash propose de faire votre Alya à Karmiel en Galilée grâce à un programme clé en main, avec des solutions pour le logement, l'intégration et l'emploi. |
| Nof HaGalil – Construire l'avenir ensemble en Galilée | La vision sioniste de Dor Hadash à Nof HaGalil : quand les olim s'installent ensemble, la force de la communauté se déploie autour de la solidarité et de la culture. |
| Les astuces pour bien préparer votre déménagement à l'international | Nos conseils pratiques pour préparer sereinement votre déménagement international dans le cadre de votre projet d'Alya en Israël. |
| Guide sur les taxes d'importation pour les nouveaux immigrants | En tant qu'olim, vous avez le droit d'importer certains biens en Israël sans payer de taxes. Notre guide complet sur les taxes d'importation à connaître. |
| Chers parents olim : et si le système israélien avait raison ? | Un témoignage sur le système scolaire israélien vu par des parents olim, cinq ans après leur Alya, entre adaptation et regard nouveau sur l'éducation. |
| Nof HaGalil à l'aube d'un tournant historique | Un événement majeur pour Nof HaGalil : 16 milliards de shekels d'investissement et 10 000 nouveaux habitants attendus dans la ville partenaire de Dor Hadash. |
| Faire son Alya en famille : une aventure magnifique qui se prépare | Faire son Alya en famille est un projet chargé de sens et d'espoir. Nos conseils pour préparer cette aventure exceptionnelle avec sérénité. |

---

**Note technique** : ces title/meta seront injectés par page via le système de meta tags React (react-helmet-async ou équivalent selon le framework choisi), avec en complément les balises Open Graph (og:title, og:description, og:image) et le JSON-LD Organization, comme prévu à l'étape 2bis.
