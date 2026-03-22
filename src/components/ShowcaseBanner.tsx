"use client";

import { useState, useEffect } from "react";

export default function ShowcaseBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already acknowledged the banner
    const hasAcknowledged = localStorage.getItem("showcaseAcknowledged");
    if (!hasAcknowledged) {
      setIsVisible(true);
    }
  }, []);

  const handleAcknowledge = () => {
    setIsVisible(false);
    localStorage.setItem("showcaseAcknowledged", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-campaign-dark/95 backdrop-blur-sm border-t border-campaign-red/50 text-white shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="bg-campaign-red/20 p-2 rounded-full hidden sm:block">
            <svg
              className="w-6 h-6 text-campaign-red"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-campaign-red mb-1">
              Vitrine de Portfolio
            </h3>
            <p className="text-sm text-gray-300">
              Ceci est une version archivée du site. La campagne étant terminée, les données de contact, 
              formulaires et liens sociaux ont été désactivés ou anonymisés dans le but de 
              présenter mon travail de développement.
            </p>
          </div>
        </div>
        <button
          onClick={handleAcknowledge}
          className="whitespace-nowrap btn-primary px-6 py-2 text-sm md:text-base font-semibold"
        >
          J'ai compris
        </button>
      </div>
    </div>
  );
}
