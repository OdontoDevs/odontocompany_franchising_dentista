"use client";

interface ViradaStep {
  num: string;
  title: string;
  description: string;
}

const steps: ViradaStep[] = [
  {
    num: "1",
    title: "Dentista experiente",
    description:
      "Você já construiu conhecimento técnico e reputação sólida no mercado.",
  },
  {
    num: "2",
    title: "Dono de clínica",
    description:
      "Agora precisa de processo, time e gestão para crescer com estrutura.",
  },
  {
    num: "3",
    title: "Gestor de operação",
    description:
      "A clínica passa a girar com indicadores e método independente da sua presença.",
  },
  {
    num: "4",
    title: "Referência local",
    description:
      "Crescimento com marca forte e percepção de valor no seu mercado.",
  },
];

export default function ViradaSection() {
  return (
    <section className="virada-section">
      <div className="virada-glow" />
      <div className="virada-inner">
        <div className="virada-grid">
          <div className="virada-text">
            <div className="section-kicker section-kicker--dark">A virada</div>
            <h2 className="section-title virada-title">
              Da cadeira
              <br />
              <em>para a gestão</em>
            </h2>
            <p className="virada-sub">
              A ideia não é abandonar a odontologia. É deixar de depender apenas
              da sua cadeira para crescer. Você continua sendo dentista — mas
              passa a pensar como empresário.
            </p>
            <div className="virada-steps">
              {steps.map((step) => (
                <div className="virada-step" key={step.num}>
                  <div className="virada-step-num">{step.num}</div>
                  <div>
                    <div className="virada-step-title">{step.title}</div>
                    <div className="virada-step-desc">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="virada-img">
            <div className="virada-img-inner">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(56,181,73,.3)"
                strokeWidth="0.8"
                className="virada-img-icon"
              >
                <path d="M12 2C8.5 2 5 5 5 9c0 2 .8 3.8 2 5l2 6c.3.8 1 1 1 1h4s.7-.2 1-1l2-6c1.2-1.2 2-3 2-5 0-4-3.5-7-7-7z" />
              </svg>
              <div className="virada-img-lbl">
                Inserir foto do dentista em clínica moderna · pós-produção
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
