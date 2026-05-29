import type { Metadata } from "next";
import AdminSidebar from "./components/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin — MenaraRide",
  description: "MenaraRide admin panel",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--color-night)" }}>
      <AdminSidebar />
      <div className="admin-content">{children}</div>
    </div>
  );
}
