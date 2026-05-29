"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const plans = [
  {
    id: "half-day",
    name: "Demi-Journée",
    duration: "4 heures",
    priceMAD: { scooter: 200, enduro: 280, touring: 420 },
    priceEUR: { scooter: 18, enduro: 25, touring: 37 },
    recommended: false,
    features: ["4h de location", "Casque ECE inclus", "Antivol fourni", "Assurance tiers", "Plan de ville", "Support téléphonique"],
    missing: ["GPS", "Livraison hôtel", "Assurance complète", "Support 24h/24"],
    bikes: ["Scooter uniquement"],
    color: "var(--color-cream)",
  },
  {
    id: "full-day",
    name: "Journée Complète",
    duration: "24 heures",
    priceMAD: { scooter: 350, enduro: 450, touring: 700 },
    priceEUR: { scooter: 31, enduro: 40, touring: 62 },
    recommended: true,
    features: ["24h de location", "Casque premium inclus", "Antivol fourni", "Assurance tous risques", "GPS Maroc inclus", "Livraison hôtel/riad", "Support WhatsApp 24h/24", "Guide de routes PDF", "Kit de premiers secours"],
    missing: [],
    bikes: ["Toutes les motos"],
    color: "var(--color-night)",
  },
  {
    id: "weekly",
    name: "Semaine",
    duration: "7 jours",
    priceMAD: { scooter: 1800, enduro: 2500, touring: 3800 },
    priceEUR: { scooter: 160, enduro: 220, touring: 335 },
    recommended: false,
    features: ["7 jours de location", "Casque premium + sac", "Antivol fourni", "Assurance tous risques", "GPS Maroc inclus", "Livraison hôtel/riad", "Support WhatsApp 24h/24", "Multi-guides d'itinéraires", "Assistance dépannage", "Carte carburant partenaire", "Deuxième casque offert"],
    missing: [],
    bikes: ["Toutes les motos"],
    color: "var(--color-cream)",
  },
];

type BikeType = "scooter" | "enduro" | "touring";

export default function PricingSection() {
  const [bikeType, setBikeType] = useState<BikeType>("enduro");

  return (
    <section id="pricing" className="section overflow-clip" style={{ background: "var(--color-night)" }}>
      <div className="container">
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="label mb-4" style={{ color: "var(--color-gold)" }}>Tarifs Transparents</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="display-section" style={{ color: "var(--color-cream)" }}>TARIFS<br />SIMPLES</h2>
            <p className="body-lg" style={{ color: "var(--color-muted)", maxWidth: "380px" }}>
              Sans frais cachés. Casque, assurance et livraison inclus. Paiement sur place en MAD, EUR ou carte.
            </p>
          </div>
          <span className="gold-line mt-6" />
        </motion.div>

        {/* Bike type selector */}
        <motion.div
          className="flex gap-2 mb-10 p-1.5 w-fit rounded-xl"
          style={{ background: "var(--color-charcoal)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {(["scooter", "enduro", "touring"] as BikeType[]).map((t) => (
            <button
              key={t}
              onClick={() => setBikeType(t)}
              style={{
                position: "relative",
                padding: "0.5rem 1.25rem",
                borderRadius: "8px",
                fontFamily: "var(--font-display)",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                border: "none",
                color: bikeType === t ? "var(--color-night)" : "var(--color-muted)",
                background: "transparent",
                transition: "color 0.3s ease",
                zIndex: 1,
              }}
            >
              {bikeType === t && (
                <motion.div
                  layoutId="bikeSelector"
                  style={{ position: "absolute", inset: 0, background: "var(--color-gold)", borderRadius: "8px", zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {t === "scooter" ? "Scooter" : t === "enduro" ? "Enduro" : "Touring"}
            </button>
          ))}
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 items-stretch" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              className="pricing-card relative flex flex-col"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              style={{
                background: plan.recommended ? "var(--color-cream)" : "var(--color-charcoal)",
                color: plan.recommended ? "var(--color-night)" : "var(--color-cream)",
                borderRadius: "var(--radius-card)",
                border: plan.recommended ? "1px solid var(--color-gold)" : "1px solid rgba(255,248,237,0.07)",
                padding: "2rem",
              }}
            >
              {plan.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 label"
                  style={{ background: "var(--color-gold)", color: "var(--color-night)", padding: "0.25rem 1rem", borderRadius: "999px", whiteSpace: "nowrap" }}>
                  ✦ Le plus populaire
                </div>
              )}

              <p className="label mb-1" style={{ color: plan.recommended ? "var(--color-brown)" : "var(--color-gold)" }}>
                {plan.duration}
              </p>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "1.25rem" }}>
                {plan.name}
              </h3>

              {/* Animated price */}
              <div style={{ borderTop: plan.recommended ? "1px solid rgba(49,39,38,0.12)" : "1px solid rgba(255,248,237,0.07)", paddingTop: "1.25rem", marginBottom: "1.25rem" }}>
                <AnimatePresence mode="wait">
                  <motion.div key={`${plan.id}-${bikeType}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                    <div className="flex items-baseline gap-1.5">
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "2.75rem", fontWeight: 800, lineHeight: 1, color: plan.recommended ? "var(--color-night)" : "var(--color-gold)" }}>
                        {plan.priceMAD[bikeType]}
                      </span>
                      <span style={{ fontSize: "0.85rem", color: plan.recommended ? "rgba(15,13,11,0.5)" : "var(--color-muted)" }}>MAD</span>
                      <span style={{ fontSize: "0.78rem", color: plan.recommended ? "rgba(15,13,11,0.4)" : "rgba(255,248,237,0.3)" }}>
                        / €{plan.priceEUR[bikeType]}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <p className="body-sm mt-1.5" style={{ color: plan.recommended ? "rgba(15,13,11,0.55)" : "var(--color-muted)" }}>
                  {plan.bikes[0]}
                </p>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={plan.recommended ? "var(--color-atlas)" : "var(--color-gold)"} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="body-sm" style={{ color: plan.recommended ? "rgba(15,13,11,0.8)" : "var(--color-cream)" }}>{f}</span>
                  </li>
                ))}
                {plan.missing.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 opacity-30">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    <span className="body-sm">{f}</span>
                  </li>
                ))}
              </ul>

              <motion.a href="#booking" className="btn mt-6" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                style={{
                  background: plan.recommended ? "var(--color-night)" : "transparent",
                  color: plan.recommended ? "var(--color-cream)" : "var(--color-cream)",
                  border: plan.recommended ? "1.5px solid var(--color-night)" : "1.5px solid rgba(255,248,237,0.2)",
                  width: "100%",
                }}>
                Réserver · {plan.name}
              </motion.a>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="body-sm text-center mt-8"
          style={{ color: "var(--color-muted)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          TVA incluse · Dépôt de garantie 500 MAD (remboursé) · Carburant non inclus · Paiement en MAD, EUR ou carte
        </motion.p>
      </div>
    </section>
  );
}
