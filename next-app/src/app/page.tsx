"use client";

import Navbar from "@/sections/Navbar";
import HeroSection from "@/sections/HeroSection";
import DorSection from "@/sections/DorSection";
import ViradaSection from "@/sections/ViradaSection";
import UnitsSection from "@/sections/UnitsSection";
import MediaSection from "@/sections/MediaSection";
import VideoSection from "@/sections/VideoSection";
import BenefitsSection from "@/sections/BenefitsSection";
import KPISection from "@/sections/KPISection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import RoadmapSection from "@/sections/RoadmapSection";
import FAQSection from "@/sections/FAQSection";
import CtaSection from "@/sections/CtaSection";
import Footer from "@/sections/Footer";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export default function Home() {
  useSmoothScroll();

  return (
    <>
      <Navbar />
      <HeroSection />
      <DorSection />
      <ViradaSection />
      <UnitsSection />
      <MediaSection />
      <VideoSection />
      <BenefitsSection />
      <KPISection />
      <TestimonialsSection />
      <RoadmapSection />
      <FAQSection />
      <div className="cta-footer-shell">
        <CtaSection />
        <Footer />
      </div>
    </>
  );
}
