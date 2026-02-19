"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { getAssetPath } from "@/lib/basePath";

const citizens = [
  {
    id: 1,
    name: "Céline DE KERPEL",
    role: "47 ans, professeure de lycée professionnel, militante France Insoumise",
    summary:
      "Professeure au lycée Louis Lumière, maman de 3 enfants, présidente de fédération de parents d'élèves pendant 10 ans et militante France Insoumise.",
    vision:
      "Céline DE KERPEL, 47 ans, maman de 3 enfants, professeure de lycée professionnel, et militante France Insoumise.\n\nChelloise depuis 18 ans (Quartier Villeneuve-Saint-Martin), j’enseigne au lycée professionnel Louis Lumière de Chelles. Je participe, en tant que citoyenne, à la vie de la ville depuis de nombreuses années : Présidente de l’Union Locale d’une Fédération de parents d’élèves pendant 10 ans, impliquée dans de nombreuses luttes (luttes contre l’exclusion, luttes scolaires avec Chelles en Colère, luttes sociales, luttes pour les droits des travailleurs, luttes pour les transports…).\n\nSensible aux causes égalitaires, j’ai trouvé en la France Insoumise un fer de lance des idées humanistes que je porte. Militante Insoumise, j’anime le groupe d’actions des insoumis·es de Chelles et j’ai été suppléante du Député de notre circonscription de 2022 à 2024.\n\nJe souhaite pouvoir contribuer à faire de Chelles une ville plus humaine, plus écologique et plus solidaire, une ville qui porte fièrement ses valeurs de justice sociale. Loyale, je ne tarirai pas d’efforts pour défendre l’intérêt des chellois et je resterai fidèle à mon ambition première, faire de Chelles une ville qu’on cite en exemple pour son bon vivre.\n\nChellois·es est un collectif dans lequel je me reconnais, un collectif qui porte la diversité de notre ville et une véritable envie de faire de Chelles une ville qui ressemble à tou·te·s les chellois·e·s.\n\n« La différence est une richesse, pas une faiblesse. » A. EINSTEIN",
    quote: "La différence est une richesse, pas une faiblesse.",
    quoteAuthor: "A. EINSTEIN",
    photo: getAssetPath("/images/Celine.png"),
  },
  {
    id: 2,
    name: "Brahim",
    role: "Ingénieur architecte en systèmes d'information",
    summary:
      "Expert en transformation numérique, j'ai accompagné de grandes entreprises dans l'automobile, l'aéronautique et l'énergie. Je m'engage pour redonner à Chelles son prestige et sa vitalité.",
    vision:
      "Ingénieur architecte en systèmes d’information, j’ai consacré ma carrière à accompagner la transformation numérique et organisationnelle de grandes entreprises internationales, évoluant dans des secteurs industriels stratégiques tels que l’automobile, l’aéronautique, les transports et l’énergie.\nMon parcours s’est construit autour de projets complexes, où la maîtrise des enjeux humains, l’innovation managériale et la rigueur méthodologique ont été les piliers de la réussite.\n\nFace à une réalité communale en perte de dynamisme, aggravée par un contexte national préoccupant, j’ai fait le choix de m’engager pleinement au service de mes concitoyens.\nCette décision repose sur une conviction profonde : Chelles mérite de retrouver son prestige, sa vitalité et son image de ville accueillante, ambitieuse et tournée vers l’avenir.\n\nJe défends une politique de proximité, fondée sur l’inclusivité et le respect de toutes les voix, l’écoute active des besoins du terrain, le pragmatisme dans les décisions, l’action concrète et mesurable, la transparence dans la gestion publique.\n\nChelles possède un potentiel exceptionnel. Ensemble, faisons de notre ville un modèle de renouveau, d’innovation et de qualité.",
    photo: getAssetPath("/images/Brahim.png"),
  },
  {
    id: 3,
    name: "Laetitia VACHELOT",
    role: "50 ans, secrétaire de direction dans une association d'aide à l'enfance",
    summary:
      "Maman de deux enfants, engagée dans le tissu associatif chellois. Je veux soutenir et valoriser les associations, cœur vivant de notre commune.",
    vision:
      "Laetitia VACHELOT, 50 ans, secrétaire de direction dans une association d’aide à l’enfance. Chelloise depuis 2016 et maman de deux enfants, je suis profondément attachée à ma ville.\n\nEngagée au sein du tissu associatif, je souhaite aujourd’hui m’investir davantage pour soutenir les associations de Chelles. Elles sont le cœur vivant de notre commune : sport, culture, solidarité, jeunesse…\n\nMon objectif est clair : accompagner ces structures, valoriser leur travail, et leur offrir davantage de visibilité et de moyens afin qu’elles puissent continuer à dynamiser notre ville et à renforcer le lien social.",
    photo: getAssetPath("/images/Laetitia.png"),
  },
  {
    id: 5,
    name: "Safia TBAHRITI",
    role: "55 ans, assistante familiale",
    summary:
      "Chelloise depuis l'enfance, maman célibataire et assistante familiale. Mon métier m'a appris l'écoute et la responsabilité. Je crois en une ville qui place l'humain au cœur de ses priorités.",
    vision: `Présentation de Safia TBAHRITI, 55 ans

  🏠 Je m’appelle Safia TBAHRITI. Chelles, c’est ma ville. J’y ai grandi, j’y ai construit ma vie, j’y ai vu passer les années, les visages, les histoires. Ici, chaque rue porte un souvenir, chaque quartier fait partie de mon histoire.

  👩‍👧 Je suis maman célibataire d’un enfant, et surtout assistante familiale. Ce métier, je ne l’ai pas choisi par hasard. J’ai ouvert ma porte et mon cœur à des enfants blessés par la vie, des enfants qui avaient besoin d’un refuge, d’une présence, d’un regard qui ne juge pas. J’ai partagé leurs peines, leurs peurs, mais aussi leurs sourires, leurs progrès, leurs renaissances.

  Ces enfants m’ont appris le courage. Ils m’ont appris que parfois, la seule chose qui peut changer une vie, c’est de se sentir aimé et protégé.

  💔 Quand on accompagne les plus fragiles, on ne peut plus détourner le regard. On comprend que la solidarité n’est pas un mot, mais une responsabilité.

  🌱 C’est pour cette raison que j’ai choisi de m’engager avec la Révolution Écologique pour le Vivant, portée par Aymeric Caron, et aux côtés de La France insoumise. Parce que je crois profondément que la politique doit protéger, soutenir et respecter le vivant, et qu’elle doit d’abord servir les êtres humains.

  🤝 Je ne suis pas une professionnelle de la politique. Je suis une femme de terrain. Une mère. Une assistante familiale. Une habitante de Chelles. Je connais les difficultés, les inquiétudes, mais aussi les espoirs des familles.

  🌅 Je m’engage pour que notre ville reste humaine.
  Pour que chaque enfant se sente en sécurité.
  Pour que chaque famille se sente soutenue.
  Pour que personne ne se sente invisible.

  💫 Je veux être une voix sincère. Une voix qui vient du cœur. Une voix qui vous ressemble.

  💪 Parce que Chelles n’est pas seulement une ville. C’est notre maison. Et une maison, on en prend soin.`,
    photo: getAssetPath("/images/Safia.png"),
  },
  {
    id: 6,
    name: "Jean-Marc FERRAND",
    role: "Enseignant de philosophie retraité, musicien",
    summary:
      "Professeur de philosophie pendant 40 ans, musicien du groupe rock Orpheus. Ex-adjoint au maire, j'ai co-fondé les Cuizines et conduit le projet des Églises.",
    vision:
      "Jean-Marc FERRAND, compagnon des philosophes (puisque je les ai enseignés 40 ans durant - et que je continue bénévolement auprès des élèves en difficulté), je suis maintenant surtout musicien au sein du groupe rock chellois \"Orpheus\".\n\nRéaliser des projets culturels d'intérêt général au profit des publics discriminés et des artistes, en associant les élus et les citoyens, m'a toujours profondément motivé en politique. Élu communiste au sein de la municipalité de gauche sous JP Planchou, j'ai eu le bonheur, en tant que Maire-adjoint chargé du Développement culturel, de co-fonder, jusqu'à sa réalisation, le projet des Cuizines (centre de musiques actuelles), de conduire celui des Églises (centre d'art contemporain), puis de porter celui de la Médiateque de Chelles, en tant que vice-président de la Communauté d'agglomération Marne et Chantereine. L'expérience m'a appris que les pratiques culturelles et artistiques peuvent être des ferments d'épanouissement individuel et d'émancipation collective, en particulier pour les jeunes et les milieux populaires.\n\nC'est ce sens de la justice sociale, du devoir républicain, de la fraternité et de l'humanisme que je retrouve au sein de la France Insoumise, de mon engagement féministe et contre toutes les discriminations et comme militant de la cause LGBT.",
    photo: getAssetPath("/images/jean-marc.png"),
  },
  {
    id: 7,
    name: "Sylvie LAFUENTE",
    role: "Retraitée, ex-adjointe au maire à l'éducation",
    summary:
      "30 ans à Chelles, direction des affaires culturelles (1998-2012) puis adjointe au maire à l'éducation. Défenseuse des Services Publics, patrimoine de ceux qui n'en ont pas.",
    vision:
      "Sylvie LAFUENTE, chelloise depuis bientôt 30 ans, maintenant retraitée, j'ai travaillé dans diverses mairies (dont celle de Chelles de 1998 à 2012 à la direction des affaires culturelles).\nJ'ai été adjointe au maire à Chelles à l’éducation en 2014. Durant ces années au service des habitant·es, j'ai pu constater que les Services Publics sont indispensables. « Ils sont le patrimoine de ceux qui n'en ont pas » disait Jaurès.\nLes Services Publics contribuent à l’intérêt général qui doit primer sur les intérêts privés et le monde de l'argent et permettre, à condition de ne pas les asphyxier, de réduire les inégalités bien mieux que les services privés marchands.\nJ'ai choisi de m'engager avec la France Insoumise voici quelques années déjà et, je crois qu'il est possible, dès 2026, de faire de notre ville un fer de lance d'une société plus juste en s'appuyant sur l'implication citoyenne afin de répondre aux préoccupations des chelloises et chellois.",
    quote: "Ils sont le patrimoine de ceux qui n'en ont pas",
    quoteAuthor: "Jaurès",
    photo: getAssetPath("/images/Sylvie.png"),
  },
  {
    id: 8,
    name: "Jimmy CAFAIT",
    role: "Expert en maintenance générale des bâtiments et sécurité",
    summary:
      "25 ans d'expérience en maintenance, sécurité et protection. Je veux contribuer à une modernisation durable et écologique de Chelles.",
    vision:
      "Jimmy CAFAIT, issu d’une formation technique en maintenance générale des bâtiments,\nj’ai acquis une solide expertise dans la gestion et l’entretien de différents types de structures, qu’il s’agisse de bâtiments publics ou de logements résidentiels.\n\nFort de plus de 25 années d’expérience dans les domaines de la sécurité privée, de la protection des biens et des personnes, j’ai développé une vision globale des enjeux liés à la sécurité, à la maintenance et à la valorisation du patrimoine communal.\nCette expérience m’a permis de développer un sens aigu du service, de la responsabilité et de l’efficacité sur le terrain.\n\nAujourd’hui, je souhaite mettre ces compétences au service des Chellois. Mon engagement s’appuie sur des valeurs fortes : proximité, égalité, solidarité et citoyenneté. Je souhaite contribuer à une modernisation durable et écologique de notre ville, en plaçant l’humain et l’intérêt collectif au cœur de chaque action.",
    photo: getAssetPath("/images/Jimmy.png"),
  },
  {
    id: 9,
    name: "Latifa ASSOUDI",
    role: "Chelloise depuis 20 ans",
    summary:
      "Je veux donner la parole à celles et ceux qu'on oublie trop souvent. Ensemble, construisons une ville plus solidaire et humaine.",
    vision:
      "Latifa ASSOUDI, chelloise depuis 20 ans, je veux donner la parole à celles et ceux qu’on oublie trop souvent.\nJe crois en une ville plus solidaire, plus humaine, et plus proche de ses habitants et je suis convaincue que, ensemble, nous pouvons faire bouger les choses.\nJ’ai choisi de m’engager avec la France Insoumise pour défendre l’égalité, la justice sociale et la dignité de toutes et tous.\nAlors, agissons ensemble pour toutes et tous !",
    photo: getAssetPath("/images/Latifa.png"),
  },
  {
    id: 10,
    name: "Belbouab SALAHDINE",
    role: "48 ans, chauffeur routier et délégué syndical",
    summary:
      "Père de quatre enfants, chauffeur routier et délégué syndical depuis 25 ans. Je défends des conditions de travail justes et l'intérêt de tous les Chellois.",
    vision: `Belbouab Salahdine — 48 ans
Marié, père de quatre enfants
Résident à Chelles depuis 10 ans
Propriétaire, installé durablement dans notre commune

Chauffeur routier depuis 25 ans et délégué syndical, j'ai construit mon engagement au cœur du monde du travail. Cette expérience m'a appris l'importance de l'écoute, du dialogue et de la détermination pour défendre des conditions de travail justes et dignes. Depuis toujours, je m'engage à représenter chaque salarié avec équité et à porter leur voix avec conviction.

Cet engagement m'a naturellement conduit à vouloir agir davantage pour ma ville. L'inspiration et le courage politique de Aymeric Caron, à travers la Révolution Écologique pour le Vivant (REV), ont renforcé ma conviction qu'il est possible de faire de la politique autrement : en plaçant le vivant, la justice sociale et l'intérêt général au cœur des décisions.

C'est pourquoi j'ai choisi de rejoindre avec la REV la liste de la La France insoumise pour les élections municipales de Chelles, avec force et détermination. Ces engagements portent une vision cohérente, ambitieuse et profondément humaine pour répondre aux défis sociaux, écologiques et démocratiques auxquels nous faisons face.

Je partage avec vous un attachement sincère à notre commune, à son histoire, à sa diversité et à son potentiel. Chelles mérite un projet clair et réaliste, tourné vers l'humain :
une ville où chacun trouve sa place,
où la solidarité est concrète,
où les décisions publiques sont prises dans l'intérêt de tous.

La REV défend une écologie exigeante, la protection des animaux, une meilleure répartition des richesses et une démocratie plus transparente. Elle porte l'idée simple mais essentielle que le progrès ne doit plus se faire au détriment de la nature ni des plus fragiles, mais au service du bien commun.

Cette vision rejoint mes convictions profondes : construire une ville plus juste, plus solidaire et plus agréable à vivre, pour nos enfants et pour les générations futures.

Ensemble, construisons un avenir qui respecte nos valeurs et protège ce que nous avons de plus précieux.`,
    photo: getAssetPath("/images/Salahdine.png"),
  },
  {
    id: 11,
    name: "Séverine SALLES",
    role: "37 ans, secrétaire des élèves dans un lycée chellois",
    summary:
      "J'ai grandi à Chelles et j'y suis revenue après 10 ans. Ensemble, retrouvons une ville solidaire et conviviale qui nous ressemble.",
    vision:
      "Séverine SALLES, 37 ans, secrétaire des élèves dans un lycée chellois.\n\nJ’ai toujours grandi à Chelles, je l’ai vue grandir et évoluer, pas toujours pour le mieux. J’y ai aussi vu de beaux changements, notamment pour notre centre-ville. J’en suis partie pendant une dizaine d’années et je reconnais aujourd’hui que le côté convivial de la ville me plaît beaucoup.\n\nAujourd’hui, Chelles a besoin de ses habitants et de ses citoyens, de tous âges et de tous horizons, pour retrouver une dynamique vers une ville qui nous ressemble davantage, plus solidaire et plus proche des uns des autres.\n\nCar c’est ensemble que l’on vit, que l’on grandit et que l’on construit.\n\nTout mon soutien à une liste qui ne ressemble à aucune autre, mais qui nous rassemble toutes et tous.",
    photo: getAssetPath("/images/Severine.png"),
  },
  {
    id: 12,
    name: "Magid MEKCHICHE",
    role: "54 ans, ingénieur, responsable d'un service d'ingénierie",
    summary:
      "Chellois de toujours, père de deux enfants, ingénieur spécialisé dans les projets complexes. Je refuse de rester spectateur et mets mon expérience au service de notre ville.",
    vision:
      "Je m’appelle Magid MEKCHICHE, 54 ans, marié et père de deux enfants. Chellois depuis toujours, j’ai vu notre ville évoluer, parfois dans le bon sens, parfois moins, et j’ai décidé de ne plus rester simple spectateur.\n\nIngénieur de formation, j’ai construit ma carrière dans l’exigence, la rigueur et la résolution de problèmes complexes. Aujourd’hui responsable d’un service d’ingénierie chez un grand opérateur d’infrastructure français, j’ai appris à affronter les difficultés, à trouver des solutions et à ne jamais reculer devant les responsabilités.\n\nCe même état d’esprit guide mon engagement avec La France Insoumise et au sein du groupe Chellois·es. Je me bats pour une ville plus juste, plus transparente, plus ambitieuse, où les décisions servent réellement ceux qui y vivent. Les valeurs que nous portons : solidarité, démocratie réelle, exigence sociale, ne sont pas des slogans : ce sont des outils pour transformer notre quotidien.\n\nJe suis là pour mettre mon expérience, mon énergie et ma détermination au service de ce changement. Je dois bien cela à la ville qui m'a vu naître et grandir.\n\nJe refuse de regarder notre ville avancer sans que les habitants aient enfin la place qu’ils méritent dans les décisions. Je m’engage parce que rien ne changera si personne n’ose relever le défi.\n\nAlors il ne tient qu’à vous de nous rejoindre pour le changement réel, pour Chelles.",
    photo: getAssetPath("/images/Magid.png"),
  },
  {
    id: 13,
    name: "Bruno POULAIN",
    role: "Expert en management et transport routier",
    summary:
      "Expérience en management, gestion et coordination. Reconverti dans le transport routier. Je veux protéger Chelles pour qu'elle atteigne son plein potentiel.",
    vision:
      "Je m'appelle Bruno POULAIN, mon parcours est marqué par une expérience significative dans le management et la responsabilité d'équipe. J'ai piloté la performance collective et individuelle grâce à la conception et au suivi d'indicateurs clés, en me portant garant de l'atteinte des objectifs.\n\nUne constante de mon parcours, de la vente au service en passant le management, est mon engagement envers la satisfaction d’autrui. J'ai cultivé un sens de l'accueil et du service dans des environnements exigeants et variés. Cette expertise s'est construite sur le terrain tout au long de ma carrière professionnelle.\nJe maîtrise les aspects opérationnels et logistiques nécessaires au bon fonctionnement d'un service. Mes expériences en gestion de restaurant et en retail m'ont appris à gérer les stocks, l'approvisionnement et à organiser l'espace de vente. Par la suite, j'ai étendu cette rigueur managériale au suivi d'activités de back-office et à la coordination de processus complexes tout pendant près de 15 ans. Cette polyvalence, alliée à une forte capacité d'adaptation, me permet de comprendre et de piloter l'ensemble de la chaîne de valeur.\nAujourd’hui j’ai opéré une reconversion réussie vers le métier du transport routier.\n\nMa vision de Chelles, une belle ville talentueuse, aux visages variés, à la culture internationale, une ville forte et qui continue à se développer. Une ville à protéger aussi pour qu’elle puisse atteindre son plein potentiel",
    photo: getAssetPath("/images/Bruno.png"),
  },
  {
    id: 14,
    name: "Meyer ASSOULINE",
    role: "64 ans, retraité, ingénieur systèmes et réseaux",
    summary:
      "Chellois depuis les années 70, ex-ingénieur et délégué syndical CGT. La ville peut être un laboratoire de société plus juste et solidaire.",
    vision:
      "Meyer ASSOULINE\n64 ans retraité\nMarié , 2 enfants.\n\nJ’habite à Chelles depuis les années 70.\nJ’ai travaillé dans le monde de l’informatique en tant qu’ingénieur systèmes et réseaux.\nJ ‘ai été délégué syndical central CGT dans une société américaine.\nJe ne supporte pas les injustices et le manque de respect, c’est ce qui m’a amené à la création d’un syndicat, qui permet de créer un contre-pouvoir et faire respecter le droit du travail, pour mieux protéger les salariés, face aux dirigeants des entreprises qui peuvent abuser de leur pouvoir et où l’entreprise peut devenir une zone de non droit.\nJ’ai participé à la création de Comité d’Entreprise, structure qui permet d’apporter du bien être aux salariés.\nJ’ai rejoint la liste LFI, car son programme correspond le plus à ma vision de la société et de la ville. Un programme qui prend en compte tous les besoins des catégories sociales, d’âges ainsi que les difficultés des citoyens. Son objectif est d’apporter un cadre de vie plus agréable.\nJ’ai envie d’apporter ma vision d’une société plus juste et solidaire, où le vivre ensemble doit être le plus harmonieux possible.\nLa ville est une petite société miniature qui peut inventer et expérimenter des actions qui pourraient s’appliquer au niveau national.",
    photo: getAssetPath("/images/Meyer.png"),
  },
  {
    id: 15,
    name: "Florentin TOSETTI",
    role: "Étudiant en école d'ingénieur à l'ENSICAEN",
    summary:
      "Étudiant ingénieur, je m'engage pour réduire les inégalités, lutter contre le réchauffement climatique et améliorer la situation étudiante.",
    vision:
      "Florentin TOSETTI, étudiant en école d'ingénieur à l’ENSICAEN à Caen depuis deux ans, j’ai passé mon enfance en Seine-et-Marne. Vivant à Chelles depuis deux ans, j’ai appris à découvrir une ville dynamique, à la fois proche de Paris et entourée de nombreux espaces bucoliques qui en font un endroit où il fait bon vivre.\n\nNéanmoins, de nombreuses inégalités contraignent certain·e·s Chellois·es à vivre avec peu. C’est en partie pour cette raison que j’ai choisi de rejoindre cette liste, qui prend en considération ces problématiques et s’engage à améliorer les conditions de vie de chacun·e.\n\nTrès inquiet également face à la question du réchauffement climatique, je suis convaincu que des mesures à l’échelle de la ville doivent être mises en place dès maintenant afin de garantir un avenir viable, notamment par la création d’espaces verts ou par une gestion rigoureuse du tri des déchets.\n\nEnfin, la situation étudiante est un autre enjeu qui m’a poussé à m’intéresser à notre liste. Les inégalités qui touchent les étudiants reflètent parfaitement celles de notre société actuelle, et il est essentiel de les combattre par des actions concrètes, même modestes, qui permettront de réduire ces écarts à l’avenir.",
    photo: getAssetPath("/images/Florentin.png"),
  },
];

