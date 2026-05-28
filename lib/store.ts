// In-memory store with localStorage persistence for admin panel
// In production this would be a database (e.g. Supabase/Prisma)

export type Bike = {
  id: string;
  category: "scooter" | "enduro" | "touring";
  name: string;
  engine: string;
  range: string;
  terrain: string;
  priceMAD: number;
  priceEUR: number;
  available: boolean;
  imageUrl: string;
  description: string;
};

export type PricingPlan = {
  id: string;
  name: string;
  duration: string;
  priceMAD: number;
  priceEUR: number;
  features: string[];
  recommended: boolean;
  active: boolean;
};

export type Booking = {
  id: string;
  name: string;
  phone: string;
  pickupDate: string;
  returnDate: string;
  bikeType: string;
  hotelAddress: string;
  status: "pending" | "confirmed" | "active" | "completed" | "cancelled";
  createdAt: string;
  totalMAD?: number;
};

export type Testimonial = {
  id: string;
  name: string;
  country: string;
  rating: number;
  text: string;
  date: string;
  approved: boolean;
};

export type SiteSettings = {
  brandName: string;
  whatsappNumber: string;
  email: string;
  address: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroImage: string;
  googleMapsUrl: string;
};

// Default data
export const defaultBikes: Bike[] = [
  {
    id: "bike-1",
    category: "scooter",
    name: "Honda PCX 150",
    engine: "150cc",
    range: "200km",
    terrain: "City / Medina",
    priceMAD: 200,
    priceEUR: 18,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    description: "Perfect urban scooter for medina exploration. No motorcycle license required.",
  },
  {
    id: "bike-2",
    category: "enduro",
    name: "Royal Enfield Himalayan",
    engine: "411cc",
    range: "450km",
    terrain: "Atlas / Desert",
    priceMAD: 450,
    priceEUR: 40,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80",
    description: "Adventure enduro perfect for Atlas Mountains and Agafay Desert.",
  },
  {
    id: "bike-3",
    category: "touring",
    name: "BMW F750 GS",
    engine: "853cc",
    range: "600km",
    terrain: "Coast / Highway",
    priceMAD: 700,
    priceEUR: 62,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1558618047-f89ef8b85f24?w=800&q=80",
    description: "Premium touring bike for long-distance coastal and highway routes.",
  },
];

export const defaultPricing: PricingPlan[] = [
  {
    id: "plan-1",
    name: "Half Day",
    duration: "4 hours",
    priceMAD: 200,
    priceEUR: 18,
    features: ["4 hours rental", "Helmet included", "Lock & chain", "Basic insurance", "City map", "Phone support"],
    recommended: false,
    active: true,
  },
  {
    id: "plan-2",
    name: "Full Day",
    duration: "24 hours",
    priceMAD: 450,
    priceEUR: 40,
    features: ["24 hours rental", "Premium helmet", "Lock & chain", "Full insurance", "GPS device", "Hotel delivery", "24/7 WhatsApp support", "Route guide PDF"],
    recommended: true,
    active: true,
  },
  {
    id: "plan-3",
    name: "Weekly",
    duration: "7 days",
    priceMAD: 2500,
    priceEUR: 220,
    features: ["7 days rental", "Premium helmet + gear bag", "Lock & chain", "Full comprehensive insurance", "GPS device", "Hotel delivery", "24/7 WhatsApp support", "Multi-route guide", "Emergency roadside", "Fuel discount card"],
    recommended: false,
    active: true,
  },
];

export const defaultBookings: Booking[] = [
  {
    id: "bk-001",
    name: "Sophie Laurent",
    phone: "+33612345678",
    pickupDate: "2025-06-10",
    returnDate: "2025-06-11",
    bikeType: "enduro",
    hotelAddress: "Riad Yasmine, Medina",
    status: "confirmed",
    createdAt: "2025-06-08T10:30:00Z",
    totalMAD: 450,
  },
  {
    id: "bk-002",
    name: "Jake Mitchell",
    phone: "+61412345678",
    pickupDate: "2025-06-12",
    returnDate: "2025-06-15",
    bikeType: "touring",
    hotelAddress: "Hotel La Mamounia",
    status: "pending",
    createdAt: "2025-06-09T14:15:00Z",
    totalMAD: 2100,
  },
  {
    id: "bk-003",
    name: "Carlos Vega",
    phone: "+34612345678",
    pickupDate: "2025-06-11",
    returnDate: "2025-06-11",
    bikeType: "scooter",
    hotelAddress: "Airbnb Gueliz",
    status: "active",
    createdAt: "2025-06-10T08:00:00Z",
    totalMAD: 200,
  },
];

export const defaultTestimonials: Testimonial[] = [
  { id: "t-1", name: "Sophie L.", country: "France 🇫🇷", rating: 5, text: "The Atlas Mountains on an enduro was the highlight of my entire Morocco trip. FreedomRide delivered the bike to our riad and were on WhatsApp the whole time.", date: "January 2025", approved: true },
  { id: "t-2", name: "Jake M.", country: "Australia 🇦🇺", rating: 5, text: "Rented the BMW for 3 days. Drove to Essaouira and back. The bike was immaculate, insurance was real, and the team sorted out a flat tyre in under an hour.", date: "March 2025", approved: true },
  { id: "t-3", name: "Lena & Tom", country: "Germany 🇩🇪", rating: 5, text: "We had zero motorcycle experience but the scooters were easy and the city tour around the Medina was magical. Absolutely recommend!", date: "December 2024", approved: true },
];

export const defaultSettings: SiteSettings = {
  brandName: "FreedomRide",
  whatsappNumber: "212600000000",
  email: "hello@freedomride.ma",
  address: "45 Rue Bab Doukkala, Marrakech",
  heroHeadline: "RIDE FREE.",
  heroSubtitle: "Discover Morocco at your own pace. Premium motorcycles delivered to your riad or hotel.",
  heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85",
  googleMapsUrl: "",
};
