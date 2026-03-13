"use client";

import { useState, useEffect, useRef } from "react";

const videos = [
  {
    id: "7mcoS2vqP1s",
    title: "Appel aux votes - Municipales 2026",
  },
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
  const [visibleVideos, setVisibleVideos] = useState<Set<number>>(new Set());
  const videosRef = useRef<Map<number, HTMLElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const videoId = parseInt(
              (entry.target as HTMLElement).getAttribute("data-video-id") || "0"
            );
            setVisibleVideos((prev) => new Set([...prev, videoId]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "100px 0px 0px 0px",
      }
    );

    videosRef.current.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      videosRef.current.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <section className="section-padding section-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(229,30,62,0.18),_transparent_45%)]" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Featured Video (YouTube Short) */}
        <div
          data-video-id={0}
          ref={(el) => {
            if (el) {
              videosRef.current.set(0, el);
            } else {
              videosRef.current.delete(0);
            }
          }}
          className={`max-w-4xl mx-auto mb-8 transition-all duration-500 ease-out ${
            visibleVideos.has(0)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-sm mx-auto">
            <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <iframe
                src={`https://www.youtube.com/embed/${videos[0].id}`}
                title={videos[0].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
          <p className="text-center text-white mt-4 text-lg">
            {videos[0].title}
          </p>
        </div>

        {/* Secondary long-form video */}
        <div
          data-video-id={1}
          ref={(el) => {
            if (el) {
              videosRef.current.set(1, el);
            } else {
              videosRef.current.delete(1);
            }
          }}
          className={`max-w-4xl mx-auto mb-8 transition-all duration-500 ease-out ${
            visibleVideos.has(1)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{
            transitionDelay: visibleVideos.has(1) ? "100ms" : "0ms",
          }}
        >
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

        {/* Third Video */}
        <div
          data-video-id={2}
          ref={(el) => {
            if (el) {
              videosRef.current.set(2, el);
            } else {
              videosRef.current.delete(2);
            }
          }}
          className={`max-w-4xl mx-auto transition-all duration-500 ease-out ${
            visibleVideos.has(2)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{
            transitionDelay: visibleVideos.has(2) ? "150ms" : "0ms",
          }}
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
              src={`https://www.youtube.com/embed/${videos[2].id}`}
              title={videos[2].title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>

        {/* Info Text */}
        <div className="max-w-4xl mx-auto mt-8">
          <p className="text-white text-center text-lg">
            Regardez notre appel aux votes et retrouvez nos dernieres videos
            de campagne pour suivre nos actions.
          </p>
        </div>
      </div>
    </section>
  );
}
