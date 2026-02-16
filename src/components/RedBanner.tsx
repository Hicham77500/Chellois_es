"use client";

import { useState, useEffect, useRef } from "react";

export default function RedBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (containerRef.current) {
              observer.unobserve(containerRef.current);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "100px 0px 0px 0px",
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <section className="section-padding bg-gradient-to-r from-campaign-red via-campaign-pink to-campaign-purple">
      <div className="container mx-auto px-4 text-center">
        <div
          ref={containerRef}
          className={`rounded-3xl border border-white/20 bg-white/5 backdrop-blur-sm py-8 px-6 shadow-xl transition-all duration-500 ease-out ${
            isVisible
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}
        >
          <div className="max-w-4xl mx-auto mb-6">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/j5_0lWyzY0Q?rel=0"
                title="Voeux de fin d'annee"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Bonne année 2026 !
          </h2>
          <p className="text-xl md:text-2xl text-white font-medium">
            Changeons la ville pour mieux vivre à Chelles
          </p>
        </div>
      </div>
    </section>
  );
}
