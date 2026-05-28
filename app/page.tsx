import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FleetSection from "./components/FleetSection";
import RoutesSection from "./components/RoutesSection";
import PricingSection from "./components/PricingSection";
import WhyUsSection from "./components/WhyUsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import BookingSection from "./components/BookingSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <HeroSection />
        <FleetSection />
        <RoutesSection />
        <PricingSection />
        <WhyUsSection />
        <TestimonialsSection />
        <BookingSection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
