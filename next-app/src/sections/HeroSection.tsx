'use client';

import { Gauge, Building2, Award } from "lucide-react";
import CtaFunnel from "@/components/CtaFunnel";

export default function HeroSection() {
  return (
    <section className="hero" id="hero">
      <div className="hero-overlay" />

      <div className="hero-stats" aria-hidden="true">
        <div className="hero-stat hero-stat--1 fade-in-soft delay-3">
          <span className="hero-stat__icon">
            <Gauge />
          </span>
          <div className="hero-stat__text">
            <strong className="hero-stat__value">Qualidade de vida</strong>
          </div>
        </div>

        <div className="hero-stat hero-stat--2 fade-in-soft delay-4">
          <span className="hero-stat__icon">
            <Building2 />
          </span>
          <div className="hero-stat__text">
            <strong className="hero-stat__value">Método de gestão</strong>
          </div>
        </div>

        <div className="hero-stat hero-stat--3 fade-in-soft delay-5">
          <span className="hero-stat__icon">
            <Award />
          </span>
          <div className="hero-stat__text">
            <strong className="hero-stat__value">Status e reconhecimento</strong>
          </div>
        </div>
      </div>

      <div className="hero-inner">
        <div className="hero-content">
          <h1 className="hero-headline animate-in delay-2">
            Você já domina a odontologia. Agora é hora de dominar{" "}
            <em>o negócio.</em>
          </h1>
          <p className="hero-sub animate-in delay-3">
            Marca, método, captação e gestão para transformar experiência
            clínica em crescimento real. Você continua sendo dentista — mas passa
            a pensar como empresário.
          </p>
          <div className="max-w-lg mt-6 hero-ctas">
            <CtaFunnel />
          </div>
        </div>
      </div>
      <div className="hero-ticker">
        <div className="hero-ticker-track">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="hero-ticker-item" key={index}>
              <span>MARCA FORTE E RECONHECIDA</span>
              <span className="hero-ticker-sep">·</span>
              <span>MÉTODO DE GESTÃO COMPLETO</span>
              <span className="hero-ticker-sep">·</span>
              <span>CAPTAÇÃO PREVISÍVEL</span>
              <span className="hero-ticker-sep">·</span>
              <span>TERRITÓRIO EXCLUSIVO</span>
              <span className="hero-ticker-sep">·</span>
              <span>DA CADEIRA PARA A GESTÃO</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
