export default function Footer() {
  return (
    <footer className="footer py-10">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-6 border-b border-white/15 w-full">
          <div className="footer-logo">
            <img
              src="https://pub-db8ed4fb33634589a6ce5fb07e85cb46.r2.dev/landingpage_odc_franchising/logo_odontocompany.svg"
              alt="OdontoCompany"
              className="h-10 w-auto object-contain opacity-95"
            />
          </div>
          <div className="footer-info text-center md:text-right text-xs leading-relaxed max-w-md text-white">
            <strong>ODONTOCOMPANY FRANCHISING S.A.</strong> · CNPJ 12.817.681/0001-64
            <br />
            Av. Ibirapuera, 2332 - Torre I - Indianópolis - São Paulo/SP · CEP 04028-900
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 text-[11px] text-white/85 w-full">
          <div className="footer-legal">
            *Valores referenciais baseados na média da rede. Resultados variam
            conforme mercado, localização e gestão do franqueado.
            <br />
            Metodologia OdontoCompany Franchising · Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-3">
            <img
              src="https://pub-db8ed4fb33634589a6ce5fb07e85cb46.r2.dev/landingpage_odc_franchising/icones%20rodap%C3%A9.webp"
              alt="Selos e certificações"
              className="h-9.5 w-auto object-contain opacity-90"
            />
            <a
              href="https://www.op7franchising.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-op7 flex items-center justify-center"
            >
              <img
                src="https://pub-db8ed4fb33634589a6ce5fb07e85cb46.r2.dev/logo/op7/logo_op7_sem_franchising.svg"
                alt="OP7"
                className="footer-op7-logo object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
