"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sophie & Marc L.",
    country: "France 🇫🇷",
    city: "Paris",
    rating: 5,
    date: "Avril 2025",
    bike: "Royal Enfield Himalayan",
    route: "Tizi n'Tichka",
    text: "On a fait le col du Tizi n'Tichka sur l'Himalayan — 2 260 mètres de lacets avec les Atlas en fond, c'était irréel. La moto était impeccable, GPS chargé, et l'équipe a répondu en 5 minutes quand on a eu une question. À refaire !",
  },
  {
    name: "Jake M.",
    country: "Australie 🇦🇺",
    city: "Sydney",
    rating: 5,
    date: "Mars 2025",
    bike: "BMW F 750 GS",
    route: "Marrakech → Essaouira",
    text: "Rented the BMW for 3 days, Marrakech to Essaouira via the argan road. The bike was spotless, insurance was real (had a minor drop on gravel, they handled everything), and the team was on WhatsApp the entire time. World class service.",
  },
  {
    name: "Carlos & Elena V.",
    country: "Espagne 🇪🇸",
    city: "Barcelone",
    rating: 5,
    date: "Février 2025",
    bike: "Yamaha NMAX",
    route: "Circuit Médina",
    text: "Era nuestro primer viaje en moto y el equipo fue increíblemente paciente. Nos explicaron todas las rutas, nos entregaron la moto en nuestro riad en la Medina y el casco encajó perfecto. ¡Volvemos en junio para el Atlas!",
  },
  {
    name: "Priya S.",
    country: "Royaume-Uni 🇬🇧",
    city: "Londres",
    rating: 5,
    date: "Novembre 2024",
    bike: "Royal Enfield Himalayan",
    route: "Désert Agafay",
    text: "The Agafay desert at sunrise on the Himalayan was the single best experience of my Morocco trip. Zero traffic, just rocks and light. FreedomRide had the GPS loaded with the exact track — I never had to look at my phone.",
  },
  {
    name: "Mathis D.",
    country: "Belgique 🇧🇪",
    city: "Bruxelles",
    rating: 5,
    date: "Janvier 2025",
    bike: "BMW F 750 GS",
    route: "Semaine complète",
    text: "Le forfait semaine est exceptionnel. 7 jours, BMW GS, assurance tous risques, GPS, livraison à La Mamounia — tout inclus. J'ai fait Marrakech, Agafay, Atlas et Ouarzazate. Rapport qualité/prix imbattable.",
  },
  {
    name: "Yuki T.",
    country: "Japon 🇯🇵",
    city: "Tokyo",
    rating: 5,
    date: "Décembre 2024",
    bike: "Yamaha NMAX",
    route: "Palmeraie & Jardins",
    text: "Très bonne expérience ! Staff spoke French and English, delivery was on time to my hotel in Gueliz, and the scooter was perfect for the Palmeraie circuit. The city map they gave me had hidden gems I would never have found alone.",
  },
];

export default function TestimonialsSection() {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="section overflow-clip" style={{ background: "var(--color-night)" }}>
      <div className="container">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="label mb-4" style={{ color: "var(--color-gold)" }}>Témoignages Vérifiés</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="display-section" style={{ color: "var(--color-cream)" }}>ILS EN PARLENT</h2>
            <div>
              <div className="flex items-baseline gap-2">
                <span style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 800, color: "var(--color-gold)", lineHeight: 1 }}>4.9</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--color-muted)" }}>/5</span>
              </div>
              <div className="flex gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="var(--color-gold)">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <p className="body-sm mt-1" style={{ color: "var(--color-muted)" }}>Basé sur 200+ avis Google</p>
            </div>
          </div>
          <span className="gold-line mt-6" />
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden" style={{ padding: "0.5rem 0" }}>
        <div className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none" style={{ width: "8%", background: "linear-gradient(to right, var(--color-night), transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none" style={{ width: "8%", background: "linear-gradient(to left, var(--color-night), transparent)" }} />

        <div className="marquee-track">
          {doubled.map((t, i) => (
            <div key={i} className="card-dark flex flex-col gap-4 flex-shrink-0"
              style={{ width: "360px", padding: "1.75rem", marginRight: "1.25rem" }}>
              {/* Stars + bike */}
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, j) => (
                    <svg key={j} width="13" height="13" viewBox="0 0 24 24" fill="var(--color-gold)">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <span className="label" style={{ color: "var(--color-gold)", background: "rgba(201,162,39,0.1)", padding: "0.15rem 0.5rem", borderRadius: "4px", fontSize: "0.58rem" }}>
                  {t.bike}
                </span>
              </div>

              {/* Route badge */}
              <div className="flex items-center gap-2">
                <span style={{ fontSize: "0.7rem" }}>🗺️</span>
                <span className="label" style={{ color: "var(--color-muted)", fontSize: "0.6rem" }}>{t.route}</span>
              </div>

              <p className="body-sm flex-1" style={{ color: "var(--color-cream)", lineHeight: 1.75 }}>
                &ldquo;{t.text}&rdquo;
              </p>

              <div style={{ borderTop: "1px solid rgba(255,248,237,0.07)", paddingTop: "1rem" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", fontWeight: 700, color: "var(--color-cream)" }}>{t.name}</p>
                <p className="body-sm" style={{ color: "var(--color-muted)", marginTop: "0.15rem" }}>
                  {t.country} · {t.city} · {t.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Google CTA */}
      <div className="container">
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a href="https://g.page/r/freedomride-marrakech/review" target="_blank" rel="noopener noreferrer"
            className="btn btn-outline" style={{ display: "inline-flex" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Laisser un avis Google
          </a>
        </motion.div>
      </div>
    </section>
  );
}
