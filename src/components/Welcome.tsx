"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { getAssetPath } from "@/lib/basePath";

type WelcomeElement = "text" | "image";

export default function Welcome() {
  const [visibleElements, setVisibleElements] = useState<Set<WelcomeElement>>(
    new Set()
  );
  const elementRef = useRef<Map<WelcomeElement, HTMLElement>>(new Map());

  useEffect(() => {
    // Use a single observer on the section to check visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger the appearance of elements
            const delays = { text: 0, image: 100 };
            (Object.keys(delays) as WelcomeElement[]).forEach((key) => {
              setTimeout(() => {
                setVisibleElements((prev) => new Set([...prev, key]));
              }, delays[key]);
            });
            // Unobserve after intersection to avoid re-triggering
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "100px 0px 0px 0px",
      }
    );

    // Observe the main welcome section
    const welcomeSection = document.querySelector(
      '[data-component-id="welcome"]'
    );
    if (welcomeSection) {
      observer.observe(welcomeSection);
    }

    return () => {
      if (welcomeSection) {
        observer.unobserve(welcomeSection);
      }
    };
  }, []);

  return (
    <section className="section-padding section-muted" data-component-id="welcome">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Welcome Text */}
          <div
            className={`max-w-xl transition-all duration-500 ease-out ${
              visibleElements.has("text")
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
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
          <div
            className={`max-w-3xl mx-auto w-full transition-all duration-500 ease-out ${
              visibleElements.has("image")
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-black/10 border border-black/5">
              <Image
                src={getAssetPath("/images/welcome_faces.jpg")}
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
