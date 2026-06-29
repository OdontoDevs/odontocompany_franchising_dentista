"use client";

import { CleanTestimonial } from "@/components/CleanTestimonial";
import { testimonialsData } from "@/data/testimonials";

export default function TestimonialsSection() {
  return (
    <section
      className="testimonials-section py-24 px-4 flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden"
      id="depoimentos"
    >
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#E8F5F0]/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#EFF8EC]/80 blur-3xl pointer-events-none" />

      <div className="container max-w-6xl mx-auto flex flex-col items-center relative z-10">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="section-kicker section-kicker--light">Franqueados reais</div>
          <h2 className="text-slate-800 text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Histórias de quem <br />
            <span className="text-[#38B549]">já deu o passo</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto font-medium">
            Ouça diretamente de quem abriu uma OdontoCompany e não voltou atrás.
          </p>
        </div>

        <CleanTestimonial testimonials={testimonialsData} />
      </div>
    </section>
  );
}
