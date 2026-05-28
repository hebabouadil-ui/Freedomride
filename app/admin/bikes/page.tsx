"use client";

import { useState } from "react";
import { defaultBikes, type Bike } from "@/lib/store";

export default function AdminBikes() {
  const [bikes, setBikes] = useState<Bike[]>(defaultBikes);
  const [editing, setEditing] = useState<Bike | null>(null);
  const [showForm, setShowForm] = useState(false);

  const emptyBike: Bike = {
    id: "",
    category: "scooter",
    name: "",
    engine: "",
    range: "",
    terrain: "",
    priceMAD: 0,
    priceEUR: 0,
    available: true,
    imageUrl: "",
    description: "",
  };

  const [form, setForm] = useState<Bike>(emptyBike);

  const handleEdit = (bike: Bike) => {
    setEditing(bike);
    setForm(bike);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditing(null);
    setForm({ ...emptyBike, id: `bike-${Date.now()}` });
    setShowForm(true);
  };

  const handleSave = () => {
    if (editing) {
      setBikes(bikes.map((b) => (b.id === editing.id ? form : b)));
    } else {
      setBikes([...bikes, form]);
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this bike?")) {
      setBikes(bikes.filter((b) => b.id !== id));
    }
  };

  const toggleAvailable = (id: string) => {
    setBikes(bikes.map((b) => (b.id === id ? { ...b, available: !b.available } : b)));
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
            Fleet Management
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-muted)", marginTop: "0.25rem" }}>
            {bikes.length} bikes · {bikes.filter((b) => b.available).length} available
          </p>
        </div>
        <button onClick={handleNew} className="btn btn-gold" style={{ padding: "0.625rem 1.25rem" }}>
          + Add Bike
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="admin-card mb-6">
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "var(--color-cream)", marginBottom: "1.5rem" }}>
            {editing ? "Edit Bike" : "Add New Bike"}
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label style={labelStyle}>Bike Name</label>
              <input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Honda PCX 150" />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select
                style={inputStyle}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as Bike["category"] })}
              >
                <option value="scooter">Scooter</option>
                <option value="enduro">Enduro</option>
                <option value="touring">Touring</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Engine</label>
              <input style={inputStyle} value={form.engine} onChange={(e) => setForm({ ...form, engine: e.target.value })} placeholder="150cc" />
            </div>
            <div>
              <label style={labelStyle}>Range</label>
              <input style={inputStyle} value={form.range} onChange={(e) => setForm({ ...form, range: e.target.value })} placeholder="200km" />
            </div>
            <div>
              <label style={labelStyle}>Terrain</label>
              <input style={inputStyle} value={form.terrain} onChange={(e) => setForm({ ...form, terrain: e.target.value })} placeholder="City / Medina" />
            </div>
            <div>
              <label style={labelStyle}>Image URL</label>
              <input style={inputStyle} value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." />
            </div>
            <div>
              <label style={labelStyle}>Price (MAD/day)</label>
              <input style={inputStyle} type="number" value={form.priceMAD} onChange={(e) => setForm({ ...form, priceMAD: Number(e.target.value) })} />
            </div>
            <div>
              <label style={labelStyle}>Price (EUR/day)</label>
              <input style={inputStyle} type="number" value={form.priceEUR} onChange={(e) => setForm({ ...form, priceEUR: Number(e.target.value) })} />
            </div>
            <div className="md:col-span-2">
              <label style={labelStyle}>Description</label>
              <textarea
                style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Short description..."
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="available"
                checked={form.available}
                onChange={(e) => setForm({ ...form, available: e.target.checked })}
                style={{ width: "16px", height: "16px", accentColor: "var(--color-gold)" }}
              />
              <label htmlFor="available" style={{ ...labelStyle, marginBottom: 0 }}>Available for rental</label>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="btn btn-gold">Save Bike</button>
            <button onClick={() => setShowForm(false)} className="btn btn-outline">Cancel</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="admin-card" style={{ overflow: "hidden", padding: 0 }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,248,237,0.08)" }}>
                {["Bike", "Category", "Engine", "Price/day", "Status", "Actions"].map((h) => (
                  <th key={h} style={{ padding: "1rem 1.25rem", textAlign: "left", fontFamily: "var(--font-body)", fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-muted)", fontWeight: 600 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bikes.map((bike) => (
                <tr key={bike.id} style={{ borderBottom: "1px solid rgba(255,248,237,0.05)" }}>
                  <td style={{ padding: "1rem 1.25rem" }}>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 600, color: "var(--color-cream)" }}>{bike.name}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--color-muted)" }}>{bike.terrain}</p>
                  </td>
                  <td style={{ padding: "1rem 1.25rem" }}>
                    <span className="label" style={{ color: "var(--color-gold)", background: "rgba(201,162,39,0.1)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
                      {bike.category}
                    </span>
                  </td>
                  <td style={{ padding: "1rem 1.25rem", fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--color-cream)" }}>
                    {bike.engine}
                  </td>
                  <td style={{ padding: "1rem 1.25rem" }}>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 700, color: "var(--color-gold)" }}>{bike.priceMAD} MAD</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--color-muted)" }}>€{bike.priceEUR}</p>
                  </td>
                  <td style={{ padding: "1rem 1.25rem" }}>
                    <button onClick={() => toggleAvailable(bike.id)}>
                      <span className={`status-badge ${bike.available ? "status-active" : "status-inactive"}`}>
                        {bike.available ? "Available" : "Rented"}
                      </span>
                    </button>
                  </td>
                  <td style={{ padding: "1rem 1.25rem" }}>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(bike)}
                        style={{ background: "rgba(255,248,237,0.06)", border: "none", borderRadius: "6px", padding: "0.4rem 0.75rem", color: "var(--color-cream)", cursor: "pointer", fontSize: "0.75rem", fontFamily: "var(--font-body)" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(bike.id)}
                        style={{ background: "rgba(181,52,28,0.15)", border: "none", borderRadius: "6px", padding: "0.4rem 0.75rem", color: "var(--color-red)", cursor: "pointer", fontSize: "0.75rem", fontFamily: "var(--font-body)" }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
