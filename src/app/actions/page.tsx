"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { getAssetPath } from "@/lib/basePath";

export default function ActionsPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());
  const eventsRef = useRef<Map<string, HTMLElement>>(new Map());

  // Calendar state - dynamique based on current date
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  // Get calendar info
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  // Adjust for Monday-based calendar (JS getDay: 0=Sun, French calendar: 0=Mon)
  const startingDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7;
  
  // Calculate total cells needed (for proper grid display)
  const totalCells = Math.ceil((startingDayOfWeek + daysInMonth) / 7) * 7;
  
  // French locale
  const monthNames = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre"
  ];
  const monthNameCapital = monthNames[currentMonth];
  const monthShort = monthNameCapital.slice(0, 3);

  // Format date display
  const dayNames = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"];
  const todayString = `${dayNames[today.getDay()]}. ${currentDay} ${monthShort}`;

  // Helper function to get month number from French month abbreviation
  const getMonthNumber = (monthAbbr: string): number => {
    const monthMap: { [key: string]: number } = {
      "jan": 0, "janv": 0, "janvier": 0,
      "fév": 1, "février": 1,
      "mar": 2, "mars": 2, "march": 2,
      "avr": 3, "avril": 3,
      "mai": 4,
      "juin": 5,
      "juil": 6, "juillet": 6,
      "août": 7,
      "sep": 8, "sept": 8, "septembre": 8,
      "oct": 9, "octobre": 9,
      "nov": 10, "novembre": 10,
      "déc": 11, "décembre": 11,
    };
    return monthMap[monthAbbr.toLowerCase()] ?? 0;
  };


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
        threshold: [0, 0.15, 0.3],
        rootMargin: "0px 0px -30px 0px",
      }
    );

    const currentRef = sectionsRef.current;
    currentRef.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      currentRef.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  // Scroll to selected event card
  useEffect(() => {
    if (expandedEventId && eventsRef.current.has(expandedEventId)) {
      const eventElement = eventsRef.current.get(expandedEventId);
      if (eventElement) {
        setTimeout(() => {
          eventElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 100);
      }
    }
  }, [expandedEventId]);

  const getSectionElements = (id: string) => ({
    ref: (el: HTMLElement | null) => {
      if (el) {
        sectionsRef.current.set(id, el);
      } else {
        sectionsRef.current.delete(id);
      }
    },
    "data-section-id": id,
    className: `transition-all duration-300 ease-out ${
      visibleSections.has(id)
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-10"
    }`,
  });

  const getEventRef = (id: string) => (el: HTMLElement | null) => {
    if (el) {
      eventsRef.current.set(id, el);
    } else {
      eventsRef.current.delete(id);
    }
  };

  // Historical events (older first, will be displayed in reverse)
  const historicalEvents = [
    {
      id: "formation",
      date: "21-24 août 2025",
      month: "août",
      day: 21,
      title: "Formation élections municipales 2026",
      description:
        "Du 21 août au 24 août 2025, le collectif Chellois·es est allé se former pour les élections municipales de 2026.\nAteliers, conférences, échanges... un moment constructif et efficace !",
      videoId: "yDGsd7yO4uY",
      type: "event-video",
    },
    {
      id: "investiture",
      date: "23 novembre 2025",
      month: "nov",
      day: 23,
      title: "Investiture officielle France Insoumise",
      description:
        "Le 23 novembre 2025, la liste Chellois·es a été officiellement investie par la France Insoumise lors de la convention municipales 2026 aux Docks de Paris - Aubervilliers",
      videoId: "MN1SScYgX8M",
      type: "event-video",
    },
    {
      id: "meeting-18dec",
      date: "18 décembre 2025",
      month: "déc",
      day: 18,
      title: "Meeting de lancement",
      description:
        "Le 18 décembre, venez participer au meeting de lancement de la liste insoumise et citoyenne Chellois·es ! Des invités surprises, de la musique et surtout un projet pour nous les chellois·es.\nVenez échanger avec nous, laissez vous convaincre et venez participer à cette belle aventure humaine !!!",
      image: getAssetPath("/images/metting18dec.png"),
      type: "event-image",
    },
    {
      id: "rencontres",
      date: "Rencontres continues",
      month: "action",
      day: 0,
      title: "Rencontres avec les chellois·es",
      description:
        "Rencontre avec les chellois·es sur différentes actions.\nL'accueil a été chaleureux et constructif, merci !!!",
      videoId: "Fe_tIPaFoBs",
      type: "event-video",
    },
  ];

  // Upcoming events
  const upcomingEvents = [
    {
      id: "upcoming-02mar",
      date: "Lundi 02 mars 2026",
      month: "mars",
      day: 2,
      title: "Tractage à la gare",
      description: "Lundi 02/03 à 17h - Tractage à la gare",
      type: "event-text",
      calendarDay: 2,
    },
    {
      id: "upcoming-03mar",
      date: "Mardi 03 mars 2026",
      month: "mars",
      day: 3,
      title: "Rencontre commerçants Foch",
      description: "Mardi 03/03 à 15h30 - commerçants Foch",
      type: "event-text",
      calendarDay: 3,
    },
    {
      id: "upcoming-04mar",
      date: "Mercredi 04 mars 2026",
      month: "mars",
      day: 4,
      title: "Rencontre commerçants Gambetta",
      description: "Mercredi 04/03 à 15h30 - commerçants Gambetta",
      type: "event-text",
      calendarDay: 4,
    },
    {
      id: "upcoming-05mar",
      date: "Jeudi 05 mars 2026",
      month: "mars",
      day: 5,
      title: "Pôle emploi",
      description: "Jeudi 05/03 à 9h - pôle emploi",
      type: "event-text",
      calendarDay: 5,
    },
    {
      id: "upcoming-06mar",
      date: "Vendredi 06 mars 2026",
      month: "mars",
      day: 6,
      title: "Rencontre exploitants Mont Guichet",
      description: "Vendredi 06/03 à 10h30 - rencontre exploitants Mont Guichet",
      type: "event-text",
      calendarDay: 6,
    },
    {
      id: "upcoming-07mar-1",
      date: "Samedi 07 mars 2026",
      month: "mars",
      day: 7,
      title: "Porte à porte Illette",
      description: "Samedi 07/03 à 14h - gros porte à porte Illette",
      type: "event-text",
      calendarDay: 7,
    },
    {
      id: "upcoming-07mar-2",
      date: "Samedi 07 mars 2026",
      month: "mars",
      day: 7,
      title: "Fiesta vélo place Cala",
      description: "Samedi 07/03 à 18h - Fiesta vélo place Cala",
      type: "event-text",
      calendarDay: 7,
    },
    {
      id: "upcoming-08mar-1",
      date: "Dimanche 08 mars 2026",
      month: "mars",
      day: 8,
      title: "Marche féministe",
      description: "Dimanche 08/03 à 10h30 - marche féministe, départ centre culturel",
      type: "event-text",
      calendarDay: 8,
    },
    {
      id: "upcoming-08mar-2",
      date: "Dimanche 08 mars 2026",
      month: "mars",
      day: 8,
      title: "Marche féministe parisienne",
      description: "Dimanche 08/03 à 14h - marche féministe parisienne, départ place Gambetta",
      type: "event-text",
      calendarDay: 8,
    },
  ];

  // Filter upcoming events to only show those in the future
  const futureEvents = upcomingEvents.filter((event) => {
    if (event.day === 0) return false; // Skip events without specific dates
    const eventMonth = getMonthNumber(event.month);
    const eventDate = new Date(currentYear, eventMonth, event.calendarDay);
    eventDate.setHours(0, 0, 0, 0); // Reset time for comparison
    return eventDate >= today;
  });

  // Group events by day and sort chronologically
  const groupEventsByDay = () => {
    const grouped = new Map<number, typeof futureEvents>();
    
    futureEvents.forEach((event) => {
      const day = event.calendarDay;
      if (!grouped.has(day)) {
        grouped.set(day, []);
      }
      grouped.get(day)!.push(event);
    });

    // Convert to array and sort by day
    return Array.from(grouped.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([day, events]) => ({
        day,
        events: events.sort((a, b) => {
          // Sort events within a day by time if mentioned, otherwise keep order
          const timeA = a.description.match(/\d{1,2}h\d{0,2}/)?.[0] || "23:59";
          const timeB = b.description.match(/\d{1,2}h\d{0,2}/)?.[0] || "23:59";
          return timeA.localeCompare(timeB);
        }),
      }));
  };

  const groupedEvents = groupEventsByDay();

  // Check if current week is passed
  const currentWeekStart = new Date(today);
  currentWeekStart.setDate(today.getDate() - today.getDay() + 1); // Monday of current week
  const currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekStart.getDate() + 6); // Sunday of current week
  
  const hasEventsThisWeek = upcomingEvents.some((event) => {
    if (event.day === 0) return false;
    const eventMonth = getMonthNumber(event.month);
    const eventDate = new Date(currentYear, eventMonth, event.calendarDay);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= currentWeekStart && eventDate <= currentWeekEnd;
  });

  const hasAnyFutureEvents = futureEvents.length > 0;

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-campaign-dark via-campaign-purple/20 to-campaign-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(229,30,62,0.15),_transparent_65%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white hero-text mb-4">
            Nos Actions
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Un parcours de mobilisation, de formation et d'engagement pour les
            élections municipales 2026
          </p>
        </div>
      </section>

      {/* Main Timeline Section */}
      <section className="section-padding section-muted relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Calendar Sidebar - Sticky */}
            <div className="lg:col-span-1">
              <div
                {...getSectionElements("calendar")}
                className={`sticky top-24 ${getSectionElements("calendar").className}`}
              >
                <div className="card p-6 md:p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-campaign-dark mb-3">
                      {monthNameCapital.charAt(0).toUpperCase() + monthNameCapital.slice(1)} {currentYear}
                    </h3>
                    <p className="text-sm text-campaign-gray font-medium">
                      Aujourd'hui : {todayString}
                    </p>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {["L", "M", "M", "J", "V", "S", "D"].map((day, index) => (
                      <div
                        key={`day-${index}`}
                        className="text-center text-xs font-bold text-campaign-red p-2"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-6 bg-campaign-light rounded-lg p-3">
                    {/* Render all cells with proper positioning */}
                    {[...Array(totalCells)].map((_, index) => {
                      // Calculate which day to display
                      const dayNumber = index - startingDayOfWeek + 1;
                      const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;
                      
                      if (!isValidDay) {
                        return <div key={`empty-${index}`} className="p-1" />;
                      }

                      const day = dayNumber;
                      const isToday = day === currentDay;
                      const daysWithEvents = new Set(groupedEvents.map((g) => g.day));
                      const hasEvent = daysWithEvents.has(day);

                      return (
                        <button
                          key={day}
                          onClick={() => {
                            if (hasEvent) {
                              setSelectedDate(day);
                              setExpandedEventId(`day-${day}`);
                            }
                          }}
                          className={`p-2 rounded text-sm font-semibold transition-all transform hover:scale-110 ${
                            isToday
                              ? "bg-campaign-red text-white shadow-lg"
                              : hasEvent
                                ? "bg-campaign-red/20 text-campaign-red border-2 border-campaign-red cursor-pointer hover:bg-campaign-red/30"
                                : "bg-white text-campaign-gray/60 hover:bg-campaign-light"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t border-campaign-light space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-campaign-red shadow-lg" />
                      <span className="font-medium text-campaign-dark">
                        Aujourd'hui
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full border-2 border-campaign-red" />
                      <span className="text-campaign-gray">
                        Événement à venir
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline - Main Content */}
            <div className="lg:col-span-2">
              {/* Upcoming Events */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-campaign-dark mb-12">
                  Événements à venir
                </h2>

                {/* Message when no more events this week */}
                {!hasAnyFutureEvents && (
                  <div className="mb-12 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-campaign-red/10 to-campaign-red/5 border-l-4 border-campaign-red">
                    <h3 className="text-xl md:text-2xl font-bold text-campaign-dark mb-2">
                      ✨ Nouvelles actions à venir
                    </h3>
                    <p className="text-campaign-gray text-base md:text-lg leading-relaxed">
                      Merci pour votre engagement ! De nouvelles actions arrivent très bientôt.<br />
                      <span className="font-semibold text-campaign-red">Restez à l'écoute pour connaître le calendrier des prochaines mobilisations.</span>
                    </p>
                  </div>
                )}

                {/* Timeline Container with continuous line */}
                {hasAnyFutureEvents && (
                  <div className="relative pl-8">
                    {/* Continuous vertical line */}
                    <div className="absolute left-3 top-2 bottom-0 w-0.5 bg-gradient-to-b from-campaign-red via-campaign-red to-transparent" />

                    {groupedEvents.map((dayGroup, index) => {
                      const firstEvent = dayGroup.events[0];
                      const hasMultipleEvents = dayGroup.events.length > 1;

                      return (
                        <div
                          key={`day-${dayGroup.day}`}
                          {...getSectionElements(`day-${dayGroup.day}`)}
                          className={`${getSectionElements(`day-${dayGroup.day}`).className} mb-12`}
                          style={{
                            transitionDelay: `${index * 100}ms`,
                          }}
                        >
                          {/* Event Card with connected dot */}
                          <div className="relative group" ref={getEventRef(`day-${dayGroup.day}`)}>
                            {/* Timeline dot - subtle and minimal */}
                            <div className="absolute -left-[26px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-campaign-red shadow-md group-hover:scale-150 group-hover:shadow-lg transition-all duration-300" />

                            {/* Event Content */}
                            <div className={`rounded-2xl shadow-xl shadow-black/5 bg-white p-6 md:p-8 transition-all duration-300 ${
                              selectedDate === dayGroup.day
                                ? "border-2 border-campaign-red shadow-xl shadow-campaign-red/30 bg-campaign-red/5"
                                : "border border-black/5 hover:shadow-lg"
                            }`}>
                              {/* Compact date pill */}
                              <div className="flex items-center gap-3 mb-4">
                                <span className="text-xs font-bold text-campaign-red uppercase tracking-wide">
                                  {firstEvent.month}
                                </span>
                                <span className="text-2xl font-light text-campaign-red">
                                  {dayGroup.day}
                                </span>
                                {hasMultipleEvents && (
                                  <span className="ml-auto text-xs font-semibold text-campaign-red bg-campaign-red/10 px-2 py-1 rounded-full">
                                    {dayGroup.events.length} événements
                                  </span>
                                )}
                                <div className="h-0.5 flex-1 bg-campaign-red/10" />
                              </div>

                              {/* Events list for this day */}
                              <div className="space-y-4">
                                {dayGroup.events.map((event, eventIndex) => (
                                  <div
                                    key={event.id}
                                    className={`${
                                      eventIndex > 0 ? "pt-4 border-t border-campaign-red/10" : ""
                                    }`}
                                  >
                                    <h3 className="text-lg md:text-xl font-semibold text-campaign-dark mb-2">
                                      {event.title}
                                    </h3>
                                    <p className="text-campaign-gray text-sm md:text-base leading-relaxed">
                                      {event.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Transition section */}
              <div className="py-8" />

              {/* Historical Events */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-campaign-dark mb-12">
                  Événements passés
                </h2>

                {/* Timeline Container with continuous line */}
                <div className="relative pl-8">
                  {/* Continuous vertical line */}
                  <div className="absolute left-3 top-2 bottom-0 w-0.5 bg-gradient-to-b from-campaign-dark/30 via-campaign-dark/20 to-transparent" />

                  {historicalEvents.map((event, index) => (
                    <div
                      key={event.id}
                      {...getSectionElements(event.id)}
                      className={`${getSectionElements(event.id).className} mb-12`}
                      style={{
                        transitionDelay: `${index * 100}ms`,
                      }}
                    >
                      {/* Event Card with connected dot */}
                      <div className="relative group">
                        {/* Timeline dot - subtle and minimal */}
                        <div className="absolute -left-[26px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-campaign-dark/40 shadow-md group-hover:scale-150 group-hover:shadow-lg transition-all duration-300" />

                        {/* Event Content */}
                        <div
                          onClick={() =>
                            setExpandedEventId(
                              expandedEventId === event.id ? null : event.id
                            )
                          }
                          className="card p-6 md:p-8 cursor-pointer hover:shadow-lg transition-all duration-300 opacity-85 hover:opacity-100 group"
                        >
                          {/* Compact date pill */}
                          <div className="flex items-center gap-3 mb-4">
                            {event.day > 0 && (
                              <>
                                <span className="text-xs font-bold text-campaign-dark/60 uppercase tracking-wide">
                                  {event.month}
                                </span>
                                <span className="text-2xl font-light text-campaign-dark/60">
                                  {event.day}
                                </span>
                              </>
                            )}
                            {event.day === 0 && (
                              <span className="text-xs font-bold text-campaign-dark/60 uppercase tracking-wide">
                                {event.date}
                              </span>
                            )}
                            <div className="h-0.5 flex-1 bg-campaign-dark/10" />
                          </div>

                          <h3 className="text-lg md:text-xl font-semibold text-campaign-dark mb-2">
                            {event.title}
                          </h3>

                          <p
                            className={`text-campaign-gray text-sm md:text-base leading-relaxed ${
                              expandedEventId === event.id
                                ? "line-clamp-none"
                                : "line-clamp-2"
                            }`}
                          >
                            {event.description}
                          </p>

                          {expandedEventId !== event.id && (
                            <div className="mt-4 flex items-center text-campaign-red font-semibold text-sm group-hover:text-campaign-red/70 transition-colors">
                              Voir détails ▼
                            </div>
                          )}

                          {expandedEventId === event.id && (
                            <div className="mt-4 flex items-center text-campaign-red font-semibold text-sm cursor-pointer hover:text-campaign-red/70 transition-colors">
                              ▲ Masquer
                            </div>
                          )}

                          {/* Video Embed */}
                          {expandedEventId === event.id &&
                            event.type === "event-video" &&
                            event.videoId && (
                              <div className="mt-6 rounded-lg overflow-hidden">
                                <div className="relative aspect-video">
                                  <iframe
                                    src={`https://www.youtube.com/embed/${event.videoId}`}
                                    title={event.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full"
                                  />
                                </div>
                              </div>
                            )}

                          {/* Image Display */}
                          {expandedEventId === event.id &&
                            event.type === "event-image" &&
                            event.image && (
                              <div className="mt-6 rounded-lg overflow-hidden">
                                <Image
                                  src={event.image}
                                  alt={event.title}
                                  width={800}
                                  height={600}
                                  className="w-full h-auto object-cover"
                                />
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