export default function ChelloisEsPage() {
  const [enlargedImage, setEnlargedImage] = useState<{
    src: string;
    name: string;
    description: string;
  } | null>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardsRef = useRef<Map<number, HTMLElement>>(new Map());

  const openImageModal = useCallback(
    (src: string, name: string, description: string) => {
      setEnlargedImage({ src, name, description });
    },
    []
  );

  const closeImageModal = useCallback(() => {
    setEnlargedImage(null);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const citizenId = parseInt(
              (entry.target as HTMLElement).getAttribute("data-citizen-id") || "0"
            );
            setVisibleCards((prev) => new Set([...prev, citizenId]));
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "100px 0px 0px 0px",
      }
    );

    const currentCards = cardsRef.current;

    currentCards.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      currentCards.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  const renderDescription = useCallback((description: string) => {
    const blocks = description.split(/\n{2,}/).map((block) => block.trim());

    return (
      <div className="space-y-3">
        {blocks.map((block, index) => {
          if (!block) {
            return null;
          }

          const quoteMatch = block.match(/^«\s*(.+?)\s*»\s*(.*)$/);

          if (quoteMatch) {
            const [, quote, author] = quoteMatch;
            return (
              <blockquote
                key={`quote-${index}`}
                className="rounded-2xl border border-campaign-light/60 bg-campaign-light/40 px-4 py-3"
              >
                <p className="text-campaign-dark italic text-base sm:text-lg">
                  « {quote} »
                </p>
                {author && (
                  <cite className="block mt-2 text-xs sm:text-sm text-campaign-gray not-italic font-semibold">
                    {author}
                  </cite>
                )}
              </blockquote>
            );
          }

          return (
            <p
              key={`desc-${index}`}
              className="text-campaign-gray text-sm sm:text-base leading-relaxed whitespace-pre-line"
            >
              {block}
            </p>
          );
        })}
      </div>
    );
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="relative pt-28 pb-16 text-white overflow-hidden bg-[linear-gradient(120deg,#6E1FCB,#EC4F9D,#E51E3E)]">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_55%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            Nous sommes Chellois·es
          </h1>
        </div>
      </section>

      <section className="section-padding section-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 items-start">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white">
              <Image
                src={getAssetPath("/images/Metting.png")}
                alt="Meeting citoyen Chellois·es"
                width={960}
                height={640}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4 text-campaign-gray text-lg leading-relaxed">
              <p className="text-campaign-dark font-semibold text-xl">
                Bienvenue dans le collectif Chellois·es !
              </p>
              <p>Venez rencontrer ses membres et apprendre à les connaître.</p>
              <p>Vous verrez... c&apos;est un collectif qui vous ressemble.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-campaign-dark">
              45 candidat·es engage·es
            </h2>
            <p className="text-campaign-gray mt-3">
              Voici 15 portraits pour faire connaissance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {citizens.map((citizen) => (
              <article
                key={citizen.id}
                data-citizen-id={citizen.id}
                ref={(el) => {
                  if (el) {
                    cardsRef.current.set(citizen.id, el);
                  } else {
                    cardsRef.current.delete(citizen.id);
                  }
                }}
                role="button"
                tabIndex={0}
                onClick={() =>
                  openImageModal(citizen.photo, citizen.name, citizen.vision)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openImageModal(
                      citizen.photo,
                      citizen.name,
                      citizen.vision
                    );
                  }
                }}
                className={`card p-6 bg-gradient-to-br from-campaign-light via-white to-white border-2 border-campaign-purple/30 shadow-md hover:shadow-lg hover:border-campaign-purple/60 overflow-hidden relative group transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-campaign-red focus-visible:ring-offset-2 ${
                  visibleCards.has(citizen.id)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDuration: "700ms",
                  transitionDelay: visibleCards.has(citizen.id)
                    ? `${Array.from(visibleCards).indexOf(citizen.id) * 60}ms`
                    : "0ms",
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-campaign-purple via-campaign-pink to-campaign-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-start gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      openImageModal(
                        citizen.photo,
                        citizen.name,
                        citizen.vision
                      )
                    }
                    className="relative w-24 h-24 rounded-2xl overflow-hidden bg-campaign-light flex-shrink-0 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-campaign-red focus:ring-offset-2 group"
                  >
                    <Image
                      src={citizen.photo}
                      alt={citizen.name}
                      width={192}
                      height={192}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-campaign-dark">
                      {citizen.name}
                    </h3>
                    <p className="text-sm text-campaign-gray">{citizen.role}</p>
                  </div>
                </div>

                <p className="text-campaign-gray mt-4 text-sm leading-relaxed">{citizen.summary}</p>

              </article>
            ))}
          </div>
        </div>
      </section>

      {enlargedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-300 p-4 sm:p-6 md:p-8"
          onClick={closeImageModal}
        >
          <div
            className="relative w-full max-w-4xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeImageModal}
              className="absolute -top-10 sm:-top-12 right-0 text-white hover:text-campaign-red transition-colors text-3xl sm:text-4xl font-light leading-none z-10"
              aria-label="Fermer"
            >
              ×
            </button>
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-white max-h-[85vh] flex flex-col">
              <div className="relative w-full flex items-center justify-center bg-black/5">
                <Image
                  src={enlargedImage.src}
                  alt={enlargedImage.name}
                  width={1200}
                  height={1200}
                  className="w-full h-auto max-h-[60vh] object-contain"
                  priority
                />
              </div>
              <div className="px-5 py-4 border-t border-black/10 overflow-y-auto">
                <p className="text-campaign-dark text-base sm:text-lg font-semibold">
                  {enlargedImage.name}
                </p>
                <div className="mt-2">
                  {renderDescription(enlargedImage.description)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
