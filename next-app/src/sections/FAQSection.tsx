"use client";

import { useState } from "react";
import { faqData } from "@/data/faq";
import { trackCtaClick } from "@/lib/tracking";

export default function FAQSection() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setActiveFaq((prev) => (prev === index ? null : index));
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="section-kicker section-kicker--light">Dúvidas frequentes</div>
        <div className="faq-layout">
          <div className="faq-sticky">
            <h2 className="section-title">
              Tem dúvidas? <em>Temos as respostas.</em>
            </h2>
            <p className="section-sub">
              Perguntas comuns de quem está avaliando o modelo de franquia para
              dentistas.
            </p>
            <div className="faq-form-mini">
              <div className="faq-form-mini-title">Ainda com dúvidas?</div>
              <p className="faq-form-mini-sub">
                Fale diretamente com um consultor de expansão. Sem compromisso.
              </p>
              <button
                className="form-submit"
                onClick={() => {
                  trackCtaClick(
                    "Falar com um consultor agora",
                    "faq",
                    "#cta"
                  );
                  document
                    .getElementById("cta")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Falar com um consultor agora &rarr;
              </button>
            </div>
          </div>

          <div className="faq-list">
            {faqData.map((item, index) => (
              <div
                key={index}
                className={`faq-item${activeFaq === index ? " open" : ""}`}
              >
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  <span className="faq-q-text">{item.question}</span>
                  <div className="faq-chevron">
                    <svg fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
                <div className="faq-answer">
                  <div
                    className="faq-answer-inner"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
