"use client";

import { motion } from "framer-motion";

const routes = [
  {
    id: "medina",
    emoji: "🏛️",
    name: "Circuit Médina",
    subtitle: "Le cœur de Marrakech",
    duration: "2–4 heures",
    distance: "25 km",
    difficulty: "Facile",
    difficultyColor: "var(--color-atlas)",
    description: "Partez de la place Djemaa el-Fna, longez les remparts de la Médina, passez devant la Koutoubia, traversez le Mellah et revenez par les jardins de la Menara. Le circuit parfait pour votre premier jour.",
    highlights: ["Djemaa el-Fna", "Koutoubia (XIIe siècle)", "Mellah (Quartier Juif)", "Jardins de la Menara", "Remparts de la Médina"],
    tip: "Idéal dès 7h du matin avant la chaleur et la foule.",
    gradient: "linear-gradient(135deg, rgba(45,74,62,0.8) 0%, rgba(28,25,22,0.95) 100%)",
    accentColor: "var(--color-atlas)",
  },
  {
    id: "atlas",
    emoji: "⛰️",
    name: "Col du Tizi n'Tichka",
    subtitle: "Atlas à 2 260 mètres",
    duration: "Journée complète",
    distance: "220 km",
    difficulty: "Avancé",
    difficultyColor: "var(--color-red)",
    description: "La plus belle route du Maroc. Montée progressive depuis Marrakech sur la N9, lacets spectaculaires, panoramas à 360°, villages berbères accrochés aux falaises, ksar d'Aït Benhaddou (UNESCO) à l'aller.",
    highlights: ["N9 Marrakech–Ouarzazate", "Tizi n'Tichka 2 260m", "Village d'Ighrem n'Ougdal", "Aït Benhaddou (UNESCO)", "Forêts de cèdres"],
    tip: "Prévoir des couches chaudes — il fait 10°C de moins au col.",
    gradient: "linear-gradient(135deg, rgba(181,52,28,0.7) 0%, rgba(28,25,22,0.95) 100%)",
    accentColor: "var(--color-red)",
  },
  {
    id: "agafay",
    emoji: "🏜️",
    name: "Désert de l'Agafay",
    subtitle: "30 min de Marrakech",
    duration: "Demi-journée",
    distance: "90 km",
    difficulty: "Modéré",
    difficultyColor: "var(--color-gold)",
    description: "Un désert de roche et de terre ocre à moins de 30 minutes du centre. Paysages lunaires, lumière dorée à l'aube et au coucher du soleil, lac Lalla Takerkoust et les premières crêtes de l'Atlas en toile de fond.",
    highlights: ["Route de Lalla Takerkoust", "Plaines de l'Agafay", "Lac Lalla Takerkoust", "Camps berbères", "Vue 360° sur l'Atlas"],
    tip: "Lever du soleil ou coucher du soleil — la lumière est incomparable.",
    gradient: "linear-gradient(135deg, rgba(201,162,39,0.6) 0%, rgba(28,25,22,0.95) 100%)",
    accentColor: "var(--color-gold)",
  },
  {
    id: "essaouira",
    emoji: "🌊",
    name: "Essaouira la Bleue",
    subtitle: "250 km de côte atlantique",
    duration: "Journée complète",
    distance: "340 km A/R",
    difficulty: "Modéré",
    difficultyColor: "var(--color-gold)",
    description: "La route R207 longe l'arganerie en direction de l'Atlantique. Essaouira, ses remparts du XVIIIe siècle classés UNESCO, ses ruelles bleues et blanches, ses galeries d'artistes, son port de pêche. Retour au coucher de soleil sur la mer.",
    highlights: ["Route de l'arganerie R207", "Remparts d'Essaouira (UNESCO)", "Port de pêche", "Plage de Sidi Kaouki", "Médina d'Essaouira"],
    tip: "Le vent peut être fort — prévoir une veste pour le retour.",
    gradient: "linear-gradient(135deg, rgba(26,58,92,0.8) 0%, rgba(28,25,22,0.95) 100%)",
    accentColor: "#4a9edd",
  },
];

