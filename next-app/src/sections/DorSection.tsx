"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface PainCard {
  emoji: string;
  iconBg: string;
  title: string;
  description: string;
  quote: string;
  delay: number;
}

const painCards: PainCard[] = [
  {
    emoji: "😤",
    iconBg: "#fff0f0",
    title: "Agenda cheia, sem liberdade",
    description:
      "Mais pacientes, mais horas, mais cansaço — sem necessariamente mais crescimento.",
    quote: "“Trabalho mais e não avanço mais.”",
    delay: 100,
  },
  {
    emoji: "📉",
    iconBg: "#fff5ec",
    title: "Captação incerta",
    description:
      "Depender de indicação ou impulso de marketing sem processo previsível.",
    quote: "“Não sei de onde vai vir o próximo paciente.”",
    delay: 200,
  },
  {
    emoji: "🏗️",
    iconBg: "#fffaec",
    title: "Gestão pesada e solitária",
    description:
      "Equipe, vendas, financeiro e atendimento competindo com o tempo clínico.",
    quote: "“Virei gestor sem querer, e sem suporte.”",
    delay: 300,
  },
  {
    emoji: "🔒",
    iconBg: "#f0f4ff",
    title: "Crescimento travado",
    description:
      "A clínica depende demais da sua cadeira e da sua presença para funcionar.",
    quote: "“Se eu parar, tudo para junto.”",
    delay: 400,
  },
];

function PainCardItem({ card }: { card: PainCard }) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("is-visible"), card.delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [card.delay]);

  return (
    <div ref={ref} className="dor-card fade-up-item">
      <div className="dor-card-icon" style={{ background: card.iconBg }}>
        {card.emoji}
      </div>
      <div>
        <div className="dor-card-title">{card.title}</div>
        <div className="dor-card-desc">{card.description}</div>
        <div className="dor-card-quote">{card.quote}</div>
      </div>
    </div>
  );
}

export default function DorSection() {
  return (
    <section className="dor-section" id="vantagens">
      <div className="dor-inner">
        <div className="dor-grid">
          <div className="dor-text fade-up-item is-visible">
            <div className="section-kicker section-kicker--light">
              O limite de crescer sozinho
            </div>
            <h2 className="section-title dor-title">
              Agenda cheia.
              <br />
              Técnica apurada.
              <br />
              <em>E ainda assim travado?</em>
            </h2>
            <p className="dor-sub">
              Muitos dentistas têm reputação e pacientes. Mas falta método para
              transformar a clínica em negócio.
            </p>
            <div className="dor-cta-quote">
              A pergunta não é: como atender mais?
              <br />
              A pergunta é:{" "}
              <strong>como crescer melhor, com método, marca e time?</strong>
            </div>
            <button
              className="btn-solid-green dor-btn"
              onClick={() =>
                document
                  .getElementById("cta")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Quero sair do operacional com método
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="dor-cards">
            {painCards.map((card) => (
              <PainCardItem key={card.title} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
