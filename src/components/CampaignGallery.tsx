import Image from "next/image";

const campaignImages = [
  {
    src: "https://ext.same-assets.com/3507938908/1970646336.jpeg",
    alt: "Céline De Kerpel - Liste insoumise et citoyenne",
  },
  {
    src: "https://ext.same-assets.com/3507938908/282816735.jpeg",
    alt: "Meeting de lancement - J-5",
  },
];

export default function CampaignGallery() {
  return (
    <section className="section-padding section-light">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {campaignImages.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl shadow-xl shadow-black/10 border border-black/5 transition-all duration-300 hover:-translate-y-1"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={500}
                height={700}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
