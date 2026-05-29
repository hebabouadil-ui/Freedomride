"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";

const links = [
  { label: "Motos", href: "#fleet" },
  { label: "Tarifs", href: "#pricing" },
  { label: "Pourquoi Nous", href: "#why-us" },
  { label: "Avis", href: "#testimonials" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.to(navRef.current, {
      backgroundColor: scrolled ? "rgba(15,13,11,0.95)" : "rgba(15,13,11,0)",
      backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
      duration: 0.5,
      ease: "power2.out",
    });
  }, [scrolled]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div id="scroll-progress" />
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all"
        style={{ borderBottom: scrolled ? "1px solid rgba(255,248,237,0.06)" : "none" }}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1rem",
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-cream)",
              textDecoration: "none",
            }}
          >
            Menara<span style={{ color: "var(--color-gold)" }}>Ride</span>
          </Link>

          <ul className="hidden md:flex items-center gap-8 list-none">
            {links.map((l) => (
              <li key={l.label}>
                <button
                  onClick={() => handleNavClick(l.href)}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--color-muted)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-cream)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavClick("#booking")}
              className="btn btn-gold"
              style={{ padding: "0.625rem 1.25rem", fontSize: "0.7rem" }}
            >
              Réserver
            </button>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "22px",
                  height: "1.5px",
                  background: "var(--color-cream)",
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                  transform:
                    menuOpen && i === 0
                      ? "translateY(5px) rotate(45deg)"
                      : menuOpen && i === 2
                      ? "translateY(-5px) rotate(-45deg)"
                      : menuOpen && i === 1
                      ? "scaleX(0)"
                      : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                  transformOrigin: "center",
                }}
              />
            ))}
          </button>
        </div>

        {menuOpen && (
          <div
            style={{
              background: "rgba(15,13,11,0.98)",
              backdropFilter: "blur(20px)",
              padding: "1.5rem",
              borderTop: "1px solid rgba(255,248,237,0.06)",
            }}
          >
            <ul className="list-none flex flex-col gap-4">
              {links.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => handleNavClick(l.href)}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "1rem",
                      color: "var(--color-cream)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNavClick("#booking")}
                  className="btn btn-gold"
                  style={{ width: "100%", marginTop: "0.5rem" }}
                >
                  Réserver
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
