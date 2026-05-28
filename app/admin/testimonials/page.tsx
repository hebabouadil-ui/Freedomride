"use client";

import { useState } from "react";
import { defaultTestimonials, type Testimonial } from "@/lib/store";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Testimonial>({
    id: "",
    name: "",
    country: "",
    rating: 5,
    text: "",
    date: "",
    approved: false,
  });

  const handleSave = () => {
    const newT = { ...form, id: `t-${Date.now()}` };
    setTestimonials([...testimonials, newT]);
    setShowForm(false);
    setForm({ id: "", name: "", country: "", rating: 5, text: "", date: "", approved: false });
  };

  const toggle = (id: string) => {
    setTestimonials(testimonials.map((t) => (t.id === id ? { ...t, approved: !t.approved } : t)));
  };

  const del = (id: string) => {
    if (confirm("Delete testimonial?")) setTestimonials(testimonials.filter((t) => t.id !== id));
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

  return (
    <div style={{ padding: "2.5rem" }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--color-cream)" }}>
            Testimonials
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-muted)", marginTop: "0.25rem" }}>
            {testimonials.filter((t) => t.approved).length} approved · {testimonials.filter((t) => !t.approved).length} pending
          </p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn btn-gold" style={{ padding: "0.625rem 1.25rem" }}>
          + Add Review
        </button>
      </div>

      {showForm && (
        <div className="admin-card mb-6">
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "var(--color-cream)", marginBottom: "1.5rem" }}>
            Add Testimonial
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label style={labelStyle}>Customer Name</label>
              <input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Sophie L." />
            </div>
            <div>
              <label style={labelStyle}>Country (with flag emoji)</label>
              <input style={inputStyle} value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} placeholder="France 🇫🇷" />
            </div>
            <div>
              <label style={labelStyle}>Rating (1–5)</label>
              <select style={inputStyle} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}>
                {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} ★</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Date</label>
              <input style={inputStyle} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="March 2025" />
            </div>
            <div className="md:col-span-2">
              <label style={labelStyle}>Review Text</label>
              <textarea
                style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                placeholder="The customer's experience..."
              />
            </div>
            <label className="flex items-center gap-2" style={{ cursor: "pointer" }}>
              <input type="checkbox" checked={form.approved} onChange={(e) => setForm({ ...form, approved: e.target.checked })} style={{ accentColor: "var(--color-gold)" }} />
              <span style={{ ...labelStyle, marginBottom: 0 }}>Approve immediately</span>
            </label>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="btn btn-gold">Save Review</button>
            <button onClick={() => setShowForm(false)} className="btn btn-outline">Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="admin-card"
            style={{
              display: "flex",
              gap: "1.25rem",
              alignItems: "flex-start",
              border: t.approved ? "1px solid rgba(111,207,151,0.2)" : "1px solid rgba(201,162,39,0.15)",
            }}
          >
            {/* Rating */}
            <div style={{ flexShrink: 0 }}>
              <div style={{ display: "flex", gap: "2px" }}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="var(--color-gold)">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-cream)", marginBottom: "0.3rem" }}>
                {t.name} · {t.country} · {t.date}
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--color-muted)", lineHeight: 1.6 }}>
                &ldquo;{t.text}&rdquo;
              </p>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flexShrink: 0 }}>
              <button
                onClick={() => toggle(t.id)}
                className={`status-badge ${t.approved ? "status-active" : "status-inactive"}`}
                style={{ border: "none", cursor: "pointer" }}
              >
                {t.approved ? "✓ Live" : "Pending"}
              </button>
              <button
                onClick={() => del(t.id)}
                style={{ background: "rgba(181,52,28,0.15)", border: "none", borderRadius: "6px", padding: "0.3rem 0.6rem", color: "var(--color-red)", cursor: "pointer", fontSize: "0.72rem", fontFamily: "var(--font-body)" }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
