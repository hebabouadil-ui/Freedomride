"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function BookingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Char-by-char reveal on heading
      const heading = sectionRef.current?.querySelector(".booking-heading");
      if (heading) {
        const text = heading.textContent || "";
        heading.innerHTML = text
          .split("")
          .map((char) =>
            char === " "
              ? `<span style="display:inline-block">&nbsp;</span>`
              : `<span style="display:inline-block;opacity:0;transform:translateY(40px)">${char}</span>`
          )
          .join("");

        gsap.to(heading.querySelectorAll("span"), {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.035,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });
      }

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: textRef.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 80%" },
        }
      );
    },
    { scope: sectionRef }
  );

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
          background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,162,39,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Label */}
          <p className="label mb-8" style={{ color: "var(--color-gold)" }}>
            Instant Reservation
          </p>

          {/* Headline */}
          <h2
            className="booking-heading display-section mb-6"
            style={{ color: "var(--color-cream)" }}
          >
            READY TO EXPLORE?
          </h2>

          <div ref={textRef}>
            <p className="body-lg mb-12" style={{ color: "var(--color-muted)" }}>
              Reserve your bike in under 2 minutes.<br />
              We confirm within the hour.
            </p>
          </div>
        </div>

        {/* Booking form */}
        <div
          ref={formRef}
          className="max-w-2xl mx-auto"
          style={{
            background: "var(--color-charcoal)",
            borderRadius: "var(--radius-card)",
            border: "1px solid rgba(255,248,237,0.08)",
            padding: "2.5rem",
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const wa = `https://wa.me/212600000000?text=Hi! I'd like to book a motorcycle rental.`;
              window.open(wa, "_blank");
            }}
          >
            <div className="grid md:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", letterSpacing: "0.05em", color: "var(--color-muted)", display: "block", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Sophie Laurent"
                  required
                  style={{
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
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--color-gold)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,248,237,0.1)")}
                />
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", letterSpacing: "0.05em", color: "var(--color-muted)", display: "block", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                  WhatsApp / Phone
                </label>
                <input
                  type="tel"
                  placeholder="+33 6 00 00 00 00"
                  required
                  style={{
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
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--color-gold)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,248,237,0.1)")}
                />
              </div>

              {/* Pickup date */}
              <div>
                <label style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", letterSpacing: "0.05em", color: "var(--color-muted)", display: "block", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                  Pickup Date
                </label>
                <input
                  type="date"
                  required
                  style={{
                    width: "100%",
                    background: "var(--color-brown)",
                    border: "1px solid rgba(255,248,237,0.1)",
                    borderRadius: "8px",
                    padding: "0.75rem 1rem",
                    color: "var(--color-cream)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    outline: "none",
                    colorScheme: "dark",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--color-gold)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,248,237,0.1)")}
                />
              </div>

              {/* Return date */}
              <div>
                <label style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", letterSpacing: "0.05em", color: "var(--color-muted)", display: "block", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                  Return Date
                </label>
                <input
                  type="date"
                  required
                  style={{
                    width: "100%",
                    background: "var(--color-brown)",
                    border: "1px solid rgba(255,248,237,0.1)",
                    borderRadius: "8px",
                    padding: "0.75rem 1rem",
                    color: "var(--color-cream)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    outline: "none",
                    colorScheme: "dark",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--color-gold)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,248,237,0.1)")}
                />
              </div>

              {/* Bike type */}
              <div>
                <label style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", letterSpacing: "0.05em", color: "var(--color-muted)", display: "block", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                  Bike Type
                </label>
                <select
                  style={{
                    width: "100%",
                    background: "var(--color-brown)",
                    border: "1px solid rgba(255,248,237,0.1)",
                    borderRadius: "8px",
                    padding: "0.75rem 1rem",
                    color: "var(--color-cream)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="scooter">City Scooter — 200 MAD/day</option>
                  <option value="enduro">Adventure Enduro — 450 MAD/day</option>
                  <option value="touring">Touring BMW — 700 MAD/day</option>
                </select>
              </div>

              {/* Delivery */}
              <div>
                <label style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", letterSpacing: "0.05em", color: "var(--color-muted)", display: "block", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                  Hotel / Riad Address
                </label>
                <input
                  type="text"
                  placeholder="Riad Yasmine, Medina..."
                  style={{
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
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--color-gold)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,248,237,0.1)")}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button type="submit" className="btn btn-gold" style={{ flex: 1, justifyContent: "center" }}>
                Book Now — Instant Confirmation
              </button>
              <a
                href="https://wa.me/212600000000?text=Hi, I'd like to enquire about a motorcycle rental in Marrakech"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ flex: "0 0 auto" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>

            <p className="body-sm text-center mt-5" style={{ color: "var(--color-muted)" }}>
              No payment required now · We&apos;ll confirm via WhatsApp within 1 hour
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
