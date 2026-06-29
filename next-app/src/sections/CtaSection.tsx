"use client";

import CtaFunnel from "@/components/CtaFunnel";

export default function CtaSection() {
  return (
    <section className="cta-section" id="cta">
      <div className="cta-bg-glow" />
      <div className="container">
        <div className="cta-inner">
          <div className="cta-copy-glass cta-copy-glass--light">
            <div className="section-kicker section-kicker--dark" style={{ textAlign: "left" }}>
              Disponibilidade
            </div>
            <h2 className="cta-title">
              Temos territórios disponíveis na sua cidade.{" "}
              <em>Consulte agora.</em>
            </h2>
            <p className="cta-sub">
              Verifique se o território da sua cidade ainda está disponível. Uma
              vez fechado, não reabre.
            </p>
            <div className="cta-urgency">
              <div className="urgency-dot" />
              <p className="urgency-text">
                <strong>Territórios exclusivos</strong> por cidade, uma vez
                fechado, não abre novamente para o mesmo bairro.
              </p>
            </div>
            <div className="cta-mini-stats">
              <div className="cta-mini-stat">
                <div className="cta-mini-val">35 anos</div>
                <div className="cta-mini-label">de história</div>
              </div>
              <div className="cta-mini-stat">
                <div className="cta-mini-val">+1.000</div>
                <div className="cta-mini-label">unidades abertas</div>
              </div>
              <div className="cta-mini-stat">
                <div className="cta-mini-val">100%</div>
                <div className="cta-mini-label">presença nacional</div>
              </div>
            </div>
          </div>
          <CtaFunnel light />
        </div>
      </div>
    </section>
  );
}
