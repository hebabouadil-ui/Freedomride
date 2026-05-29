"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// ← hero.jpg uploaded to public/images/ by the user
const HERO_IMAGE = "/images/hero.jpg";

const bikes = [
  { id: "scooter", label: "Scooter", sub: "125cc · Sans permis moto", price: "200 MAD" },
  { id: "enduro",  label: "Enduro",  sub: "Royal Enfield 411cc",      price: "450 MAD" },
  { id: "touring", label: "Touring", sub: "BMW F 750 GS · 853cc",     price: "700 MAD" },
];

export default function HeroSection() {
  const heroRef   = useRef<HTMLElement>(null);
  const imgRef    = useRef<HTMLDivElement>(null);
  const headRef   = useRef<HTMLHeadingElement>(null);
  const [bike, setBike]           = useState("enduro");
  const [dateDepart, setDepart]   = useState("");
  const [dateRetour, setRetour]   = useState("");

  useGSAP(() => {
    gsap.to(imgRef.current, {
      scale: 1.08,
      ease: "none",
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 2 },
    });
    if (headRef.current) {
      const split = new SplitText(headRef.current, { type: "chars" });
      gsap.from(split.chars, {
        opacity: 0, y: 50, rotationX: -30, stagger: 0.04, duration: 1, ease: "power4.out", delay: 0.25,
      });
      return () => split.revert();
    }
  }, { scope: heroRef });

  const selectedBike = bikes.find((b) => b.id === bike)!;

  const handleBook = () => {
    const msg = encodeURIComponent(
      `Bonjour MenaraRide 🏍️\n\nRéservation :\n• Moto : ${selectedBike.label} (${selectedBike.price}/jour)\n• Départ : ${dateDepart || "À confirmer"}\n• Retour : ${dateRetour || "À confirmer"}\n\nMerci !`
    );
    window.open(`https://wa.me/212661234567?text=${msg}`, "_blank");
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative overflow-hidden"
      style={{ height: "100svh", minHeight: "720px" }}
    >
      {/* ── Hero image ── */}
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <Image
          src={HERO_IMAGE}
          alt="MenaraRide — Location de motos à Marrakech"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* gradient: lighter on right so bikes are visible, dark on left for text */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(105deg, rgba(15,13,11,0.88) 0%, rgba(15,13,11,0.55) 55%, rgba(15,13,11,0.15) 100%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, rgba(15,13,11,0.1) 0%, transparent 40%, rgba(15,13,11,0.7) 100%)"
        }} />
      </div>

      {/* ── Content ── */}
      <div className="container relative z-10 h-full flex flex-col justify-center" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "620px" }}>

          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div style={{ width: "32px", height: "1.5px", background: "var(--color-gold)" }} />
            <p className="label" style={{ color: "var(--color-gold)" }}>
              Location de Moto Premium · Marrakech
            </p>
          </motion.div>

          {/* Headline — controlled break */}
          <h1
            ref={headRef}
            className="display-hero"
            style={{ color: "var(--color-cream)", lineHeight: 0.9, marginBottom: "1.25rem", whiteSpace: "pre-line" }}
          >
            {"EXPLOREZ\nLE MAROC."}
          </h1>

          {/* Sub */}
          <motion.p
            className="body-lg"
            style={{ color: "rgba(255,248,237,0.72)", maxWidth: "400px", marginBottom: "2.5rem", lineHeight: 1.65 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Scooters, enduros, tourings — livrés à votre riad ou hôtel. Atlas, Agafay, Essaouira vous attendent.
          </motion.p>

          {/* ── Booking widget ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "rgba(12,10,9,0.82)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,248,237,0.1)",
              borderRadius: "18px",
              overflow: "hidden",
              maxWidth: "540px",
            }}
          >
            {/* Bike tabs */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderBottom: "1px solid rgba(255,248,237,0.08)" }}>
              {bikes.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBike(b.id)}
                  style={{
                    padding: "0.875rem 0.5rem",
                    borderBottom: bike === b.id ? "2px solid var(--color-gold)" : "2px solid transparent",
                    borderRight: "1px solid rgba(255,248,237,0.06)",
                    borderTop: "none",
                    borderLeft: "none",
                    background: bike === b.id ? "rgba(201,162,39,0.1)" : "transparent",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textAlign: "center",
                  }}
                >
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "0.68rem", fontWeight: 700, color: bike === b.id ? "var(--color-gold)" : "var(--color-cream)", letterSpacing: "0.04em", marginBottom: "0.2rem" }}>
                    {b.label}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", color: "var(--color-muted)" }}>{b.price}/jour</p>
                </button>
              ))}
            </div>

            {/* Selected bike info */}
            <div style={{ padding: "0.75rem 1.25rem", background: "rgba(201,162,39,0.06)", borderBottom: "1px solid rgba(255,248,237,0.06)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--color-muted)" }}>{selectedBike.sub}</p>
            </div>

            {/* Date pickers + CTA */}
            <div style={{ padding: "1.25rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.875rem" }}>
                {[
                  { label: "📅 Départ", val: dateDepart, set: setDepart },
                  { label: "📅 Retour",  val: dateRetour, set: setRetour  },
                ].map(({ label, val, set }) => (
                  <div key={label}>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: "0.35rem" }}>
                      {label}
                    </p>
                    <input
                      type="date"
                      value={val}
                      onChange={(e) => set(e.target.value)}
                      style={{
                        width: "100%",
                        background: "rgba(255,248,237,0.06)",
                        border: "1px solid rgba(255,248,237,0.12)",
                        borderRadius: "8px",
                        padding: "0.55rem 0.75rem",
                        color: "var(--color-cream)",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.82rem",
                        outline: "none",
                        colorScheme: "dark",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--color-gold)")}
                      onBlur={(e)  => (e.target.style.borderColor = "rgba(255,248,237,0.12)")}
                    />
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "0.625rem" }}>
                <motion.button
                  onClick={handleBook}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: "var(--color-gold)",
                    color: "var(--color-night)",
                    border: "none",
                    borderRadius: "9px",
                    padding: "0.75rem 1.25rem",
                    fontFamily: "var(--font-display)",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Réserver via WhatsApp
                </motion.button>

                <motion.a
                  href="tel:+212661234567"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: "rgba(255,248,237,0.07)",
                    border: "1px solid rgba(255,248,237,0.12)",
                    color: "var(--color-cream)",
                    borderRadius: "9px",
                    padding: "0.75rem 1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    textDecoration: "none",
                    fontFamily: "var(--font-display)",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .02h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
                  </svg>
                  Appel
                </motion.a>
              </div>

              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", color: "rgba(255,248,237,0.35)", marginTop: "0.75rem", textAlign: "center" }}>
                Aucun paiement maintenant · Livraison à votre hôtel · Casque inclus
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 hidden md:block"
        style={{ background: "rgba(12,10,9,0.85)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,248,237,0.07)" }}
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
