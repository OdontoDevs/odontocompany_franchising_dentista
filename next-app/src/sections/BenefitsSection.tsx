"use client";

import React from "react";

interface BenefitCardProps {
  num: string;
  title: string;
  description: string;
  delay: number;
}

function BenefitCard({ num, title, description, delay }: BenefitCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("is-visible"), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="ben-card metodo-card fade-up-item">
      <div className="ben-card-topbar" />
      <div className="metodo-card-num">{num}</div>
      <h3 className="ben-card-title">{title}</h3>
      <p className="ben-card-desc">{description}</p>
    </div>
  );
}

const benefits = [
  {
    num: "01",
    title: "Captação previsível",
    description:
      "Estratégias de marketing e geração de demanda com o poder da maior rede odontológica do Brasil. Agenda cheia desde o primeiro mês.",
    delay: 100,
  },
  {
    num: "02",
    title: "Processo comercial",
    description:
      "Processos para atendimento, venda e conversão. Sua equipe sabe exatamente como transformar consulta em tratamento.",
    delay: 200,
  },
  {
    num: "03",
    title: "Treinamento completo",
    description:
      "Equipe mais preparada para operar o padrão da rede com a Universidade Corporativa OdontoCompany.",
    delay: 300,
  },
  {
    num: "04",
    title: "Gestão com indicadores",
    description:
      "Indicadores para acompanhar performance e rotina. Você tem visibilidade do negócio em tempo real.",
    delay: 400,
  },
  {
    num: "05",
    title: "Tecnologia integrada",
    description:
      "Ferramentas para controle e operação. CRM, agendamento digital e a plataforma Minha OdontoCompany.",
    delay: 500,
  },
  {
    num: "06",
    title: "Marca nacional",
    description:
      "Percepção nacional aplicada ao mercado local. TV aberta, redes sociais e campanhas de performance trabalhando pela sua clínica.",
    delay: 600,
  },
];

export default function BenefitsSection() {
  return (
    <section className="benefits-section-new" id="vantagens2">
      <div className="ben-inner">
        <div className="ben-header fade-up-item">
          <div className="section-kicker section-kicker--light">O que você recebe</div>
          <h2 className="ben-title">
            O método por trás{" "}
            <span className="ben-highlight-text">da clínica</span>
          </h2>
          <p className="ben-sub">
            A diferença entre uma clínica independente e uma franquia está no
            suporte para o que o dentista geralmente não aprendeu a fazer
            sozinho.
          </p>
        </div>

        <div className="ben-grid">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              num={benefit.num}
              title={benefit.title}
              description={benefit.description}
              delay={benefit.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
