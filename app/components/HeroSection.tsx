"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Replace with /images/hero.jpg once you upload the file to public/images/
const HERO_IMAGE = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=90";

const bikes = [
  { id: "scooter", label: "Scooter 125cc", price: "200 MAD" },
  { id: "enduro", label: "Enduro 411cc", price: "450 MAD" },
  { id: "touring", label: "Touring BMW", price: "700 MAD" },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [bike, setBike] = useState("enduro");
  const [dateDepart, setDateDepart] = useState("");
  const [dateRetour, setDateRetour] = useState("");

  useGSAP(() => {
    // Parallax zoom on scroll
    gsap.to(imgRef.current, {
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 2,
      },
    });

    // SplitText entrance
    if (headlineRef.current) {
      const split = new SplitText(headlineRef.current, { type: "chars" });
      gsap.from(split.chars, {
        opacity: 0,
        y: 60,
        rotationX: -40,
        stagger: 0.035,
        duration: 1.1,
        ease: "power4.out",
        delay: 0.2,
      });
      return () => split.revert();
    }
  }, { scope: heroRef });

  const handleBook = () => {
    const selectedBike = bikes.find((b) => b.id === bike);
    const msg = encodeURIComponent(
      `Bonjour MenaraRide 🏍️\n\nJe souhaite réserver :\n• Moto : ${selectedBike?.label} (${selectedBike?.price}/jour)\n• Départ : ${dateDepart || "À préciser"}\n• Retour : ${dateRetour || "À préciser"}\n\nMerci !`
    );
    window.open(`https://wa.me/212661234567?text=${msg}`, "_blank");
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,248,237,0.08)",
    border: "1px solid rgba(255,248,237,0.15)",
    borderRadius: "8px",
    padding: "0.6rem 0.875rem",
    color: "var(--color-cream)",
    fontFamily: "var(--font-body)",
    fontSize: "0.875rem",
    outline: "none",
    colorScheme: "dark",
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative overflow-hidden"
      style={{ height: "100svh", minHeight: "700px" }}
    >
      {/* Background image with parallax */}
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <Image
          src={HERO_IMAGE}
          alt="Location moto Marrakech"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,13,11,0.35) 0%, rgba(15,13,11,0.6) 50%, rgba(15,13,11,0.93) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div
        className="container relative z-10 h-full flex flex-col justify-center"
        style={{ paddingTop: "80px" }}
      >
        <div className="max-w-2xl">
          {/* Label */}
          <motion.p
            className="label mb-4"
            style={{ color: "var(--color-gold)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Location de Moto · Marrakech
          </motion.p>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="display-hero"
            style={{ color: "var(--color-cream)", lineHeight: 0.9, marginBottom: "1rem" }}
          >
            RIDE FREE.
          </h1>

          {/* Sub */}
          <motion.p
            className="body-lg"
            style={{ color: "var(--color-muted)", maxWidth: "420px", marginBottom: "2.5rem" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Explorez le Maroc à votre rythme. Atlas, Agafay, Essaouira — livraison à votre riad incluse.
          </motion.p>

          {/* ── BOOKING WIDGET ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "rgba(15,13,11,0.75)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,248,237,0.12)",
              borderRadius: "16px",
              padding: "1.5rem",
              maxWidth: "560px",
            }}
          >
            {/* Bike selector pills */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {bikes.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBike(b.id)}
                  style={{
                    padding: "0.4rem 0.9rem",
                    borderRadius: "999px",
                    fontFamily: "var(--font-display)",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    border: bike === b.id ? "1.5px solid var(--color-gold)" : "1.5px solid rgba(255,248,237,0.15)",
                    background: bike === b.id ? "var(--color-gold)" : "transparent",
                    color: bike === b.id ? "var(--color-night)" : "var(--color-muted)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {b.label} · {b.price}/j
                </button>
              ))}
            </div>

            {/* Date row */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.65rem", letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: "0.35rem" }}>
                  Départ
                </label>
                <input
                  type="date"
                  value={dateDepart}
                  onChange={(e) => setDateDepart(e.target.value)}
                  style={inputBase}
                  onFocus={(e) => (e.target.style.borderColor = "var(--color-gold)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,248,237,0.15)")}
                />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.65rem", letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: "0.35rem" }}>
                  Retour
                </label>
                <input
                  type="date"
                  value={dateRetour}
                  onChange={(e) => setDateRetour(e.target.value)}
                  style={inputBase}
                  onFocus={(e) => (e.target.style.borderColor = "var(--color-gold)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,248,237,0.15)")}
                />
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3">
              <motion.button
                onClick={handleBook}
                className="btn btn-gold"
                style={{ flex: 1, justifyContent: "center" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Réserver via WhatsApp
              </motion.button>
              <motion.a
                href="tel:+212661234567"
                className="btn"
                style={{
                  background: "rgba(255,248,237,0.08)",
                  border: "1.5px solid rgba(255,248,237,0.15)",
                  color: "var(--color-cream)",
                  flexShrink: 0,
                  padding: "0 1rem",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .02h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
                </svg>
                Appel
              </motion.a>
            </div>

            <p style={{ fontSize: "0.68rem", color: "rgba(255,248,237,0.4)", marginTop: "0.75rem", fontFamily: "var(--font-body)" }}>
              Livraison à votre hôtel · Casque inclus · Confirmation sous 1h
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 hidden md:block"
        style={{
          background: "rgba(15,13,11,0.85)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,248,237,0.07)",
        }}
      >
        <div className="container grid" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
          {[
            { v: "50+", l: "Motos disponibles" },
            { v: "4.9 ★", l: "Note Google" },
            { v: "< 1h", l: "Confirmation" },
            { v: "0 MAD", l: "Livraison incluse" },
          ].map((s, i) => (
            <div
              key={i}
              className="py-3 px-6"
              style={{ borderRight: i < 3 ? "1px solid rgba(255,248,237,0.07)" : "none" }}
            >
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 800, color: "var(--color-gold)", lineHeight: 1 }}>
                {s.v}
              </p>
              <p className="label mt-0.5" style={{ color: "var(--color-muted)", fontSize: "0.6rem" }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
