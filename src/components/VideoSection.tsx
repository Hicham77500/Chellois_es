const videos = [
  {
    id: "BW-m-zN-Ir4",
    title: "Discours de Jean-Luc Mélenchon à la convention pour les élections municipales 2026",
  },
  {
    id: "dqCa8r6TOLw",
    title: "Meeting de la France insoumise aux #Amfis2025",
  },
];

export default function VideoSection() {
  return (
    <section className="section-padding section-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(229,30,62,0.18),_transparent_45%)]" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Featured Video */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
              src={`https://www.youtube.com/embed/${videos[0].id}`}
              title={videos[0].title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
          <p className="text-center text-campaign-gray mt-4 text-lg">
            {videos[0].title}
          </p>
        </div>

        {/* Secondary Video */}
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
              src={`https://www.youtube.com/embed/${videos[1].id}`}
              title={videos[1].title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>

        {/* Info Text */}
        <div className="max-w-4xl mx-auto mt-8">
          <p className="text-white text-center text-lg">
            Vous retrouverez ici, notre dernière vidéo afin de vous tenir
            toujours plus informés de nos actions.
          </p>
        </div>
      </div>
    </section>
  );
}
