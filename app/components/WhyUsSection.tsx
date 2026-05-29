"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "🛡️",
    title: "Assurance Tous Risques",
    desc: "Couverture complète incluse dans chaque location. Responsabilité civile, dommages matériels, assistance rapatriement. Zéro tracas.",
    stat: "100%",
    statLabel: "couverture",
  },
  {
    icon: "🏨",
    title: "Livraison Riad / Hôtel",
    desc: "Nous livrons votre moto directement à votre adresse dans la Médina, Gueliz ou Hivernage. Pas de déplacement — on vient à vous.",
    stat: "0 MAD",
    statLabel: "frais de livraison",
  },
  {
    icon: "⛑️",
    title: "Casque & Équipement",
    desc: "Casques ECE 22.06 certifiés, gants, gilet haute visibilité avec chaque location. Un deuxième casque offert pour les locations à la semaine.",
    stat: "ECE 22.06",
    statLabel: "norme européenne",
  },
  {
    icon: "💬",
    title: "Support WhatsApp 24h/24",
    desc: "Notre équipe répond en français, arabe et anglais à toute heure. Crevaison à Agafay à 23h ? On s'en occupe.",
    stat: "<15 min",
    statLabel: "temps de réponse",
  },
  {
    icon: "🗺️",
    title: "GPS Maroc Inclus",
    desc: "Appareil GPS préchargé avec les cartes du Maroc, les itinéraires recommandés et les points d'intérêt. Signaux télécom indépendants.",
    stat: "400+",
    statLabel: "POIs Maroc",
  },
  {
    icon: "✅",
    title: "Sans Permis Moto",
    desc: "Les scooters 125–155cc ne nécessitent que votre permis voiture (catégorie B). Disponible pour la majorité de nos visiteurs internationaux.",
    stat: "155cc",
    statLabel: "sans permis moto",
  },
];

export default function WhyUsSection() {
  return (
    <section id="why-us" className="section overflow-clip dot-pattern" style={{ background: "var(--color-charcoal)" }}>
      <div className="container">
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="label mb-4" style={{ color: "var(--color-gold)" }}>Pourquoi MenaraRide</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="display-section" style={{ color: "var(--color-cream)" }}>ROULEZ EN<br />CONFIANCE</h2>
            <p className="body-lg" style={{ color: "var(--color-muted)", maxWidth: "400px" }}>
              Nous avons pensé à tout pour que vous ne pensiez qu'à la route.
            </p>
          </div>
          <span className="gold-line mt-6" />
        </motion.div>

        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="card-dark p-7 flex flex-col gap-4"
              initial={{ opacity: 0, filter: "blur(12px)", y: 30 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
            >
              {/* Icon + stat */}
              <div className="flex items-start justify-between">
                <div style={{ fontSize: "2rem", lineHeight: 1 }}>{f.icon}</div>
                <div className="text-right">
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 800, color: "var(--color-gold)", lineHeight: 1 }}>{f.stat}</p>
                  <p className="label" style={{ color: "var(--color-muted)", fontSize: "0.58rem" }}>{f.statLabel}</p>
                </div>
              </div>

              <div style={{ width: "2rem", height: "2px", background: "var(--color-gold)" }} />

              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "0.92rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--color-cream)" }}>
                {f.title}
              </h3>
              <p className="body-sm" style={{ color: "var(--color-muted)", lineHeight: 1.75 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust strip */}
        <motion.div
          className="mt-16 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: "rgba(201,162,39,0.06)", border: "1px solid rgba(201,162,39,0.12)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "var(--color-cream)" }}>
              Enregistrés au Registre du Commerce de Marrakech
            </p>
            <p className="body-sm mt-1" style={{ color: "var(--color-muted)" }}>
              RC Marrakech N° 123456 · Patente N° 78901234 · Assurance Wafa Assurance
            </p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            {["Wafa Assurance", "Google 4.9★", "TripAdvisor"].map((badge) => (
              <div key={badge} className="label" style={{ background: "rgba(255,248,237,0.07)", padding: "0.4rem 0.8rem", borderRadius: "6px", color: "var(--color-muted)", whiteSpace: "nowrap" }}>
                {badge}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
