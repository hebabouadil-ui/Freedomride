"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    id: "half-day",
    name: "Half Day",
    duration: "4 hours",
    priceMAD: 200,
    priceEUR: 18,
    recommended: false,
    description: "Perfect for a medina loop or quick Agafay run.",
    features: [
      "4 hours rental",
      "Helmet included",
      "Lock & chain",
      "Basic insurance",
      "City map",
      "Phone support",
    ],
    missing: ["GPS device", "Hotel delivery", "Full insurance", "24/7 support"],
    bike: "Scooter only",
  },
  {
    id: "full-day",
    name: "Full Day",
    duration: "24 hours",
    priceMAD: 450,
    priceEUR: 40,
    recommended: true,
    description: "The most popular option. Atlas, Agafay, coast — all yours.",
    features: [
      "24 hours rental",
      "Premium helmet included",
      "Lock & chain",
      "Full insurance",
      "GPS device",
      "Hotel delivery",
      "24/7 WhatsApp support",
      "Route guide PDF",
    ],
    missing: [],
    bike: "All bikes available",
  },
  {
    id: "weekly",
    name: "Weekly",
    duration: "7 days",
    priceMAD: 2500,
    priceEUR: 220,
    recommended: false,
    description: "Explore the entire country at your own pace.",
    features: [
      "7 days rental",
      "Premium helmet + gear bag",
      "Lock & chain",
      "Full comprehensive insurance",
      "GPS device",
      "Hotel delivery",
      "24/7 WhatsApp support",
      "Multi-route guide",
      "Emergency roadside",
      "Fuel discount card",
    ],
    missing: [],
    bike: "All bikes available",
  },
];

export default function PricingSection() {
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

      const cards = sectionRef.current?.querySelectorAll(".pricing-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="section overflow-clip"
      style={{ background: "var(--color-night)" }}
    >
      <div className="container">
        {/* Section header */}
        <div ref={titleRef} className="mb-16 md:mb-20">
          <p className="label mb-4" style={{ color: "var(--color-gold)" }}>
            Transparent Rates
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="display-section" style={{ color: "var(--color-cream)" }}>
              SIMPLE<br />PRICING
            </h2>
            <p className="body-lg" style={{ color: "var(--color-muted)", maxWidth: "380px" }}>
              No hidden fees. No surprises. Just the freedom to ride with everything you need included.
            </p>
          </div>
          <span className="gold-line mt-6" />
        </div>

        {/* Cards */}
        <div
          className="grid gap-6 items-stretch"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
        >
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="pricing-card relative flex flex-col"
              style={{
                background: plan.recommended
                  ? "var(--color-cream)"
                  : "var(--color-charcoal)",
                color: plan.recommended ? "var(--color-night)" : "var(--color-cream)",
                borderRadius: "var(--radius-card)",
                border: plan.recommended
                  ? "1px solid var(--color-gold)"
                  : "1px solid rgba(255,248,237,0.07)",
                padding: "2rem",
                transition: "transform 0.4s var(--ease-cinematic)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.transform = "translateY(-8px)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.transform = "translateY(0)")
              }
            >
              {plan.recommended && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 label"
                  style={{
                    background: "var(--color-gold)",
                    color: "var(--color-night)",
                    padding: "0.25rem 1rem",
                    borderRadius: "999px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Most Popular
                </div>
              )}

              {/* Plan name + duration */}
              <div className="mb-2">
                <p
                  className="label mb-1"
                  style={{
                    color: plan.recommended ? "var(--color-brown)" : "var(--color-gold)",
                  }}
                >
                  {plan.duration}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.75rem",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {plan.name}
                </h3>
              </div>

              {/* Price */}
              <div className="my-5" style={{ borderTop: plan.recommended ? "1px solid rgba(49,39,38,0.15)" : "1px solid rgba(255,248,237,0.08)", paddingTop: "1.25rem" }}>
                <div className="flex items-baseline gap-2">
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "2.75rem",
                      fontWeight: 800,
                      lineHeight: 1,
                      color: plan.recommended ? "var(--color-night)" : "var(--color-gold)",
                    }}
                  >
                    {plan.priceMAD}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      color: plan.recommended
                        ? "rgba(15,13,11,0.6)"
                        : "var(--color-muted)",
                    }}
                  >
                    MAD
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.85rem",
                      color: plan.recommended
                        ? "rgba(15,13,11,0.5)"
                        : "rgba(255,248,237,0.4)",
                    }}
                  >
                    / €{plan.priceEUR}
                  </span>
                </div>
                <p
                  className="body-sm mt-2"
                  style={{
                    color: plan.recommended
                      ? "rgba(15,13,11,0.65)"
                      : "var(--color-muted)",
                  }}
                >
                  {plan.description}
                </p>
                <p
                  className="label mt-2"
                  style={{
                    color: plan.recommended ? "var(--color-brown)" : "var(--color-gold)",
                  }}
                >
                  {plan.bike}
                </p>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={plan.recommended ? "var(--color-atlas)" : "var(--color-gold)"}
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span
                      className="body-sm"
                      style={{
                        color: plan.recommended
                          ? "rgba(15,13,11,0.8)"
                          : "var(--color-cream)",
                      }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
                {plan.missing.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 opacity-35">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    <span className="body-sm" style={{ color: plan.recommended ? "rgba(15,13,11,0.4)" : "var(--color-muted)" }}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#booking"
                className="btn mt-6"
                style={{
                  background: plan.recommended ? "var(--color-night)" : "transparent",
                  color: plan.recommended ? "var(--color-cream)" : "var(--color-cream)",
                  border: plan.recommended
                    ? "1.5px solid var(--color-night)"
                    : "1.5px solid rgba(255,248,237,0.2)",
                  width: "100%",
                }}
              >
                {plan.recommended ? "Book Full Day" : "Get Started"}
              </a>
            </div>
          ))}
        </div>

        {/* Note */}
        <p
          className="body-sm text-center mt-10"
          style={{ color: "var(--color-muted)" }}
        >
          All prices include VAT · Security deposit 500 MAD (refundable) · Fuel not included
        </p>
      </div>
    </section>
  );
}
