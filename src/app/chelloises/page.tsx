"use client";

import { useCallback, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

const citizens = Array.from({ length: 18 }, (_, index) => ({
  id: index + 1,
  name: `Citoyen·ne ${index + 1}`,
  role: "Habitant·e de Chelles",
  summary:
    "Une phrase courte pour introduire la personne et son engagement local.",
  vision:
    "Un paragraphe pour mettre en avant sa détermination, sa vision et son énergie au service de Chelles.",
  photo: `/images/citoyens/citoyen-${index + 1}.jpg`,
}));

export default function ChelloisEsPage() {
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>(
    {}
  );

  const toggleCard = useCallback((id: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
                src="/images/Metting.png"
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
              18 citoyen·nes engagé·es
            </h2>
            <p className="text-campaign-gray mt-3">
              Chaque personne peut être dépliée pour mettre en avant sa
              détermination, sa vision et son engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {citizens.map((citizen) => (
              <article
                key={citizen.id}
                className="card p-6 bg-white border border-campaign-light/70 shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-campaign-light">
                    <Image
                      src={citizen.photo}
                      alt={citizen.name}
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-campaign-dark">
                      {citizen.name}
                    </h3>
                    <p className="text-sm text-campaign-gray">{citizen.role}</p>
                  </div>
                </div>

                <p className="text-campaign-gray mt-4">{citizen.summary}</p>

                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-2 text-campaign-red font-semibold"
                  onClick={() => toggleCard(citizen.id)}
                >
                  {expandedCards[citizen.id] ? "Replier" : "Déplier"}
                  <span
                    className={`transition-transform ${
                      expandedCards[citizen.id] ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {expandedCards[citizen.id] && (
                  <div className="mt-4 text-campaign-gray leading-relaxed">
                    <p>{citizen.vision}</p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
