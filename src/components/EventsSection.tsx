"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function EventsSection() {
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
    <section className="section-padding section-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(110,31,203,0.2),_transparent_50%)]" />
      <div
        ref={containerRef}
        className={`container mx-auto px-4 text-center relative z-10 transition-all duration-500 ease-out ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
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
