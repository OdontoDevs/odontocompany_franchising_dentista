"use client";

import { trackCtaClick } from "@/lib/tracking";

export default function CompareSection() {
  return (
    <section className="compare-section-new" id="comparativo">
      <div className="cmp-glow" />

      <div className="cmp-inner">
        <header className="cmp-header">
          <div className="section-kicker section-kicker--dark">Por que OdontoCompany?</div>
          <h2 className="cmp-title">
            Quanto rende R$ 450k nos <em>diferentes investimentos</em>?
          </h2>
          <p className="cmp-sub">
            Antes de decidir, compare o retorno da sua franquia com outras
            formas de aplicar o mesmo capital.
          </p>
        </header>

        <div className="cmp-table-container group">
          <div className="cmp-table-glow group-hover:opacity-50" />

          <div className="cmp-table-card">
            <div className="cmp-table-scroll">
              <table className="cmp-table">
                <thead>
                  <tr>
                    <th className="th-empty"></th>
                    <th className="th-highlight rounded-t-lg">OdontoCompany</th>
                    <th>Tesouro IPCA+</th>
                    <th>FII médio</th>
                    <th>CDB 120% CDI</th>
                    <th>Clínica solo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="td-label">Renda mensal média</td>
                    <td className="td-highlight">
                      <span className="td-badge">R$ 9–36k</span>
                    </td>
                    <td>R$ 2.700</td>
                    <td>R$ 2.250</td>
                    <td>R$ 3.500</td>
                    <td className="td-dim">R$ 3–8k*</td>
                  </tr>
                  <tr>
                    <td className="td-label">Retorno do capital</td>
                    <td className="td-highlight font-semibold">18–24 meses</td>
                    <td>~14 anos</td>
                    <td>~17 anos</td>
                    <td>~11 anos</td>
                    <td className="td-dim">Indefinido</td>
                  </tr>
                  <tr>
                    <td className="td-label">Gestão necessária</td>
                    <td className="td-highlight">Com suporte total</td>
                    <td>Zero</td>
                    <td>Zero</td>
                    <td>Zero</td>
                    <td className="td-dim">100% sozinho</td>
                  </tr>
                  <tr>
                    <td className="td-label">Marca e marketing</td>
                    <td className="td-highlight">Incluso + Eliana</td>
                    <td className="td-dim">-</td>
                    <td className="td-dim">-</td>
                    <td className="td-dim">-</td>
                    <td className="td-dim">Por conta</td>
                  </tr>
                  <tr>
                    <td className="td-label">Modelo validado</td>
                    <td className="td-highlight rounded-b-lg font-semibold">
                      35 anos + 1.000 un.
                    </td>
                    <td>Sim</td>
                    <td>Sim</td>
                    <td>Sim</td>
                    <td className="td-dim">Sem garantia</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <p className="cmp-disclaimer">
          * Valores médios estimados. Resultados variam conforme mercado,
          localização e gestão do franqueado. Metodologia OdontoCompany
          Franchising.
        </p>

        <div className="cmp-cta-area">
          <a
            className="cmp-cta-btn group"
            href="#cta"
            onClick={() =>
              trackCtaClick("Simular meu investimento", "comparativo", "#cta")
            }
          >
            <span className="cmp-cta-shimmer group-hover:animate-shimmer" />
            <span className="cmp-cta-content">
              Simular meu investimento
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
