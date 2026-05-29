"use client";

import { useState } from "react";
import { defaultBookings, type Booking } from "@/lib/store";

const statusOptions: Booking["status"][] = ["pending", "confirmed", "active", "completed", "cancelled"];

const statusColors: Record<string, string> = {
  pending: "var(--color-gold)",
  confirmed: "#4a9edd",
  active: "#6fcf97",
  completed: "var(--color-muted)",
  cancelled: "var(--color-red)",
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>(defaultBookings);
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const updateStatus = (id: string, status: Booking["status"]) => {
    setBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const deleteBooking = (id: string) => {
    if (confirm("Delete this booking?")) {
      setBookings(bookings.filter((b) => b.id !== id));
    }
  };

  return (
    <div style={{ padding: "2.5rem" }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--color-cream)" }}>
            Bookings
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-muted)", marginTop: "0.25rem" }}>
            {bookings.length} total · {bookings.filter((b) => b.status === "pending").length} pending confirmation
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", ...statusOptions].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              background: filter === s ? "var(--color-gold)" : "rgba(255,248,237,0.06)",
              color: filter === s ? "var(--color-night)" : "var(--color-muted)",
              border: "none",
              borderRadius: "6px",
              padding: "0.4rem 0.875rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              fontWeight: filter === s ? 700 : 400,
              cursor: "pointer",
              textTransform: "capitalize",
              letterSpacing: "0.04em",
              transition: "all 0.2s ease",
            }}
          >
            {s} {s !== "all" && `(${bookings.filter((b) => b.status === s).length})`}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="admin-card" style={{ overflow: "hidden", padding: 0 }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,248,237,0.08)" }}>
                {["ID", "Customer", "Dates", "Bike", "Hotel", "Total", "Status", "Actions"].map((h) => (
                  <th key={h} style={{ padding: "0.875rem 1rem", textAlign: "left", fontFamily: "var(--font-body)", fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-muted)", fontWeight: 600, whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} style={{ borderBottom: "1px solid rgba(255,248,237,0.04)" }}>
                  <td style={{ padding: "0.875rem 1rem", fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--color-muted)" }}>
                    {b.id}
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-cream)", whiteSpace: "nowrap" }}>
                      {b.name}
                    </p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--color-muted)" }}>{b.phone}</p>
                  </td>
                  <td style={{ padding: "0.875rem 1rem", fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-cream)", whiteSpace: "nowrap" }}>
                    {b.pickupDate}<br />
                    <span style={{ color: "var(--color-muted)" }}>→ {b.returnDate}</span>
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <span className="label" style={{ color: "var(--color-gold)", background: "rgba(201,162,39,0.1)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
                      {b.bikeType}
                    </span>
                  </td>
                  <td style={{ padding: "0.875rem 1rem", fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--color-cream)", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {b.hotelAddress}
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-gold)", whiteSpace: "nowrap" }}>
                      {b.totalMAD} MAD
                    </p>
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <select
                      value={b.status}
                      onChange={(e) => updateStatus(b.id, e.target.value as Booking["status"])}
                      style={{
                        background: `${statusColors[b.status]}18`,
                        color: statusColors[b.status],
                        border: `1px solid ${statusColors[b.status]}44`,
                        borderRadius: "6px",
                        padding: "0.3rem 0.5rem",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.72rem",
                        cursor: "pointer",
                        outline: "none",
                        textTransform: "capitalize",
                      }}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s} style={{ background: "var(--color-charcoal)", color: "var(--color-cream)" }}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <div className="flex gap-2">
                      <a
                        href={`https://wa.me/${b.phone.replace(/\D/g, "")}?text=Hi ${b.name}, your MenaraRide booking is confirmed!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ background: "rgba(37,211,102,0.15)", border: "none", borderRadius: "6px", padding: "0.35rem 0.6rem", color: "#25D366", cursor: "pointer", fontSize: "0.75rem", fontFamily: "var(--font-body)", textDecoration: "none", display: "inline-flex" }}
                      >
                        WA
                      </a>
                      <button
                        onClick={() => deleteBooking(b.id)}
                        style={{ background: "rgba(181,52,28,0.15)", border: "none", borderRadius: "6px", padding: "0.35rem 0.6rem", color: "var(--color-red)", cursor: "pointer", fontSize: "0.75rem", fontFamily: "var(--font-body)" }}
                      >
                        ×
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p style={{ padding: "2rem", textAlign: "center", fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-muted)" }}>
              No bookings found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
