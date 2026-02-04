import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[640px] lg:min-h-[760px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://ext.same-assets.com/3507938908/3304494190.jpeg"
          alt="Statue de Marianne avec drapeau français"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_transparent_45%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-28 pb-16">
        <div className="flex flex-col lg:flex-row items-center justify-end lg:justify-end">
          <div className="lg:max-w-2xl lg:text-right text-center glass rounded-3xl px-6 py-8 md:px-10 md:py-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white hero-text leading-tight">
              Pour une ville de Chelles solidaire, citoyenne et écologique
            </h1>
          </div>
        </div>
      </div>

      {/* L'Union Populaire badge - visible on larger screens */}
      <div className="absolute bottom-10 right-10 hidden lg:block">
        <div className="bg-campaign-red text-white px-5 py-2 rounded-full transform rotate-6 shadow-xl shadow-red-500/30">
          <span className="font-bold text-sm">L'UNION POPULAIRE</span>
        </div>
      </div>
    </section>
  );
}
