"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const bikeOptions = [
  { value: "scooter", label: "Scooter Yamaha NMAX — 200 MAD/jour" },
  { value: "enduro", label: "Enduro Royal Enfield Himalayan — 450 MAD/jour" },
  { value: "touring", label: "Touring BMW F 750 GS — 700 MAD/jour" },
];

const InputField = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <label
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "0.7rem",
        letterSpacing: "0.08em",
        color: "var(--color-muted)",
        display: "block",
        marginBottom: "0.5rem",
        textTransform: "uppercase",
      }}
    >
      {label}
    </label>
    {children}
  </div>
);

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--color-brown)",
  border: "1px solid rgba(255,248,237,0.1)",
  borderRadius: "8px",
  padding: "0.75rem 1rem",
  color: "var(--color-cream)",
  fontFamily: "var(--font-body)",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.2s ease",
};

export default function BookingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dateDepart: "",
    dateRetour: "",
    moto: "enduro",
    adresse: "",
  });

  useGSAP(
    () => {
      const heading = sectionRef.current?.querySelector(".booking-heading");
      if (!heading) return;
      const split = new SplitText(heading, { type: "chars,words" });
      gsap.from(split.chars, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.03,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
      return () => split.revert();
    },
    { scope: sectionRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Bonjour MenaraRide 🏍️\n\nJe souhaite réserver une moto :\n\n• Nom : ${formData.name}\n• Téléphone : ${formData.phone}\n• Moto : ${bikeOptions.find((b) => b.value === formData.moto)?.label}\n• Date de départ : ${formData.dateDepart}\n• Date de retour : ${formData.dateRetour}\n• Adresse de livraison : ${formData.adresse || "À confirmer"}\n\nMerci !`
    );
    window.open(`https://wa.me/212661234567?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="section grain relative overflow-clip"
      style={{
        background: "var(--color-night)",
        borderTop: "1px solid rgba(255,248,237,0.06)",
      }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,162,39,0.09) 0%, transparent 70%)",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-14"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="label mb-4" style={{ color: "var(--color-gold)" }}>
            Réservation Instantanée
          </p>
          <h2
            className="booking-heading display-section mb-6"
            style={{ color: "var(--color-cream)" }}
          >
            PRÊT À EXPLORER ?
          </h2>
          <p className="body-lg" style={{ color: "var(--color-muted)" }}>
            Réservez votre moto en moins de 2 minutes.
            <br />
            Confirmation par WhatsApp sous 1 heure.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "var(--color-charcoal)",
            borderRadius: "var(--radius-card)",
            border: "1px solid rgba(255,248,237,0.08)",
            padding: "2.5rem",
          }}
        >
          {submitted ? (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏍️</div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "var(--color-gold)",
                  marginBottom: "0.75rem",
                }}
              >
                Demande envoyée !
              </h3>
              <p className="body-sm" style={{ color: "var(--color-muted)" }}>
                Notre équipe vous confirme la disponibilité sur WhatsApp sous
                1 heure. À très vite sur les routes du Maroc !
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn btn-outline"
                style={{ marginTop: "1.5rem", display: "inline-flex" }}
              >
                Nouvelle réservation
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-5">
                <InputField label="Prénom & Nom">
                  <input
                    type="text"
                    placeholder="Sophie Laurent"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    style={inputStyle}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--color-gold)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,248,237,0.1)")
                    }
                  />
                </InputField>

                <InputField label="WhatsApp / Téléphone">
                  <input
                    type="tel"
                    placeholder="+33 6 00 00 00 00"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, phone: e.target.value }))
                    }
                    style={inputStyle}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--color-gold)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,248,237,0.1)")
                    }
                  />
                </InputField>

                <InputField label="Date de départ">
                  <input
                    type="date"
                    required
                    value={formData.dateDepart}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, dateDepart: e.target.value }))
                    }
                    style={{ ...inputStyle, colorScheme: "dark" }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--color-gold)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,248,237,0.1)")
                    }
                  />
                </InputField>

                <InputField label="Date de retour">
                  <input
                    type="date"
                    required
                    value={formData.dateRetour}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, dateRetour: e.target.value }))
                    }
                    style={{ ...inputStyle, colorScheme: "dark" }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--color-gold)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,248,237,0.1)")
                    }
                  />
                </InputField>

                <InputField label="Moto choisie">
                  <select
                    value={formData.moto}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, moto: e.target.value }))
                    }
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    {bikeOptions.map((b) => (
                      <option key={b.value} value={b.value}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                </InputField>

                <InputField label="Riad / Hôtel (livraison)">
                  <input
                    type="text"
                    placeholder="Riad Yasmine, Médina…"
                    value={formData.adresse}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, adresse: e.target.value }))
                    }
                    style={inputStyle}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--color-gold)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,248,237,0.1)")
                    }
                  />
                </InputField>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <motion.button
                  type="submit"
                  className="btn btn-gold"
                  style={{ flex: 1, justifyContent: "center" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Réserver — Confirmation Immédiate
                </motion.button>
                <motion.a
                  href="https://wa.me/212661234567?text=Bonjour%20MenaraRide%2C%20je%20voudrais%20des%20informations%20sur%20la%20location%20de%20moto%20%C3%A0%20Marrakech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ flex: "0 0 auto" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </motion.a>
              </div>

              <p className="body-sm text-center mt-5" style={{ color: "var(--color-muted)" }}>
                Aucun paiement maintenant · Confirmation WhatsApp sous 1h · Dépôt 500 MAD à la livraison
              </p>
            </form>
          )}
        </motion.div>

        {/* Trust row */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {[
            { icon: "🛡️", text: "Assurance tous risques" },
            { icon: "🏨", text: "Livraison riad / hôtel" },
            { icon: "💬", text: "Support WhatsApp 24h/24" },
            { icon: "✅", text: "Sans permis moto (125cc)" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <span style={{ fontSize: "1rem" }}>{item.icon}</span>
              <span className="body-sm" style={{ color: "var(--color-muted)" }}>
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
