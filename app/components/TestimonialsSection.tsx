"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Sophie L.",
    country: "France 🇫🇷",
    rating: 5,
    text: "The Atlas Mountains on an enduro was the highlight of my entire Morocco trip. FreedomRide delivered the bike to our riad, gave us a route map, and were on WhatsApp the whole time. Parfait!",
    date: "January 2025",
  },
  {
    name: "Jake M.",
    country: "Australia 🇦🇺",
    rating: 5,
    text: "Rented the BMW for 3 days. Drove to Essaouira and back via the coastal road. The bike was immaculate, insurance was real, and the team sorted out a flat tyre in under an hour. Legends.",
    date: "March 2025",
  },
  {
    name: "Lena & Tom",
    country: "Germany 🇩🇪",
    rating: 5,
    text: "We had zero motorcycle experience but the scooters were easy to handle and the city tour around the Medina was magical. Staff was patient explaining the routes. Absolutely recommend!",
    date: "December 2024",
  },
  {
    name: "Carlos V.",
    country: "Spain 🇪🇸",
    rating: 5,
    text: "Took the enduro to Agafay at sunset. Best decision I made in Morocco. The desert light at golden hour on a motorbike is something you can't replicate. Incredible service too.",
    date: "February 2025",
  },
  {
    name: "Priya S.",
    country: "UK 🇬🇧",
    rating: 5,
    text: "Impeccable bikes, professional team. The GPS saved us so many times in the mountains. Will be back next winter — already messaged them on WhatsApp to pre-book!",
    date: "November 2024",
  },
  {
    name: "Mathis D.",
    country: "Belgium 🇧🇪",
    rating: 5,
    text: "The weekly package is exceptional value. 7 days, full insurance, GPS, hotel pickup — everything worked flawlessly. FreedomRide really lives up to its name.",
    date: "April 2025",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--color-gold)">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
        }
      );
    },
    { scope: sectionRef }
  );

  const doubled = [...testimonials, ...testimonials];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="section overflow-clip"
      style={{ background: "var(--color-night)" }}
    >
      {/* Header */}
      <div className="container">
        <div ref={titleRef} className="mb-16">
          <p className="label mb-4" style={{ color: "var(--color-gold)" }}>
            Rider Stories
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="display-section" style={{ color: "var(--color-cream)" }}>
              RIDERS SAY
            </h2>
            <div className="flex items-center gap-4">
              <div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, color: "var(--color-gold)", lineHeight: 1 }}>
                  4.9 / 5
                </p>
                <p className="body-sm mt-1" style={{ color: "var(--color-muted)" }}>Based on 200+ Google reviews</p>
              </div>
            </div>
          </div>
          <span className="gold-line mt-6" />
        </div>
      </div>

      {/* Marquee — no overflow:hidden on wrapper so gradient edges work */}
      <div className="relative overflow-hidden" style={{ padding: "0.5rem 0" }}>
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none" style={{ width: "10%", background: "linear-gradient(to right, var(--color-night), transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none" style={{ width: "10%", background: "linear-gradient(to left, var(--color-night), transparent)" }} />

        <div className="marquee-track">
          {doubled.map((t, i) => (
            <div
              key={i}
              className="card-dark flex flex-col gap-4 flex-shrink-0"
              style={{
                width: "320px",
                padding: "1.75rem",
                marginRight: "1.5rem",
              }}
            >
              {/* Stars */}
              <StarRating count={t.rating} />

              {/* Quote */}
              <p className="body-sm flex-1" style={{ color: "var(--color-cream)", lineHeight: 1.7 }}>
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div style={{ borderTop: "1px solid rgba(255,248,237,0.08)", paddingTop: "1rem" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "0.8rem", fontWeight: 700, color: "var(--color-cream)" }}>
                  {t.name}
                </p>
                <p className="body-sm" style={{ color: "var(--color-muted)", marginTop: "0.15rem" }}>
                  {t.country} · {t.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
