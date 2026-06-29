"use client";

import ClinicCarousel from "@/components/ClinicCarousel";

export default function UnitsSection() {
  return (
    <section className="units-section">
      <div className="units-section__inner">
        <div className="section-kicker section-kicker--light">
          CONHEÇA NOSSAS UNIDADES
        </div>
        <h2 className="mkt-headline units-title">
          O modelo de clínica que virou <span className="mkt-highlight">referência</span>
        </h2>
        <p className="mkt-body units-subtitle">
          Estrutura completa, design clean e tecnologia pronta para atrair
          pacientes desde o dia 1.
        </p>
        <ClinicCarousel />
      </div>
    </section>
  );
}
