"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const navLinks = [
  { label: "La Flotte", href: "#fleet" },
  { label: "Itinéraires", href: "#routes" },
  { label: "Tarifs", href: "#pricing" },
  { label: "Pourquoi Nous", href: "#why-us" },
  { label: "Témoignages", href: "#testimonials" },
  { label: "Réserver", href: "#booking" },
];

const contact = [
  { label: "+212 661 234 567", href: "tel:+212661234567" },
  { label: "hello@menararide.ma", href: "mailto:hello@menararide.ma" },
  { label: "WhatsApp Nous", href: "https://wa.me/212661234567" },
  { label: "45 Rue Bab Doukkala, Marrakech", href: "#" },
];

const legal = [
  { label: "Politique de confidentialité", href: "#" },
  { label: "Conditions générales", href: "#" },
  { label: "Contrat de location", href: "#" },
  { label: "Assurance & couverture", href: "#" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-charcoal)",
        borderTop: "1px solid rgba(255,248,237,0.06)",
      }}
    >
      {/* CTA banner */}
      <motion.div
        style={{ background: "var(--color-gold)", padding: "1.25rem 0" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "var(--color-night)",
              textTransform: "uppercase",
            }}
          >
            Livraison hôtel · Assurance incluse · Prêt en 1 heure
          </p>
          <a
            href="https://wa.me/212661234567?text=Bonjour%20MenaraRide%20%F0%9F%8F%8D%EF%B8%8F%20Je%20souhaite%20r%C3%A9server%20une%20moto."
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
              background: "var(--color-night)",
              color: "var(--color-cream)",
              border: "none",
              padding: "0.625rem 1.5rem",
              whiteSpace: "nowrap",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Réserver via WhatsApp
          </a>
        </div>
      </motion.div>

      {/* Main */}
      <div className="container" style={{ padding: "4rem 0 2rem" }}>
        <motion.div
          className="grid gap-10 mb-12"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-cream)",
                textDecoration: "none",
                display: "block",
                marginBottom: "1rem",
              }}
            >
              Menara<span style={{ color: "var(--color-gold)" }}>Ride</span>
            </Link>
            <p className="body-sm" style={{ color: "var(--color-muted)", maxWidth: "220px" }}>
              Location de motos premium à Marrakech. Explorez le Maroc à votre rythme — sur deux roues.
            </p>
            <a
              href="https://wa.me/212661234567"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{ marginTop: "1.5rem", display: "inline-flex" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat WhatsApp
            </a>
          </div>

          {/* Navigation */}
          <div>
            <p className="label mb-5" style={{ color: "var(--color-gold)" }}>Navigation</p>
            <ul className="list-none flex flex-col gap-3">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="body-sm"
                    style={{ color: "var(--color-muted)", textDecoration: "none", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-cream)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="label mb-5" style={{ color: "var(--color-gold)" }}>Contact</p>
            <ul className="list-none flex flex-col gap-3">
              {contact.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    className="body-sm"
                    style={{ color: "var(--color-muted)", textDecoration: "none", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-cream)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="label mb-5" style={{ color: "var(--color-gold)" }}>Légal</p>
            <ul className="list-none flex flex-col gap-3">
              {legal.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="body-sm"
                    style={{ color: "var(--color-muted)", textDecoration: "none", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-cream)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Map */}
        <motion.div
          style={{
            borderRadius: "var(--radius-card)",
            overflow: "hidden",
            border: "1px solid rgba(255,248,237,0.08)",
            height: "200px",
            marginBottom: "2.5rem",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.5!2d-7.9897!3d31.6258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8b4e7a0401%3A0x1c8f50ece01af2a8!2sMarrakech!5e0!3m2!1sfr!2sma!4v1620000000000!5m2!1sfr!2sma"
            width="100%"
            height="200"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="MenaraRide Marrakech"
          />
        </motion.div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,248,237,0.06)", paddingTop: "1.5rem" }}
        >
          <p className="body-sm" style={{ color: "var(--color-muted)" }}>
            © {new Date().getFullYear()} MenaraRide · Tous droits réservés · Marrakech, Maroc
          </p>
          <p className="body-sm" style={{ color: "var(--color-muted)" }}>
            Fait avec passion pour la route ouverte
          </p>
        </div>
      </div>
    </footer>
  );
}
