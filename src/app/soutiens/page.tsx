"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const supports = [
  {
    id: "giraud",
    name: "David Giraud",
    role: "Députe du Nord et candidat aux municipales à Roubaix",
    embedId: "-4rwe8r1Gdk",
  },
  {
    id: "bompard",
    name: "Manuel Bompard",
    role:
      "Députe des Bouches du Rhone, coordinateur national de la France Insoumise",
    embedId: "xwgdmFjk6YI",
  },
  {
    id: "arnaud-julie",
    name: "Arnaud Saint-Martin et Julie Garnier",
    role:
      "Députe de Seine-et-Marne et élue au conseil regional, candidate aux municipales a Moissy-Cramayel",
    embedId: "rmQpTDKlEGE",
  },
];

export default function SoutiensPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-campaign-dark via-campaign-purple/10 to-campaign-dark">
      <Header />

      <section className="pt-24 md:pt-28 pb-10 lg:min-h-[calc(100vh-96px)] lg:overflow-hidden">
        <div className="container mx-auto px-4 h-full">
          <div className="max-w-6xl mx-auto flex flex-col gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3">
                Des voix qui comptent
              </h1>
              <p className="text-white/70 mt-3 text-base md:text-lg">
                Trois soutiens nationaux partagent leur message pour Chellois·es 2026.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6 shadow-2xl">

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {supports.map((support) => (
                  <div
                    key={`grid-${support.id}`}
                    className="rounded-2xl border border-white/10 bg-campaign-dark/40 p-3"
                  >
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10">
                      <iframe
                        src={`https://www.youtube.com/embed/${support.embedId}?rel=0`}
                        title={`Video de soutien - ${support.name}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                    </div>
                    <p className="text-white/80 text-sm font-semibold mt-2">
                      {support.name}
                    </p>
                    <p className="text-white/60 text-xs">
                      {support.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
