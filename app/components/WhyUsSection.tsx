"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Full Insurance Coverage",
    desc: "All rentals include comprehensive third-party liability insurance. Your ride, fully covered.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Hotel & Riad Delivery",
    desc: "We deliver your bike directly to your accommodation anywhere in Marrakech — no extra charge.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Helmets & Gear Included",
    desc: "Premium ECE-certified helmets, gloves, and hi-vis vest with every rental. Safety first.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    title: "24/7 WhatsApp Support",
    desc: "Got a flat in Agafay at midnight? Message us. We're always reachable for our riders.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" /><path d="M2 12h3M19 12h3M12 2v3M12 19v3" />
      </svg>
    ),
    title: "GPS Device Available",
    desc: "Add a fully-charged GPS unit loaded with Morocco maps. Never get lost in the Atlas.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    title: "No License for Scooters",
    desc: "125cc scooters require no motorcycle license — only a valid car driving license (category B).",
  },
];

export default function WhyUsSection() {
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

      const items = sectionRef.current?.querySelectorAll(".why-item");
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, filter: "blur(12px)", y: 30 },
          {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
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
      id="why-us"
      className="section overflow-clip dot-pattern"
      style={{ background: "var(--color-charcoal)" }}
    >
      <div className="container">
        {/* Header */}
        <div ref={titleRef} className="mb-16 md:mb-20">
          <p className="label mb-4" style={{ color: "var(--color-gold)" }}>
            Why FreedomRide
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="display-section" style={{ color: "var(--color-cream)" }}>
              RIDE WITH<br />CONFIDENCE
            </h2>
            <p className="body-lg" style={{ color: "var(--color-muted)", maxWidth: "380px" }}>
              We&apos;ve thought of everything so you can focus on the road ahead.
            </p>
          </div>
          <span className="gold-line mt-6" />
        </div>

        {/* 2x3 grid */}
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="why-item card-dark p-7 flex flex-col gap-4"
            >
              {/* Icon */}
              <div
                style={{
                  color: "var(--color-gold)",
                  background: "rgba(201,162,39,0.1)",
                  width: "52px",
                  height: "52px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {f.icon}
              </div>

              {/* Content */}
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "var(--color-cream)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {f.title}
                </h3>
                <p className="body-sm" style={{ color: "var(--color-muted)" }}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
