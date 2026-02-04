import Image from "next/image";

export default function Welcome() {
  return (
    <section className="section-padding section-muted">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Welcome Text */}
          <div className="max-w-xl">
            <p className="text-campaign-purple font-semibold text-lg mb-4">
              Bienvenue sur le site de la liste Chellois·es !
            </p>
            <p className="text-campaign-gray text-lg leading-relaxed">
              Venez découvrir les membres de notre liste insoumise et citoyenne,
              les points du programme construit par des chellois·es pour des
              chellois·es sur les bases de celui de l'avenir en commun. Et
              rejoignez-nous sur nos actions pour construire la victoire les 15
              et 22 mars 2026.
            </p>
          </div>

          {/* Municipal Elections Banner Image */}
          <div className="max-w-3xl mx-auto w-full">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-black/10 border border-black/5">
              <Image
                src="https://ext.same-assets.com/3507938908/2508151001.jpeg"
                alt="Élections Municipales 2026 - La France Insoumise"
                width={800}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
