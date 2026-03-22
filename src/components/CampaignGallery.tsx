"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { getAssetPath } from "@/lib/basePath";

const campaignImages = [
  {
    src: getAssetPath("/images/gallery_faces.jpg"),
    alt: "Céline De Kerpel - Liste insoumise et citoyenne",
  },
  {
    src: getAssetPath("/images/metting_new.png"),
    alt: "Meeting de lancement - J-5",
  },
];

export default function CampaignGallery() {
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const imagesRef = useRef<Map<number, HTMLElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imageId = parseInt(
              (entry.target as HTMLElement).getAttribute("data-image-id") || "0"
            );
            setVisibleImages((prev) => new Set([...prev, imageId]));
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "100px 0px 0px 0px",
      }
    );

    const currentImages = imagesRef.current;

    currentImages.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      currentImages.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <section className="section-padding section-light">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {campaignImages.map((image, index) => (
            <div
              key={index}
              data-image-id={index}
              ref={(el) => {
                if (el) {
                  imagesRef.current.set(index, el);
                } else {
                  imagesRef.current.delete(index);
                }
              }}
              className={`relative overflow-hidden rounded-2xl shadow-xl shadow-black/10 border border-black/5 transition-all duration-500 hover:-translate-y-1 ${
                visibleImages.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: visibleImages.has(index)
                  ? `${index * 100}ms`
                  : "0ms",
              }}
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
