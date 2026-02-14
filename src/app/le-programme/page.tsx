"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useCallback, useEffect, useRef } from "react";

const faqs = [
  {
    category: "Un nouveau souffle démocratique",
    items: [
      {
        q: "Comment rendre la démocratie locale plus directe ?",
        a: "Mettre en place des référendums citoyens, ouvrir des temps de questions lors des conseils municipaux et permettre des pétitions citoyennes à partir de 5 % des habitant·e·s.",
      },
      {
        q: "Comment garantir la transparence municipale ?",
        a: "Captation et diffusion des conseils municipaux, transparence financière sur les frais de la municipalité et plafonnement des indemnités du maire et de ses adjoints.",
      },
      {
        q: "Comment associer les habitant·e·s aux décisions ?",
        a: "Création de conseils de quartiers et droit de vote aux mineur·e·s de plus de 16 ans et aux étranger·e·s lors des votations citoyennes.",
      },
    ],
  },
  {
    category: "Améliorer la mobilité",
    items: [
      {
        q: "Comment améliorer les transports au quotidien ?",
        a: "Tendre vers la gratuité des transports, augmenter la fréquence des bus (horaires scolaires et week-ends) et adapter les transports aux personnes à mobilité réduite.",
      },
      {
        q: "Comment désengorger le centre-ville ?",
        a: "Créer un parking gratuit et des navettes gratuites vers la gare, repenser le plan de circulation de certains quartiers.",
      },
      {
        q: "Quelle place pour les mobilités douces ?",
        a: "Développer un réseau cyclable intercommunal avec PVM, sécuriser les axes, soutenir le VIF4 et multiplier les stationnements vélos sécurisés.",
      },
    ],
  },
  {
    category: "Se soigner à Chelles",
    items: [
      {
        q: "Comment lutter contre la désertification médicale ?",
        a: "Implanter un ou plusieurs centres de santé, renforcer la prévention par des actions municipales et appuyer la création d’un CHU dans le nord Seine-et-Marne.",
      },
    ],
  },
  {
    category: "L'enfance, la jeunesse... notre avenir",
    items: [
      {
        q: "Quelles mesures pour l’enfance et la jeunesse ?",
        a: "Remettre en place des crèches municipales, proposer une restauration scolaire gratuite, bio et en circuit court, et remunicipaliser la cantine.",
      },
      {
        q: "Comment faciliter la vie des familles ?",
        a: "Simplifier les inscriptions en centre de loisirs, augmenter le nombre de places et redonner vie aux maisons de quartier.",
      },
      {
        q: "Quels soutiens pour les jeunes ?",
        a: "Aide au financement du BAFA pour les jeunes Chellois·es sous réserve d’engagement auprès de la commune.",
      },
    ],
  },
  {
    category: "Virage écologique & bien être animal",
    items: [
      {
        q: "Comment réduire la consommation énergétique ?",
        a: "Réduire la pollution lumineuse avec des détecteurs de mouvement, éteindre les éclairages des commerces hors activité et baisser l’empreinte écologique de la municipalité.",
      },
      {
        q: "Comment végétaliser la ville ?",
        a: "Replanter des arbres fruitiers adaptés au climat, revégétaliser les cours d’école et favoriser les jardins partagés.",
      },
      {
        q: "Quelles mesures pour l’eau et les déchets ?",
        a: "Créer une régie publique de l’eau avec gratuité des premiers mètres cubes et installer des composteurs collectifs dans tous les quartiers.",
      },
      {
        q: "Quelle place pour la condition animale ?",
        a: "Créer une délégation municipale dédiée, aménager des refuges et passages sécurisés, organiser la stérilisation et l’identification des chats errants.",
      },
    ],
  },
  {
    category: "Lutte contre toutes les inégalités & les discriminations",
    items: [
      {
        q: "Comment protéger les victimes et lutter contre les discriminations ?",
        a: "Mettre en place un lieu d’accueil pour les victimes de VSS, de racisme, de LGBTphobie et de harcèlement, et mener des actions de sensibilisation à l’échelle municipale.",
      },
      {
        q: "Quels engagements concrets pour l’égalité ?",
        a: "Organiser des événements culturels, participer aux journées nationales et valoriser les symboles des luttes pour l’égalité et la diversité.",
      },
      {
        q: "Comment réduire les inégalités territoriales ?",
        a: "Rétablir l’égalité entre les quartiers et déduire les pensions alimentaires du calcul du quotient familial pour les parents isolés.",
      },
    ],
  },
  {
    category: "Se loger à Chelles",
    items: [
      {
        q: "Quelle stratégie pour le logement social ?",
        a: "Atteindre 30 % de logements sociaux, vendre des terrains à prix avantageux aux organismes HLM et favoriser de petites unités de qualité.",
      },
      {
        q: "Comment garantir la mixité sociale ?",
        a: "Modifier le PLU, encadrer les loyers et rendre anonymes les dossiers en commission d’attribution.",
      },
      {
        q: "Comment rendre les attributions plus transparentes ?",
        a: "Transformer le quota du maire en quota du conseil municipal soumis à discussion pour lutter contre le clientélisme.",
      },
    ],
  },
  {
    category: "La culture pour tou-te-s",
    items: [
      {
        q: "Comment démocratiser la culture ?",
        a: "Favoriser la gratuité et la tarification sociale, mener des actions culturelles et soutenir les établissements d’enseignement artistique.",
      },
      {
        q: "Quel soutien aux artistes locaux ?",
        a: "Mettre à disposition des lieux vacants, financer les équipes artistiques locales et développer une programmation culturelle municipale ouverte.",
      },
      {
        q: "Comment valoriser le patrimoine et la culture urbaine ?",
        a: "Créer des événements de culture urbaine et valoriser le patrimoine local.",
      },
    ],
  },
  {
    category: "Le sport pour tou-te-s",
    items: [
      {
        q: "Comment améliorer l’accès au sport ?",
        a: "Rénover les infrastructures sportives, les mettre à disposition des associations et favoriser la pratique dans les quartiers.",
      },
      {
        q: "Quels dispositifs pour les familles ?",
        a: "Créer un Pass’Sport pour faciliter l’accès et soutenir les associations inclusives.",
      },
      {
        q: "Comment soutenir l’animation sportive ?",
        a: "Subventionner les formations des futur·e·s animateurs et animatrices.",
      },
    ],
  },
  {
    category: "Une ville sûre",
    items: [
      {
        q: "Quelle vision de la sécurité ?",
        a: "Remettre en place une police de proximité formée et équipée, privilégier la présence humaine plutôt que la vidéosurveillance.",
      },
      {
        q: "Quelles actions concrètes sur le terrain ?",
        a: "Développer l’emploi de médiatrices et médiateurs, aménager l’espace public avec des lampadaires à détecteurs de présence et distribuer des porte-clefs anti-agression.",
      },
    ],
  },
  {
    category: "Une ville solidaire",
    items: [
      {
        q: "Comment renforcer le lien social ?",
        a: "Favoriser les relations intergénérationnelles, soutenir les petits commerces et développer les épiceries sociales dans tous les quartiers.",
      },
      {
        q: "Quelles mesures contre la précarité ?",
        a: "Lutter contre le sans-abrisme en ouvrant les structures de la ville et en soutenant les associations.",
      },
      {
        q: "Quelle place pour la faune urbaine ?",
        a: "Aménager des espaces refuges pour les animaux sauvages.",
      },
    ],
  },
];

