import Link from "next/link";

export default function EventsSection() {
  return (
    <section className="section-padding section-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(113,22,194,0.18),_transparent_50%)]" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Evénements à venir
        </h2>
        <Link
          href="/actions"
          className="inline-block btn-primary text-lg"
        >
          Événements
        </Link>
      </div>
    </section>
  );
}
