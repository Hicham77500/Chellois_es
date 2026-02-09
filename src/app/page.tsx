"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import RedBanner from "@/components/RedBanner";
import CampaignGallery from "@/components/CampaignGallery";
import VideoSection from "@/components/VideoSection";
import EventsSection from "@/components/EventsSection";
import Footer from "@/components/Footer";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = (entry.target as HTMLElement).getAttribute(
              "data-section-id"
            );
            if (sectionId) {
              setVisibleSections((prev) => new Set([...prev, sectionId]));
            }
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "100px 0px 0px 0px",
      }
    );

    sectionsRef.current.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      sectionsRef.current.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  const getSectionElements = (id: string) => ({
    ref: (el: HTMLElement | null) => {
      if (el) {
        sectionsRef.current.set(id, el);
      } else {
        sectionsRef.current.delete(id);
      }
    },
    className: `${
      visibleSections.has(id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    } transition-all duration-500 ease-out`,
  });

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      
      <div
        data-section-id="welcome"
        ref={getSectionElements("welcome").ref}
        className={getSectionElements("welcome").className}
      >
        <Welcome />
      </div>

      <div
        data-section-id="banner"
        ref={getSectionElements("banner").ref}
        className={`${getSectionElements("banner").className}`}
      >
        <RedBanner />
      </div>

      <div
        data-section-id="gallery"
        ref={getSectionElements("gallery").ref}
        className={getSectionElements("gallery").className}
      >
        <CampaignGallery />
      </div>

      <div
        data-section-id="video"
        ref={getSectionElements("video").ref}
        className={getSectionElements("video").className}
      >
        <VideoSection />
      </div>

      <div
        data-section-id="events"
        ref={getSectionElements("events").ref}
        className={getSectionElements("events").className}
      >
        <EventsSection />
      </div>

      <Footer />
    </main>
  );
}
