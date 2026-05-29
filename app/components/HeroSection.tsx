"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const slides = [
  {
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=90",
    label: "Atlas Mountains · 2,260m",
    headline: ["RIDE", "FREE."],
    sub: "From Marrakech to the peaks of the Atlas. Your adventure starts here.",
  },
  {
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1920&q=90",
    label: "Agafay Desert · 30 min from Marrakech",
    headline: ["EXPLORE", "BEYOND."],
    sub: "Stone desert, golden silence, zero traffic. The most cinematic road in Morocco.",
  },
  {
    image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=1920&q=90",
    label: "Essaouira Coast · Atlantic Ocean",
    headline: ["CHASE", "HORIZONS."],
    sub: "250km of coastal road, blue ramparts, and Atlantic wind at your back.",
  },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  // Auto-rotate slides
  useEffect(() => {
    const t = setInterval(() => {
      setPrev(slide);
      setSlide((s) => (s + 1) % slides.length);
    }, 6000);
    return () => clearInterval(t);
  }, [slide]);

  useGSAP(() => {
    gsap.to(imgRef.current, {
      scale: 1.12,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 2,
      },
    });

    // SplitText entrance on initial load
    if (headlineRef.current) {
      const split = new SplitText(headlineRef.current, { type: "chars,words" });
      gsap.from(split.chars, {
        opacity: 0,
        y: 80,
        rotationX: -45,
        stagger: 0.04,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.3,
      });
      return () => split.revert();
    }
  }, { scope: heroRef });

  const current = slides[slide];

  return (
    <section ref={heroRef} id="hero" className="relative overflow-hidden" style={{ height: "100svh", minHeight: "640px" }}>
      {/* Slideshow bg */}
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <AnimatePresence>
          <motion.div
            key={slide}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            <Image
              src={current.image}
              alt={current.label}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlays */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,13,11,0.2) 0%, rgba(15,13,11,0.55) 55%, rgba(15,13,11,0.92) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 50%, transparent 30%, rgba(15,13,11,0.5) 100%)" }} />
      </div>

      {/* Slide progress bars */}
      <div className="absolute top-0 left-0 right-0 z-20 flex gap-1" style={{ padding: "80px 4% 0" }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => { setPrev(slide); setSlide(i); }} className="relative flex-1 h-0.5 overflow-hidden" style={{ background: "rgba(255,248,237,0.2)" }}>
            {i === slide && (
              <motion.div
                className="absolute inset-y-0 left-0"
                style={{ background: "var(--color-gold)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 6, ease: "linear" }}
                key={slide}
              />
            )}
            {i < slide && <div className="absolute inset-0" style={{ background: "var(--color-gold)" }} />}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="container relative z-10 h-full flex flex-col justify-end pb-12 md:pb-20">
        {/* Location label */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`label-${slide}`}
            className="label mb-5"
            style={{ color: "var(--color-gold)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <span style={{ display: "inline-block", width: "20px", height: "1px", background: "var(--color-gold)", verticalAlign: "middle", marginRight: "10px" }} />
            {current.label}
          </motion.p>
        </AnimatePresence>

        {/* Headline */}
        <AnimatePresence mode="wait">
          <motion.div key={`headline-${slide}`} ref={slide === 0 ? headlineRef : undefined}>
            {current.headline.map((word, i) => (
              <motion.h1
                key={i}
                className="display-hero block"
                style={{ color: "var(--color-cream)", lineHeight: 0.88 }}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.h1>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Sub */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`sub-${slide}`}
            className="body-lg mt-5"
            style={{ color: "var(--color-muted)", maxWidth: "500px" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            {current.sub}
          </motion.p>
        </AnimatePresence>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a href="#booking" className="btn btn-gold">
            Réserver Maintenant
          </a>
          <a href="https://wa.me/212661234567?text=Bonjour, je souhaite louer une moto à Marrakech" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp +212 661 234 567
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="mt-10 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            style={{ width: "1px", height: "40px", background: "var(--color-gold)" }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="label" style={{ color: "var(--color-muted)" }}>Défiler</span>
        </motion.div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10" style={{ background: "rgba(15,13,11,0.8)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,248,237,0.06)" }}>
        <div className="container hidden md:grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { value: 50, suffix: "+", label: "Motos disponibles" },
            { value: 4, suffix: " destinations", label: "Atlas · Agafay · Essaouira · Médina" },
            { value: 4, suffix: ".9 ★", label: "Note moyenne Google" },
            { value: 2, suffix: "min", label: "Confirmation de réservation" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col justify-center py-4 px-6"
              style={{ borderRight: i < 3 ? "1px solid rgba(255,248,237,0.07)" : "none" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 800, color: "var(--color-gold)", lineHeight: 1 }}>
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </span>
              <span className="label mt-1" style={{ color: "var(--color-muted)", fontSize: "0.6rem" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
