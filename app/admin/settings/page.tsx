"use client";

import { useState } from "react";
import { defaultSettings, type SiteSettings } from "@/lib/store";

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputStyle = {
    width: "100%",
    background: "var(--color-brown)",
    border: "1px solid rgba(255,248,237,0.1)",
    borderRadius: "8px",
    padding: "0.65rem 0.875rem",
    color: "var(--color-cream)",
    fontFamily: "var(--font-body)",
    fontSize: "0.875rem",
    outline: "none",
  };

  const labelStyle = {
    fontFamily: "var(--font-body)",
    fontSize: "0.7rem",
    letterSpacing: "0.05em",
    textTransform: "uppercase" as const,
    color: "var(--color-muted)",
    display: "block",
    marginBottom: "0.375rem",
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="admin-card mb-6">
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 700, color: "var(--color-cream)", marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
        {title}
      </h2>
      {children}
    </div>
  );

  return (
    <div style={{ padding: "2.5rem" }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--color-cream)" }}>
            Site Settings
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-muted)", marginTop: "0.25rem" }}>
            Global configuration for MenaraRide
          </p>
        </div>
        <button
          onClick={handleSave}
          className="btn btn-gold"
          style={{ padding: "0.625rem 1.25rem" }}
        >
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>

      <Section title="Brand & Contact">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>Brand Name</label>
            <input style={inputStyle} value={settings.brandName} onChange={(e) => setSettings({ ...settings, brandName: e.target.value })} />
          </div>
          <div>
            <label style={labelStyle}>WhatsApp Number</label>
            <input style={inputStyle} value={settings.whatsappNumber} onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })} placeholder="212600000000" />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input style={inputStyle} type="email" value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} />
          </div>
          <div>
            <label style={labelStyle}>Physical Address</label>
            <input style={inputStyle} value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} />
          </div>
        </div>
      </Section>

      <Section title="Hero Section">
        <div className="grid gap-4">
          <div>
            <label style={labelStyle}>Hero Headline</label>
            <input style={inputStyle} value={settings.heroHeadline} onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })} placeholder="RIDE FREE." />
          </div>
          <div>
            <label style={labelStyle}>Hero Subtitle</label>
            <textarea
              style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
              value={settings.heroSubtitle}
              onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
            />
          </div>
          <div>
            <label style={labelStyle}>Hero Background Image URL</label>
            <input style={inputStyle} value={settings.heroImage} onChange={(e) => setSettings({ ...settings, heroImage: e.target.value })} placeholder="https://images.unsplash.com/..." />
          </div>
          {settings.heroImage && (
            <div style={{ borderRadius: "8px", overflow: "hidden", height: "160px", position: "relative" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={settings.heroImage} alt="Hero preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent, rgba(15,13,11,0.7))", display: "flex", alignItems: "flex-end", padding: "0.75rem" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "0.8rem", color: "var(--color-cream)", letterSpacing: "0.1em" }}>
                  PREVIEW
                </span>
              </div>
            </div>
          )}
        </div>
      </Section>

      <Section title="Google Maps">
        <div>
          <label style={labelStyle}>Google Maps Embed URL</label>
          <input
            style={inputStyle}
            value={settings.googleMapsUrl}
            onChange={(e) => setSettings({ ...settings, googleMapsUrl: e.target.value })}
            placeholder="https://www.google.com/maps/embed?pb=..."
          />
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--color-muted)", marginTop: "0.5rem" }}>
            Go to Google Maps → Share → Embed a map → Copy the src URL
          </p>
        </div>
      </Section>

      {/* Save button bottom */}
      <div className="flex justify-end">
        <button onClick={handleSave} className="btn btn-gold" style={{ padding: "0.75rem 2rem" }}>
          {saved ? "✓ Changes Saved!" : "Save All Settings"}
        </button>
      </div>
    </div>
  );
}
