"use client";

import { trackCtaClick } from "@/lib/tracking";

export default function MediaSection() {
  return (
    <section className="media-section-redesign" id="midia">
      <div className="media-inner">
        <div className="media-header">
          <div className="section-kicker section-kicker--light">O poder da mídia</div>
          <h2 className="media-title">
            Sua clínica na TV aberta{" "}
            <em className="italic-teal">antes de abrir</em>
          </h2>
          <p className="media-sub">
            Nenhum outro franqueado no setor odontológico tem esse diferencial.
            Enquanto concorrentes locais pagam por anúncio, seus pacientes já
            ouviram falar da OdontoCompany na TV.
          </p>
        </div>

        <div className="media-video-wrap">
          <video
            className="media-video-wide"
            src="https://pub-db8ed4fb33634589a6ce5fb07e85cb46.r2.dev/landingpage_odc_franchising/video_ratinho.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls
          />
        </div>

        <div className="media-content-block">
          <h3 className="media-content-title">
            A presença da marca onde o Brasil assiste, escuta e compartilha.
          </h3>
          <p className="media-content-sub">
            A OdontoCompany está presente na TV aberta e no dia a dia das
            pessoas, impactando milhões de brasileiros com ações de
            merchandising e publicidade nos principais canais.
          </p>
          <button
            className="media-box-btn"
            onClick={() => {
              trackCtaClick("Quero crescer com método", "midia", "#cta");
              document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Quero crescer com método
          </button>

          <div className="media-press-box">
            <p className="media-press-title">Veja o que a imprensa já falou</p>
            <div className="media-press-logos">
              <a href="https://exame.com/negocios/franquias-com-receita-recorrente-conheca-20-negocios-com-fluxo-continuo-de-faturamento/" target="_blank" rel="noopener noreferrer" className="media-press-link">
                <img src="https://logo.clearbit.com/exame.com?size=200" alt="Exame" className="media-press-logo" />
              </a>
              <a href="https://www.portaldofranchising.com.br/noticias/franquias-atraem-pais-e-filhos/" target="_blank" rel="noopener noreferrer" className="media-press-link">
                <img src="https://logo.clearbit.com/portaldofranchising.com.br?size=200" alt="ABF Portal do Franchising" className="media-press-logo" />
              </a>
              <a href="https://guiadafarmacia.com.br/materia/oral-care-saude-comeca-pela-boca/" target="_blank" rel="noopener noreferrer" className="media-press-link">
                <img src="https://logo.clearbit.com/guiadafarmacia.com.br?size=200" alt="Guia da Farmácia" className="media-press-logo" />
              </a>
              <a href="https://www.terra.com.br/vida-e-estilo/conheca-5-procedimentos-esteticos-realizados-por-dentistas,c2d59c7e46c718bbab3b82d3e907f65duqrmbfy0.html" target="_blank" rel="noopener noreferrer" className="media-press-link">
                <img src="https://logo.clearbit.com/terra.com.br?size=200" alt="Terra" className="media-press-logo" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
