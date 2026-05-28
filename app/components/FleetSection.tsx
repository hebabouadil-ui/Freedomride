"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const bikes = [
  {
    id: "scooter",
    category: "City Scooter",
    name: "Honda PCX 150",
    tagline: "Urban freedom",
    engine: "150cc",
    range: "200km",
    terrain: "City / Medina",
    priceMAD: "200",
    priceEUR: "18",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    specs: [
      { label: "Engine", value: "150cc" },
      { label: "Range", value: "200 km" },
      { label: "Max Speed", value: "110 km/h" },
      { label: "License", value: "Not required" },
    ],
    accentColor: "var(--color-gold)",
  },
  {
    id: "enduro",
    category: "Adventure Enduro",
    name: "Royal Enfield Himalayan",
    tagline: "Conquer every trail",
    engine: "411cc",
    range: "450km",
    terrain: "Atlas / Desert",
    priceMAD: "450",
    priceEUR: "40",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80",
    specs: [
      { label: "Engine", value: "411cc" },
      { label: "Range", value: "450 km" },
      { label: "Max Speed", value: "130 km/h" },
      { label: "Terrain", value: "Off-road ready" },
    ],
    accentColor: "var(--color-red)",
    featured: true,
  },
  {
    id: "touring",
    category: "Touring",
    name: "BMW F750 GS",
    tagline: "Long distance refined",
    engine: "853cc",
    range: "600km",
    terrain: "Coast / Highway",
    priceMAD: "700",
    priceEUR: "62",
    image: "https://images.unsplash.com/photo-1558618047-f89ef8b85f24?w=800&q=80",
    specs: [
      { label: "Engine", value: "853cc" },
      { label: "Range", value: "600 km" },
      { label: "Max Speed", value: "200 km/h" },
      { label: "License", value: "A required" },
    ],
    accentColor: "var(--color-atlas)",
  },
];

export default function FleetSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Title reveal
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );

      // Cards stagger reveal
      const cards = cardsRef.current?.querySelectorAll(".fleet-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="fleet" className="section overflow-clip">
      <div className="container">
        {/* Section header */}
        <div ref={titleRef} className="mb-16 md:mb-20">
          <p className="label mb-4" style={{ color: "var(--color-gold)" }}>
            Our Motorcycles
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="display-section" style={{ color: "var(--color-cream)" }}>
              THE FLEET
            </h2>
            <p className="body-lg" style={{ color: "var(--color-muted)", maxWidth: "380px" }}>
              Every bike in our fleet is maintained to manufacturer standards, fully insured, and ready for Morocco&apos;s diverse terrain.
            </p>
          </div>
          <span className="gold-line mt-6" />
        </div>

        {/* Cards grid */}
        <div
          ref={cardsRef}
          className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
        >
          {bikes.map((bike) => (
            <div
              key={bike.id}
              className="fleet-card card-dark relative flex flex-col overflow-hidden"
              style={{
                border: bike.featured ? `1px solid ${bike.accentColor}` : undefined,
              }}
            >
              {bike.featured && (
                <div
                  className="absolute top-4 right-4 z-10 status-badge"
                  style={{
                    background: "rgba(201,162,39,0.15)",
                    color: "var(--color-gold)",
                    border: "1px solid rgba(201,162,39,0.3)",
                  }}
                >
                  Most Popular
                </div>
              )}

              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: "220px", borderRadius: "12px 12px 0 0" }}>
                <Image
                  src={bike.image}
                  alt={bike.name}
                  fill
                  className="object-cover transition-transform duration-700"
                  style={{ borderRadius: "12px 12px 0 0" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                  }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(180deg, transparent 50%, rgba(28,25,22,0.9) 100%)",
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 gap-4">
                {/* Accent line */}
                <div style={{ width: "2rem", height: "2px", background: bike.accentColor }} />

                <p className="label" style={{ color: bike.accentColor }}>
                  {bike.category}
                </p>
                <h3 className="display-card" style={{ color: "var(--color-cream)" }}>
                  {bike.name}
                </h3>
                <p className="body-sm" style={{ color: "var(--color-muted)" }}>
                  {bike.tagline} · {bike.terrain}
                </p>

                {/* Specs grid */}
                <div
                  className="grid grid-cols-2 gap-3 mt-2"
                  style={{
                    borderTop: "1px solid rgba(255,248,237,0.08)",
                    paddingTop: "1rem",
                  }}
                >
                  {bike.specs.map((spec) => (
                    <div key={spec.label}>
                      <p className="label mb-0.5" style={{ color: "var(--color-muted)", fontSize: "0.6rem" }}>
                        {spec.label}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "0.8rem",
                          color: "var(--color-cream)",
                          fontWeight: 600,
                        }}
                      >
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between mt-auto pt-4"
                  style={{ borderTop: "1px solid rgba(255,248,237,0.08)" }}
                >
                  <div>
                    <p className="label mb-0.5" style={{ color: "var(--color-muted)", fontSize: "0.6rem" }}>
                      From / day
                    </p>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: bike.accentColor }}>
                      {bike.priceMAD} MAD
                      <span style={{ fontSize: "0.75rem", color: "var(--color-muted)", fontWeight: 400 }}>
                        {" "}/ €{bike.priceEUR}
                      </span>
                    </p>
                  </div>
                  <a
                    href="#booking"
                    className="btn"
                    style={{
                      background: "transparent",
                      border: `1.5px solid ${bike.accentColor}`,
                      color: bike.accentColor,
                      padding: "0.5rem 1.25rem",
                      fontSize: "0.65rem",
                    }}
                  >
                    Reserve
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
