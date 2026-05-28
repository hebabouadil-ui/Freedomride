"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
          pin: false,
        },
      });

      // Parallax zoom on bg image
      tl.to(imgRef.current, { scale: 1.18, ease: "none" }, 0);

      // Text drift up + fade
      tl.to([headlineRef.current, subRef.current, ctaRef.current], {
        y: -80,
        opacity: 0,
        ease: "none",
      }, 0);

      // Entrance animation
      const entranceTl = gsap.timeline({ delay: 0.3 });

      // Split headline into chars manually
      const headline = headlineRef.current;
      if (headline) {
        const text = headline.textContent || "";
        headline.innerHTML = text
          .split("")
          .map((char) =>
            char === " "
              ? `<span style="display:inline-block">&nbsp;</span>`
              : `<span style="display:inline-block;opacity:0;transform:translateY(60px)">${char}</span>`
          )
          .join("");

        entranceTl.to(headline.querySelectorAll("span"), {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.04,
          ease: "power3.out",
        });
      }

      entranceTl.fromTo(
        subRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.4"
      );

      entranceTl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "600px" }}
    >
      {/* Background image */}
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85"
          alt="Motorcycle on a Moroccan mountain road at golden hour"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Cinematic gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,13,11,0.25) 0%, rgba(15,13,11,0.5) 50%, rgba(15,13,11,0.85) 100%)",
          }}
        />
        {/* Left vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, transparent 40%, rgba(15,13,11,0.6) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24">
        {/* Label */}
        <p className="label mb-6" style={{ color: "var(--color-gold)" }}>
          Marrakech · Atlas · Agafay · Essaouira
        </p>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="display-hero"
          style={{ color: "var(--color-cream)", maxWidth: "900px" }}
        >
          RIDE FREE.
        </h1>

        {/* Sub */}
        <p
          ref={subRef}
          className="body-lg mt-5"
          style={{ color: "var(--color-muted)", maxWidth: "480px" }}
        >
          Discover Morocco at your own pace. Premium motorcycles delivered to your riad or hotel.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mt-8">
          <a href="#booking" className="btn btn-gold">
            Book Your Ride
          </a>
          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Us
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 flex items-center gap-3" style={{ color: "var(--color-muted)" }}>
          <div
            style={{
              width: "1px",
              height: "48px",
              background: "linear-gradient(to bottom, transparent, var(--color-gold))",
              animation: "pulse 2s ease infinite",
            }}
          />
          <span className="label" style={{ color: "var(--color-muted)" }}>
            Scroll to explore
          </span>
        </div>
      </div>

      {/* Bottom stats bar */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{ borderTop: "1px solid rgba(255,248,237,0.08)" }}
      >
        <div
          className="container hidden md:grid gap-0"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          {[
            { value: "50+", label: "Bikes in fleet" },
            { value: "4", label: "Destinations" },
            { value: "4.9★", label: "Average rating" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col justify-center py-4 px-6"
              style={{
                borderRight: i < 2 ? "1px solid rgba(255,248,237,0.08)" : "none",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "var(--color-gold)",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
              <span className="label mt-1" style={{ color: "var(--color-muted)" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
