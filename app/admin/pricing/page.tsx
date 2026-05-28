"use client";

import { useState } from "react";
import { defaultPricing, type PricingPlan } from "@/lib/store";

export default function AdminPricing() {
  const [plans, setPlans] = useState<PricingPlan[]>(defaultPricing);
  const [editing, setEditing] = useState<PricingPlan | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newFeature, setNewFeature] = useState("");

  const emptyPlan: PricingPlan = {
    id: "",
    name: "",
    duration: "",
    priceMAD: 0,
    priceEUR: 0,
    features: [],
    recommended: false,
    active: true,
  };

  const [form, setForm] = useState<PricingPlan>(emptyPlan);

  const handleEdit = (plan: PricingPlan) => {
    setEditing(plan);
    setForm(plan);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditing(null);
    setForm({ ...emptyPlan, id: `plan-${Date.now()}` });
    setShowForm(true);
  };

  const handleSave = () => {
    if (editing) {
      setPlans(plans.map((p) => (p.id === editing.id ? form : p)));
    } else {
      setPlans([...plans, form]);
    }
    setShowForm(false);
    setEditing(null);
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setForm({ ...form, features: [...form.features, newFeature.trim()] });
      setNewFeature("");
    }
  };

  const removeFeature = (i: number) => {
    setForm({ ...form, features: form.features.filter((_, idx) => idx !== i) });
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
            Pricing Management
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-muted)", marginTop: "0.25rem" }}>
            Manage rental plans and prices
          </p>
        </div>
        <button onClick={handleNew} className="btn btn-gold" style={{ padding: "0.625rem 1.25rem" }}>
          + Add Plan
        </button>
      </div>

      {/* Edit form */}
      {showForm && (
        <div className="admin-card mb-6">
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "var(--color-cream)", marginBottom: "1.5rem" }}>
            {editing ? "Edit Plan" : "New Plan"}
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label style={labelStyle}>Plan Name</label>
              <input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full Day" />
            </div>
            <div>
              <label style={labelStyle}>Duration Label</label>
              <input style={inputStyle} value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="24 hours" />
            </div>
            <div>
              <label style={labelStyle}>Price (MAD)</label>
              <input style={inputStyle} type="number" value={form.priceMAD} onChange={(e) => setForm({ ...form, priceMAD: Number(e.target.value) })} />
            </div>
            <div>
              <label style={labelStyle}>Price (EUR)</label>
              <input style={inputStyle} type="number" value={form.priceEUR} onChange={(e) => setForm({ ...form, priceEUR: Number(e.target.value) })} />
            </div>
          </div>

          {/* Features */}
          <div className="mb-4">
            <label style={labelStyle}>Included Features</label>
            <div className="flex gap-2 mb-3">
              <input
                style={{ ...inputStyle, flex: 1 }}
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a feature..."
                onKeyDown={(e) => e.key === "Enter" && addFeature()}
              />
              <button onClick={addFeature} className="btn btn-gold" style={{ padding: "0.5rem 1rem", whiteSpace: "nowrap" }}>
                Add
              </button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {form.features.map((f, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "rgba(201,162,39,0.12)",
                    border: "1px solid rgba(201,162,39,0.2)",
                    borderRadius: "6px",
                    padding: "0.25rem 0.6rem",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.78rem",
                    color: "var(--color-cream)",
                  }}
                >
                  {f}
                  <button
                    onClick={() => removeFeature(i)}
                    style={{ background: "none", border: "none", color: "var(--color-red)", cursor: "pointer", fontSize: "1rem", lineHeight: 1, padding: 0 }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Flags */}
          <div className="flex gap-6 mb-4">
            <label className="flex items-center gap-2" style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={form.recommended}
                onChange={(e) => setForm({ ...form, recommended: e.target.checked })}
                style={{ accentColor: "var(--color-gold)" }}
              />
              <span style={{ ...labelStyle, marginBottom: 0 }}>Recommended plan</span>
            </label>
            <label className="flex items-center gap-2" style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
                style={{ accentColor: "var(--color-gold)" }}
              />
              <span style={{ ...labelStyle, marginBottom: 0 }}>Active / visible</span>
            </label>
          </div>

          <div className="flex gap-3">
            <button onClick={handleSave} className="btn btn-gold">Save Plan</button>
            <button onClick={() => setShowForm(false)} className="btn btn-outline">Cancel</button>
          </div>
        </div>
      )}

      {/* Plans cards */}
      <div className="grid md:grid-cols-3 gap-5">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="admin-card relative"
            style={{ border: plan.recommended ? "1px solid var(--color-gold)" : undefined }}
          >
            {plan.recommended && (
              <span
                className="absolute -top-3 left-4 label"
                style={{ background: "var(--color-gold)", color: "var(--color-night)", padding: "0.2rem 0.75rem", borderRadius: "999px" }}
              >
                Recommended
              </span>
            )}

            <div className="flex items-start justify-between mb-3">
              <div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, color: "var(--color-cream)", letterSpacing: "-0.02em" }}>
                  {plan.name}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--color-muted)" }}>
                  {plan.duration}
                </p>
              </div>
              <span className={`status-badge ${plan.active ? "status-active" : "status-inactive"}`}>
                {plan.active ? "Active" : "Hidden"}
              </span>
            </div>

            <div className="flex items-baseline gap-1 mb-4">
              <span style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, color: "var(--color-gold)", lineHeight: 1 }}>
                {plan.priceMAD}
              </span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--color-muted)" }}>MAD</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,248,237,0.35)", marginLeft: "0.25rem" }}>/ €{plan.priceEUR}</span>
            </div>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.25rem" }}>
              {plan.features.slice(0, 5).map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-cream)" }}>{f}</span>
                </li>
              ))}
              {plan.features.length > 5 && (
                <li style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--color-muted)" }}>
                  +{plan.features.length - 5} more features
                </li>
              )}
            </ul>

            <button
              onClick={() => handleEdit(plan)}
              className="btn btn-outline"
              style={{ width: "100%", padding: "0.5rem" }}
            >
              Edit Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
