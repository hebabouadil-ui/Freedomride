"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const routes = [
  {
    id: "medina",
    name: "Medina Explorer",
    subtitle: "City heritage ride",
    duration: "2–4 hours",
    distance: "15–30 km",
    difficulty: "Easy",
    difficultyColor: "var(--color-atlas)",
    description:
      "Wind through the ancient souks of the Medina, past Koutoubia Mosque and Djemaa el-Fna. Perfect for your first day — discover the soul of Marrakech at your own rhythm.",
    highlights: ["Djemaa el-Fna", "Koutoubia Mosque", "Majorelle Gardens", "Mellah"],
    gradient: "linear-gradient(135deg, #2D4A3E 0%, #1C1916 100%)",
    accentColor: "var(--color-atlas)",
    emoji: "🏛️",
  },
  {
    id: "atlas",
    name: "Atlas Mountains",
    subtitle: "High altitude adventure",
    duration: "Full day",
    distance: "180–250 km",
    difficulty: "Advanced",
    difficultyColor: "var(--color-red)",
    description:
      "Climb through Berber villages and cedar forests to Tizi n'Tichka pass at 2,260m. Breathtaking switchbacks, ancient kasbahs, and air that tastes like freedom.",
    highlights: ["Tizi n'Tichka 2,260m", "Aït Benhaddou", "Berber Villages", "Cedar Forests"],
    gradient: "linear-gradient(135deg, #B5341C 0%, #312726 100%)",
    accentColor: "var(--color-red)",
    emoji: "⛰️",
  },
  {
    id: "agafay",
    name: "Agafay Desert",
    subtitle: "Rocky desert escape",
    duration: "Half day",
    distance: "80–120 km",
    difficulty: "Moderate",
    difficultyColor: "var(--color-gold)",
    description:
      "Morocco's stone desert 30 minutes from Marrakech. Endless ochre plains, dramatic light at golden hour, and near-zero traffic. The ideal cinematic ride.",
    highlights: ["Rocky Plains", "Berber Camps", "Golden Hour Views", "Lac Lalla Takerkoust"],
    gradient: "linear-gradient(135deg, #C9A227 0%, #1C1916 100%)",
    accentColor: "var(--color-gold)",
    emoji: "🏜️",
  },
  {
    id: "essaouira",
    name: "Essaouira Coast",
    subtitle: "Atlantic winds & ramparts",
    duration: "Full day",
    distance: "350 km round",
    difficulty: "Moderate",
    difficultyColor: "var(--color-gold)",
    description:
      "Head west on the argan tree coastal road. Ancient blue-and-white medina, Atlantic sea wind, fresh grilled fish, and the most photogenic ramparts in Morocco.",
    highlights: ["Coastal Road R207", "Essaouira Ramparts", "Argan Forest", "Atlantic Sunset"],
    gradient: "linear-gradient(135deg, #1a3a5c 0%, #312726 100%)",
    accentColor: "#4a9edd",
    emoji: "🌊",
  },
];

export default function RoutesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
        }
      );

      const cards = sectionRef.current?.querySelectorAll(".route-card");
      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: i % 2 === 0 ? -60 : 60,
              y: 30,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
              },
            }
          );
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="routes"
      className="section overflow-clip"
      style={{ background: "var(--color-charcoal)" }}
    >
      <div className="container">
        {/* Section header */}
        <div ref={titleRef} className="mb-16 md:mb-20">
          <p className="label mb-4" style={{ color: "var(--color-gold)" }}>
            Curated Journeys
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="display-section" style={{ color: "var(--color-cream)" }}>
              YOUR ROADS<br />AWAIT
            </h2>
            <p className="body-lg" style={{ color: "var(--color-muted)", maxWidth: "380px" }}>
              Four iconic routes from Marrakech. Each one a different Morocco — ancient, wild, golden, coastal.
            </p>
          </div>
          <span className="gold-line mt-6" />
        </div>

        {/* Routes grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {routes.map((route) => (
            <div
              key={route.id}
              className="route-card relative overflow-hidden flex flex-col"
              style={{
                background: route.gradient,
                borderRadius: "var(--radius-card)",
                border: "1px solid rgba(255,248,237,0.08)",
                minHeight: "320px",
                padding: "2rem",
                cursor: "pointer",
                transition: "transform 0.4s var(--ease-cinematic)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              {/* Emoji icon */}
              <div style={{ fontSize: "2.5rem", lineHeight: 1, marginBottom: "1rem" }}>
                {route.emoji}
              </div>

              {/* Difficulty badge */}
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="label"
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "999px",
                    color: route.accentColor,
                    border: `1px solid ${route.accentColor}40`,
                  }}
                >
                  {route.difficulty}
                </span>
                <span className="label" style={{ color: "rgba(255,248,237,0.5)" }}>
                  {route.duration} · {route.distance}
                </span>
              </div>

              {/* Name */}
              <h3 className="display-card mb-1" style={{ color: "var(--color-cream)" }}>
                {route.name}
              </h3>
              <p className="label mb-4" style={{ color: "rgba(255,248,237,0.6)" }}>
                {route.subtitle}
              </p>

              {/* Description */}
              <p className="body-sm flex-1" style={{ color: "rgba(255,248,237,0.75)" }}>
                {route.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mt-5">
                {route.highlights.map((h) => (
                  <span
                    key={h}
                    className="label"
                    style={{
                      background: "rgba(0,0,0,0.25)",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "4px",
                      color: "rgba(255,248,237,0.6)",
                      fontSize: "0.58rem",
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* CTA arrow */}
              <div
                className="mt-5 flex items-center gap-2"
                style={{ color: route.accentColor }}
              >
                <span className="label">Explore route</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
