import type { Metadata } from "next";
import { Unbounded, Montserrat } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FreedomRide — Premium Motorcycle Rental in Marrakech",
  description:
    "Explore Marrakech, the Atlas Mountains, Agafay Desert and Essaouira on a premium motorcycle. Scooters, enduro, and touring bikes available. Hotel delivery included.",
  keywords: ["motorcycle rental Marrakech", "moto rental Morocco", "scooter rental Marrakech", "enduro Morocco", "Atlas Mountains bike tour"],
  openGraph: {
    title: "FreedomRide — Ride Morocco Your Way",
    description: "Premium motorcycle rental in Marrakech. Explore the Atlas Mountains, Agafay Desert and beyond.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${montserrat.variable}`}
    >
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
