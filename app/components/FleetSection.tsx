"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const bikes = [
  {
    id: "scooter",
    category: "Scooter Urbain",
    name: "Yamaha NMAX 155",
    tagline: "La liberté dans la Médina",
    engine: "155cc",
    range: "250 km",
    terrain: "Médina · Gueliz · Palmeraie",
    priceMAD: 200,
    priceEUR: 18,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85",
    badge: "Le + populaire",
    badgeColor: "var(--color-gold)",
    specs: [
      { label: "Moteur", value: "155cc" },
      { label: "Autonomie", value: "250 km" },
      { label: "Vitesse max", value: "110 km/h" },
      { label: "Permis", value: "Non requis" },
    ],
    accentColor: "var(--color-gold)",
    gradient: "linear-gradient(135deg, #2a2218 0%, #1C1916 100%)",
    description: "Parfait pour explorer la Médina, le souk et les jardins. Léger, maniable, économique. Aucun permis moto nécessaire — votre permis voiture suffit.",
  },
  {
    id: "enduro",
    category: "Enduro Aventure",
    name: "Royal Enfield Himalayan 411",
    tagline: "Né pour les montagnes de l'Atlas",
    engine: "411cc",
    range: "450 km",
    terrain: "Atlas · Agafay · Ourika",
    priceMAD: 450,
    priceEUR: 40,
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=85",
    badge: "Coup de cœur aventure",
    badgeColor: "var(--color-red)",
    specs: [
      { label: "Moteur", value: "411cc" },
      { label: "Autonomie", value: "450 km" },
      { label: "Garde au sol", value: "220 mm" },
      { label: "Terrain", value: "Off-road" },
    ],
    accentColor: "var(--color-red)",
    gradient: "linear-gradient(135deg, #2a1a18 0%, #1C1916 100%)",
    description: "La monture idéale pour le col du Tizi n'Tichka (2 260 m), la vallée de l'Ourika et les pistes de l'Agafay. Suspension longue course, réservoir 15L.",
  },
  {
    id: "touring",
    category: "Grand Tourisme",
    name: "BMW F 750 GS",
    tagline: "Essaouira, Ouarzazate et au-delà",
    engine: "853cc",
    range: "600 km",
    terrain: "Côte · Nationale · Désert",
    priceMAD: 700,
    priceEUR: 62,
    image: "https://images.unsplash.com/photo-1558618047-f89ef8b85f24?w=800&q=85",
    badge: "Premium",
    badgeColor: "var(--color-atlas)",
    specs: [
      { label: "Moteur", value: "853cc bi" },
      { label: "Autonomie", value: "600 km" },
      { label: "Puissance", value: "77 ch" },
      { label: "Permis", value: "Catégorie A" },
    ],
    accentColor: "var(--color-atlas)",
    gradient: "linear-gradient(135deg, #181e1c 0%, #1C1916 100%)",
    description: "Pour les longs trajets Marrakech–Essaouira, Marrakech–Ouarzazate. Confort touring, navigation GPS intégré, valises disponibles en option.",
  },
];

function BikeCard({ bike, index }: { bike: typeof bikes[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2));
    y.set((e.clientY - rect.top - rect.height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d", perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="fleet-card flex flex-col overflow-hidden h-full"
        style={{
          background: bike.gradient,
          borderRadius: "var(--radius-card)",
          border: `1px solid ${hovered ? bike.accentColor : "rgba(255,248,237,0.07)"}`,
          transition: "border-color 0.3s ease",
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: "240px" }}>
          <motion.div className="absolute inset-0" animate={{ scale: hovered ? 1.06 : 1 }} transition={{ duration: 0.6 }}>
            <Image src={bike.image} alt={bike.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          </motion.div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(28,25,22,0.95) 100%)" }} />

          {/* Badge */}
          <div className="absolute top-4 left-4">
            <span className="label" style={{ background: `${bike.accentColor}22`, color: bike.accentColor, border: `1px solid ${bike.accentColor}44`, padding: "0.25rem 0.75rem", borderRadius: "999px" }}>
              {bike.badge}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6 gap-4">
          <div style={{ width: "2rem", height: "2px", background: bike.accentColor }} />
          <p className="label" style={{ color: bike.accentColor }}>{bike.category}</p>
          <h3 className="display-card" style={{ color: "var(--color-cream)" }}>{bike.name}</h3>
          <p className="body-sm" style={{ color: "var(--color-muted)" }}>{bike.description}</p>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-3 mt-1" style={{ borderTop: "1px solid rgba(255,248,237,0.07)", paddingTop: "1rem" }}>
            {bike.specs.map((s) => (
              <div key={s.label}>
                <p className="label mb-0.5" style={{ color: "var(--color-muted)", fontSize: "0.58rem" }}>{s.label}</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", color: "var(--color-cream)", fontWeight: 600 }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Terrain tags */}
          <div className="flex flex-wrap gap-1.5">
            {bike.terrain.split(" · ").map((t) => (
              <span key={t} className="label" style={{ background: "rgba(255,248,237,0.05)", padding: "0.2rem 0.5rem", borderRadius: "4px", color: "var(--color-muted)", fontSize: "0.58rem" }}>{t}</span>
            ))}
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: "1px solid rgba(255,248,237,0.07)" }}>
            <div>
              <p className="label mb-0.5" style={{ color: "var(--color-muted)", fontSize: "0.58rem" }}>À partir de / jour</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 800, color: bike.accentColor, lineHeight: 1 }}>
                {bike.priceMAD} MAD <span style={{ fontSize: "0.75rem", color: "var(--color-muted)", fontWeight: 400 }}>/ €{bike.priceEUR}</span>
              </p>
            </div>
            <motion.a href="#booking" className="btn" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{ background: "transparent", border: `1.5px solid ${bike.accentColor}`, color: bike.accentColor, padding: "0.5rem 1.25rem", fontSize: "0.65rem" }}>
              Réserver
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FleetSection() {
  return (
    <section id="fleet" className="section overflow-clip">
      <div className="container">
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="label mb-4" style={{ color: "var(--color-gold)" }}>Notre Flotte · Marrakech</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="display-section" style={{ color: "var(--color-cream)" }}>LA FLOTTE</h2>
            <p className="body-lg" style={{ color: "var(--color-muted)", maxWidth: "400px" }}>
              Chaque moto est révisée, assurée et prête à partir. Livraison à votre riad ou hôtel incluse.
            </p>
          </div>
          <span className="gold-line mt-6" />
        </motion.div>

        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          {bikes.map((bike, i) => <BikeCard key={bike.id} bike={bike} index={i} />)}
        </div>

        {/* Bottom note */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {["Casque ECE inclus", "Contrôle technique à jour", "Livraison Médina gratuite", "Assistance 24h/24"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span className="body-sm" style={{ color: "var(--color-muted)" }}>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
