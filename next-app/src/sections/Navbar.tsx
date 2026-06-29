"use client";

import { useState } from "react";

const links = [
  { href: "#vantagens", label: "Vantagens" },
  { href: "#numeros", label: "Números" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "Dúvidas" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-inner">
          <div className="nav-logo">
            <img
              src="https://pub-db8ed4fb33634589a6ce5fb07e85cb46.r2.dev/landingpage_odc_franchising/logo_odontocompany.svg"
              alt="OdontoCompany"
              height="36"
            />
          </div>

          <div className="nav-links">
            {links.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <a href="#cta" className="nav-cta">
            Quero crescer com método &rarr;
          </a>

          <button
            className="nav-hamburger"
            type="button"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-controls="mobile-navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
          >
            <span className="nav-hamburger-line" />
            <span className="nav-hamburger-line" />
            <span className="nav-hamburger-line" />
          </button>

          {isOpen ? (
            <div className="nav-mobile-menu" id="mobile-navigation">
              {links.map((link) => (
                <a
                  className="nav-mobile-link"
                  href={link.href}
                  key={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                className="nav-mobile-link nav-mobile-link--cta"
                href="#cta"
                onClick={() => setIsOpen(false)}
              >
                Quero crescer com método
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