export default function ProgrammePage() {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardsRef = useRef<Map<number, HTMLElement>>(new Map());
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const elementsRef = useRef<Map<string, HTMLElement>>(new Map());

  const toggleSection = useCallback((categoryIndex: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [categoryIndex]: !prev[categoryIndex],
    }));
  }, []);

  const expandAll = useCallback(() => {
    const allExpanded = faqs.reduce(
      (acc, _, idx) => ({ ...acc, [idx]: true }),
      {}
    );
    setExpandedSections(allExpanded);
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedSections({});
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = parseInt(
              (entry.target as HTMLElement).getAttribute("data-section-id") ||
                "0"
            );
            setVisibleCards((prev) => new Set([...prev, sectionId]));
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "100px 0px 0px 0px",
      }
    );

    cardsRef.current.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      cardsRef.current.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  const allExpanded = Object.keys(expandedSections).length === faqs.length;
  return (
    <main className="min-h-screen bg-campaign-light">
      <Header />

      <section className="relative pt-28 pb-16 bg-campaign-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(229,30,62,0.25),_transparent_45%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <p className="text-white/80 font-medium mb-3">Le programme</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Un programme clair, ambitieux et profondément humain
            </h1>
            <p className="text-white/80 mt-5 text-lg leading-relaxed">
              À Chelles, nous refusons le fatalisme. Nous voulons une ville qui
              respire, qui écoute, qui respecte et qui protège. Découvrez nos
              mesures phares pour une ville plus juste, plus solidaire et plus
              vivante.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding section-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
            <div className="space-y-4 text-campaign-gray text-lg leading-relaxed">
              <p>
                « À Chelles, nous refusons l’idée qu’une ville doit se contenter
                de gérer l’existant, alors qu’elle pourrait protéger, rassembler
                et émanciper. Nous voulons une ville qui donne aux chellois·es la
                place qu’ils et elles méritent dans les décisions.
              </p>
              <p>
                Parce que Chelles mérite mieux que des demi‑mesures, nous
                présentons un programme pensé pour améliorer réellement la vie
                quotidienne : plus de justice sociale, plus de services publics,
                plus de transparence, plus de démocratie locale, plus
                d’écologie et plus de dignité pour chacun·e.
              </p>
              <p>
                Nous serons présent·e·s sur le terrain, dans les quartiers, lors
                de nos réunions publiques et sur les réseaux pour échanger avec
                vous, écouter vos besoins, répondre à vos questions et
                co‑construire l’avenir de Chelles.
              </p>
              <p className="font-semibold text-campaign-dark">
                Chelles ne changera pas seule. Mais ensemble, nous pouvons tout
                transformer. »
              </p>
            </div>

            <div className="card p-4">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.youtube.com/embed/25lLr3vUlws"
                  title="Présentation du programme L’Avenir en commun"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <p className="text-center text-campaign-gray mt-4 text-sm">
                Présentation du programme L’Avenir en commun
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-campaign-dark">
              Des réponses concrètes, par thèmes
            </h2>
            <p className="text-campaign-gray mt-3">
              Parcourez les grandes priorités du programme via des menus
              dépliants. Chaque thème répond à des besoins concrets.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((section, sectionIdx) => (
              <div
                key={section.category}
                data-section-id={sectionIdx}
                ref={(el) => {
                  if (el) {
                    cardsRef.current.set(sectionIdx, el);
                  } else {
                    cardsRef.current.delete(sectionIdx);
                  }
                }}
                className={`card p-6 md:p-7 bg-gradient-to-br from-campaign-light via-white to-white border-2 border-campaign-purple/30 shadow-md hover:shadow-lg hover:border-campaign-purple/60 overflow-hidden relative group transition-all focus-within:ring-2 focus-within:ring-campaign-red focus-within:ring-offset-2 ${
                  visibleCards.has(sectionIdx)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDuration: "500ms",
                  transitionDelay: visibleCards.has(sectionIdx)
                    ? `${Array.from(visibleCards).indexOf(sectionIdx) * 60}ms`
                    : "0ms",
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-campaign-purple via-campaign-pink to-campaign-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <button
                  type="button"
                  onClick={() => toggleSection(sectionIdx)}
                  aria-expanded={!!expandedSections[sectionIdx]}
                  className="w-full text-left"
                >
                  <h3 className="text-xl md:text-2xl font-semibold text-campaign-dark flex items-center justify-between">
                    {section.category}
                    <span
                      className={`text-campaign-red text-xl transition-transform ${
                        expandedSections[sectionIdx] ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </h3>
                </button>

                {expandedSections[sectionIdx] && (
                  <div className="space-y-4 mt-4">
                    {section.items.map((item) => (
                      <div
                        key={item.q}
                        className="rounded-xl border border-black/5 bg-white px-4 py-3"
                      >
                        <p className="font-semibold text-campaign-dark">
                          {item.q}
                        </p>
                        <p className="text-campaign-gray mt-2 leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}