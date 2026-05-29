"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const destinations = ["Atlas", "Agafay", "Essaouira", "Marrakech"];

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const imgRef  = useRef<HTMLDivElement>(null);
  const [destIndex, setDestIndex] = useState(0);

  // Cycle destinations
  useEffect(() => {
    const t = setInterval(() => setDestIndex((i) => (i + 1) % destinations.length), 2500);
    return () => clearInterval(t);
  }, []);

  // Parallax
  useGSAP(() => {
    gsap.to(imgRef.current, {
      scale: 1.08,
      ease: "none",
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 2 },
    });
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative overflow-hidden"
      style={{ height: "100svh", minHeight: "640px" }}
    >
      {/* Background */}
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/Gemini_Generated_Image_pu3yw0pu3yw0pu3y.png"
          alt="MenaraRide — Location de motos à Marrakech"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, rgba(15,13,11,0.15) 0%, rgba(15,13,11,0.4) 45%, rgba(15,13,11,0.88) 100%)"
        }} />
      </div>

      {/* Content */}
      <div
        className="container relative z-10 h-full flex flex-col justify-end"
        style={{ paddingBottom: "clamp(4rem, 9vh, 7rem)" }}
      >
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div style={{ width: "24px", height: "1.5px", background: "var(--color-gold)", flexShrink: 0 }} />
          <p className="label" style={{ color: "var(--color-gold)" }}>
            Location de Moto · Marrakech
          </p>
        </motion.div>

        {/* Headline — two lines, controlled size */}
        <div style={{ marginBottom: "1.25rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 3.5vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--color-cream)",
              lineHeight: 1.1,
              textTransform: "uppercase",
            }}
          >
            Louez. Partez.
          </motion.p>

          {/* Animated destination line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginTop: "0.2rem" }}
          >
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 3.5vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "rgba(255,248,237,0.4)",
              textTransform: "uppercase",
            }}>
              Découvrez
            </span>

            {/* Cycling destination word */}
            <div style={{ overflow: "hidden", height: "clamp(2rem, 4.5vw, 3.8rem)", display: "flex", alignItems: "center" }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={destIndex}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.6rem, 3.5vw, 3rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: "var(--color-gold)",
                    textTransform: "uppercase",
                    display: "block",
                  }}
                >
                  {destinations[destIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Sub */}
        <motion.p
          style={{ color: "rgba(255,248,237,0.6)", maxWidth: "420px", marginBottom: "2.25rem", lineHeight: 1.65 }}
          className="body-sm"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65 }}
        >
          Scooters, enduros, tourings — livrés à votre riad. Casque et assurance inclus.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.78 }}
        >
          <a href="#booking" className="btn btn-gold">
            Réserver maintenant
          </a>
          <a
            href="https://wa.me/212661234567?text=Bonjour%20MenaraRide%20%F0%9F%8F%8D%EF%B8%8F%20Je%20souhaite%20louer%20une%20moto"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </motion.div>
      </div>

      {/* Stats bar */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 hidden md:block"
        style={{ background: "rgba(12,10,9,0.8)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,248,237,0.07)" }}
      >
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {[
            { v: "50+",   l: "Motos disponibles" },
            { v: "4.9 ★", l: "Note Google" },
            { v: "< 1h",  l: "Confirmation WhatsApp" },
            { v: "0 MAD", l: "Livraison incluse" },
          ].map((s, i) => (
            <div key={i} style={{ padding: "0.875rem 1.5rem", borderRight: i < 3 ? "1px solid rgba(255,248,237,0.07)" : "none" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 800, color: "var(--color-gold)", lineHeight: 1 }}>{s.v}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-muted)", marginTop: "0.25rem" }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
