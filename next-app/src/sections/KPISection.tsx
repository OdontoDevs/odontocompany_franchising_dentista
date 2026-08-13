"use client";

import React from "react";
import { trackCtaClick } from "@/lib/tracking";

interface KpiCardProps {
  label: string;
  value: string;
  hint?: string;
}

function KpiCard({ label, value, hint }: KpiCardProps) {
  return (
    <div className="kpi-mobile-card bg-white rounded-3xl p-8 text-center glow-card flex flex-col justify-center min-h-[160px] transition-transform duration-300 hover:scale-105">
      <span className="text-[var(--green-500)] text-3xl md:text-4xl font-extrabold whitespace-nowrap mb-2">
        {value}
      </span>
      <span className="text-slate-700 font-bold text-[11px] md:text-xs uppercase tracking-tight leading-tight">
        {label}
      </span>
      {hint ? (
        <span className="text-slate-400 text-[11px] italic mt-1 leading-tight">
          {hint}
        </span>
      ) : null}
    </div>
  );
}

interface InfoItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

function InfoItem({ icon, children }: InfoItemProps) {
  return (
    <div className="flex items-start gap-4 text-white">
      <div className="text-[var(--lime)] mt-1 flex-shrink-0">{icon}</div>
      <p className="text-sm leading-relaxed text-white/90">{children}</p>
    </div>
  );
}

export default function KPISection() {
  return (
    <section
      className="kpi-mobile-section bg-grid-pattern py-20 px-4 md:py-28 flex flex-col items-center justify-center w-full"
      id="numeros"
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col items-center gap-12">
        <div className="text-center space-y-4">
          <div className="section-kicker section-kicker--dark">
            Números que ajudam a decidir
          </div>
          <h2 className="text-white text-4xl md:text-5xl tracking-tight font-black leading-tight">
            Os números da <br />
            <span className="text-[var(--lime)]">sua futura clínica</span>
          </h2>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto font-medium">
            Projeções baseadas na média da rede. Para o dentista, o número não
            deve vir sozinho — ele responde como o modelo ajuda a sair do
            operacional e construir uma clínica mais profissionalizada.
          </p>
        </div>

        <div className="kpi-mobile-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          <KpiCard
            value="R$ 450k"
            label="Investimento inicial"
            hint="taxa + obra + equipamentos + giro"
          />
          <KpiCard
            value="R$ 1,4M"
            label="Faturamento médio/ano"
            hint="R$ 60k a R$ 120k por mês"
          />
          <KpiCard
            value="20–25%"
            label="Lucratividade média"
            hint="após maturação da unidade"
          />
          <KpiCard
            value="24 meses"
            label="Prazo médio de retorno"
            hint="equilíbrio a partir do 6º mês"
          />
        </div>

        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 px-4 mx-auto mt-4">
          <InfoItem
            icon={
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            Ponto de equilíbrio a partir do{" "}
            <span className="font-bold text-white">6º mês</span> de operação.
          </InfoItem>

          <InfoItem
            icon={
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            <span className="font-bold text-white">60% dos franqueados</span>{" "}
            possuem mais de uma unidade.
          </InfoItem>

          <InfoItem
            icon={
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-10V4m-5 11h.01"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            Modelos para{" "}
            <span className="font-bold text-white">
              diferentes portes de cidade
            </span>
            , médias e capitais.
          </InfoItem>
        </div>

        <div className="w-full flex justify-center mt-6">
          <button
            className="btn-solid-green normal-case text-white font-bold px-10 py-4 text-base"
            onClick={() => {
              trackCtaClick("Quero crescer com método", "numeros", "#cta");
              document
                .getElementById("cta")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Quero crescer com método
          </button>
        </div>
      </div>
    </section>
  );
}