export default function RoutesSection() {
  return (
    <section id="routes" className="section overflow-clip" style={{ background: "var(--color-charcoal)" }}>
      <div className="container">
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="label mb-4" style={{ color: "var(--color-gold)" }}>Itinéraires Curatés · Maroc</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="display-section" style={{ color: "var(--color-cream)" }}>VOS ROUTES<br />VOUS ATTENDENT</h2>
            <p className="body-lg" style={{ color: "var(--color-muted)", maxWidth: "400px" }}>
              Quatre routes iconiques depuis Marrakech. Des médinas aux déserts, des montagnes aux plages — chacune une version différente du Maroc.
            </p>
          </div>
          <span className="gold-line mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {routes.map((route, i) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              style={{
                background: route.gradient,
                borderRadius: "var(--radius-card)",
                border: "1px solid rgba(255,248,237,0.07)",
                padding: "2rem",
                cursor: "pointer",
                transition: "border-color 0.3s ease",
              }}
            >
              <div className="text-4xl mb-4">{route.emoji}</div>

              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="label" style={{ background: "rgba(0,0,0,0.3)", padding: "0.2rem 0.6rem", borderRadius: "999px", color: route.accentColor, border: `1px solid ${route.accentColor}40` }}>
                  {route.difficulty}
                </span>
                <span className="label" style={{ color: "rgba(255,248,237,0.45)" }}>
                  {route.duration} · {route.distance}
                </span>
              </div>

              <h3 className="display-card mb-1" style={{ color: "var(--color-cream)" }}>{route.name}</h3>
              <p className="label mb-4" style={{ color: "rgba(255,248,237,0.55)" }}>{route.subtitle}</p>
              <p className="body-sm mb-5" style={{ color: "rgba(255,248,237,0.75)", lineHeight: 1.75 }}>{route.description}</p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {route.highlights.map((h) => (
                  <span key={h} className="label" style={{ background: "rgba(0,0,0,0.25)", padding: "0.2rem 0.5rem", borderRadius: "4px", color: "rgba(255,248,237,0.55)", fontSize: "0.58rem" }}>{h}</span>
                ))}
              </div>

              {/* Tip */}
              <div className="flex items-start gap-2 p-3 rounded-lg mb-4" style={{ background: "rgba(0,0,0,0.2)", borderLeft: `2px solid ${route.accentColor}` }}>
                <span style={{ color: route.accentColor, fontSize: "0.75rem" }}>💡</span>
                <p className="body-sm" style={{ color: "rgba(255,248,237,0.65)", fontSize: "0.78rem" }}>{route.tip}</p>
              </div>

              <div className="flex items-center gap-2" style={{ color: route.accentColor }}>
                <span className="label">Voir l'itinéraire</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom route CTA */}
        <motion.div
          className="mt-12 p-8 text-center rounded-2xl"
          style={{ background: "rgba(201,162,39,0.06)", border: "1px solid rgba(201,162,39,0.15)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="label mb-3" style={{ color: "var(--color-gold)" }}>Itinéraire Personnalisé</p>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-cream)", marginBottom: "0.75rem" }}>
            Un circuit sur mesure ?
          </h3>
          <p className="body-sm mb-6" style={{ color: "var(--color-muted)", maxWidth: "480px", margin: "0 auto 1.5rem" }}>
            Notre équipe connaît chaque route du Maroc. Dites-nous vos dates, votre niveau et vos envies — on crée votre aventure.
          </p>
          <a href="https://wa.me/212661234567?text=Bonjour, je souhaite créer un itinéraire personnalisé depuis Marrakech" target="_blank" rel="noopener noreferrer" className="btn btn-gold">
            Créer mon itinéraire
          </a>
        </motion.div>
      </div>
    </section>
  );
}
