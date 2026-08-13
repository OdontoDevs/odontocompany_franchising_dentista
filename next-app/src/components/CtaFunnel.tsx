"use client";

import { useEffect, useState } from "react";
import { submitCtaForm } from "@/app/actions";
import {
  CheckCircle2,
  ChevronRight,
  MapPin,
  User,
  Phone,
  Mail,
  Stethoscope,
  Calendar,
  Building2,
  Wallet,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CLICK_ID_KEYS,
  UTM_KEYS,
  captureAttribution,
  createEventId,
  pushDataLayer,
} from "@/lib/tracking";
import {
  mapCapital,
  mapEspecialidade,
  mapPossuiClinica,
  mapPrazo,
} from "@/lib/lead-fields";

const totalSteps = 6;

const BRAZIL_STATES = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

function isValidEmail(value: string) {
  return /^[A-Za-z0-9_\-.]+@[A-Za-z0-9_\-.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/.test(
    value
  );
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function CtaFunnel({ light = false }: { light?: boolean }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [anosFormado, setAnosFormado] = useState("");
  const [city, setCity] = useState("");
  const [estado, setEstado] = useState("");
  const [clinica, setClinica] = useState("");
  const [prazo, setPrazo] = useState("");
  const [capital, setCapital] = useState("");

  useEffect(() => {
    captureAttribution();
  }, []);

  const phoneDigits = whatsapp.replace(/\D/g, "").length;
  const emailValid = email === "" || isValidEmail(email);
  const phoneValid = whatsapp === "" || phoneDigits >= 10;

  const handleNext = () => {
    if (step === 1 && !name) return;
    if (step === 2 && (!whatsapp || phoneDigits < 10 || !isValidEmail(email))) return;
    if (step === 3 && !especialidade) return;
    if (step === 4 && (!city || !estado)) return;
    if (step === 5 && (!clinica || !prazo || !capital)) return;
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMessage("");
    const eventId = createEventId();
    const currentAttribution = captureAttribution();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("whatsapp", whatsapp);
    formData.append("email", email);
    formData.append("especialidade", especialidade);
    formData.append("anosFormado", anosFormado);
    formData.append("city", city);
    formData.append("estado", estado);
    formData.append("clinica", clinica);
    formData.append("prazo", prazo);
    formData.append("capital", capital);
    formData.append("event_id", eventId);
    for (const key of UTM_KEYS) {
      formData.append(key, currentAttribution[key]);
    }
    for (const key of CLICK_ID_KEYS) {
      formData.append(key, currentAttribution[key]);
    }
    formData.append("page_url", currentAttribution.page_url);
    formData.append("from_url", currentAttribution.from_url);
    formData.append("referrer", currentAttribution.referrer);

    const res = await submitCtaForm(formData);
    if (res.success) {
      pushDataLayer({
        event: "lead_form_submit_success",
        event_id: eventId,
        lead_id: res.leadId || "",
        rd_status: "success",
        conversion_identifier: "LP Dentistas OdontoCompany",
        form_id: "lp_dentistas",
        form_name: "formulario_dentistas",
        lead_type: "franquia_dentista",
        business_unit: "b2b_franquias",
        nome: name,
        email,
        telefone: whatsapp.replace(/\D/g, ""),
        especialidade: mapEspecialidade(especialidade),
        anos_formado: anosFormado,
        cidade_interesse: city,
        estado,
        possui_clinica: mapPossuiClinica(clinica),
        prazo_abertura_clinica: mapPrazo(prazo),
        capital_investimento: mapCapital(capital),
        utm_source: currentAttribution.utm_source,
        utm_medium: currentAttribution.utm_medium,
        utm_campaign: currentAttribution.utm_campaign,
        utm_content: currentAttribution.utm_content,
        utm_term: currentAttribution.utm_term,
        gclid: currentAttribution.gclid,
        fbclid: currentAttribution.fbclid,
        wbraid: currentAttribution.wbraid,
        gbraid: currentAttribution.gbraid,
        msclkid: currentAttribution.msclkid,
        page_url: currentAttribution.page_url,
        from_url: currentAttribution.from_url,
        referrer: currentAttribution.referrer,
      });
      setSuccess(true);
    } else {
      setErrorMessage(
        res.message || "Não foi possível enviar seu cadastro. Tente novamente."
      );
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div
        className={`cta-form-card${light ? " cta-form-card--light" : ""} flex flex-col items-center justify-center py-12 text-center`}
      >
        <CheckCircle2 className="w-16 h-16 text-[var(--lime)] mb-4" />
        <h3 className="hero-form-title mb-2">Plano enviado!</h3>
        <p className="hero-form-sub mb-6">
          Em até 2 horas úteis nosso time entra em contato com o plano de
          negócio personalizado para a sua cidade.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="form-submit bg-white/5 text-white border border-white/10"
        >
          Voltar ao início
        </button>
      </div>
    );
  }

  const confirmTags = [name, whatsapp, especialidade, city, estado].filter(Boolean);

  return (
    <div
      className={`cta-form-card${light ? " cta-form-card--light" : ""} overflow-hidden relative`}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
        <div
          className="h-full bg-[var(--lime)] transition-all duration-500 ease-out"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>

      <div className="hero-form-top pt-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-[var(--lime)]">
            Passo {step} de {totalSteps}
          </div>
        </div>
        <div className="hero-form-title">
          {step === 1 && "Receba seu plano de negócio personalizado"}
          {step === 2 && "Como falamos com você?"}
          {step === 3 && "Sua especialidade"}
          {step === 4 && "Sua cidade de interesse"}
          {step === 5 && "Seu momento atual"}
          {step === 6 && "Confirme seus dados"}
        </div>
        <p className="hero-form-sub">
          {step === 1 && "Resposta em até 2 horas úteis · Sem compromisso."}
          {step === 2 && "WhatsApp e e-mail para enviarmos o plano."}
          {step === 3 && "Para entendermos seu perfil clínico."}
          {step === 4 && "Verifique a disponibilidade de territórios exclusivos."}
          {step === 5 && "Clínica, prazo e capital disponível."}
          {step === 6 && "É só confirmar e receber o plano de negócio."}
        </p>
      </div>

      <div className="relative min-h-[180px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="form-group">
                <label className="form-label flex items-center gap-2">
                  <User className="w-4 h-4" /> Nome completo
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  placeholder="Seu nome"
                  autoFocus
                />
              </div>
              <button
                onClick={handleNext}
                disabled={!name}
                className="form-submit flex items-center justify-center gap-2 disabled:opacity-50"
              >
                Próximo <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="form-group">
                <label className="form-label flex items-center gap-2">
                  <Phone className="w-4 h-4" /> WhatsApp com DDD
                </label>
                <input
                  type="tel"
                  inputMode="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(formatPhone(e.target.value))}
                  className="form-input"
                  placeholder="(00) 00000-0000"
                  autoFocus
                  style={!phoneValid ? { borderColor: "#c0392b" } : undefined}
                />
              </div>
              <div className="form-group">
                <label className="form-label flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Melhor e-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="voce@email.com"
                  style={!emailValid ? { borderColor: "#c0392b" } : undefined}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setStep(1)}
                  className="form-submit bg-white/5 border border-white/10 !w-1/3"
                >
                  Voltar
                </button>
                <button
                  onClick={handleNext}
                  disabled={!whatsapp || phoneDigits < 10 || !isValidEmail(email)}
                  className="form-submit flex items-center justify-center gap-2 flex-1 disabled:opacity-50"
                >
                  Próximo <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="form-group">
                <label className="form-label flex items-center gap-2">
                  <Stethoscope className="w-4 h-4" /> Especialidade
                </label>
                <div className="relative">
                  <select
                    value={especialidade}
                    onChange={(e) => setEspecialidade(e.target.value)}
                    className="form-input select-dark appearance-none w-full"
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    <option value="clinico-geral">Clínico Geral</option>
                    <option value="ortodontia">Ortodontia</option>
                    <option value="implante-protese">Implante e Prótese</option>
                    <option value="endodontia">Endodontia</option>
                    <option value="outra">Outra</option>
                  </select>
                  <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 rotate-90 pointer-events-none" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Anos de formado
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={anosFormado}
                  onChange={(e) => setAnosFormado(e.target.value)}
                  className="form-input"
                  placeholder="Ex: 8"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setStep(2)}
                  className="form-submit bg-white/5 border border-white/10 !w-1/3"
                >
                  Voltar
                </button>
                <button
                  onClick={handleNext}
                  disabled={!especialidade}
                  className="form-submit flex items-center justify-center gap-2 flex-1 disabled:opacity-50"
                >
                  Próximo <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="form-group">
                <label className="form-label flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Cidade de interesse
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="form-input"
                  placeholder="Ex: Maringá"
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label className="form-label flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Estado
                </label>
                <div className="relative">
                  <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    className="form-input select-dark appearance-none w-full"
                  >
                    <option value="" disabled>
                      UF
                    </option>
                    {BRAZIL_STATES.map((uf) => (
                      <option key={uf} value={uf}>
                        {uf}
                      </option>
                    ))}
                  </select>
                  <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 rotate-90 pointer-events-none" />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setStep(3)}
                  className="form-submit bg-white/5 border border-white/10 !w-1/3"
                >
                  Voltar
                </button>
                <button
                  onClick={handleNext}
                  disabled={!city || !estado}
                  className="form-submit flex items-center justify-center gap-2 flex-1 disabled:opacity-50"
                >
                  Próximo <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="form-group">
                <label className="form-label flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> Já tem clínica própria?
                </label>
                <div className="relative">
                  <select
                    value={clinica}
                    onChange={(e) => setClinica(e.target.value)}
                    className="form-input select-dark appearance-none w-full"
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    <option value="propria">Sim, clínica própria</option>
                    <option value="socio">Sim, sócio em clínica</option>
                    <option value="nao">Não tenho clínica</option>
                  </select>
                  <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 rotate-90 pointer-events-none" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Prazo para abrir
                </label>
                <div className="relative">
                  <select
                    value={prazo}
                    onChange={(e) => setPrazo(e.target.value)}
                    className="form-input select-dark appearance-none w-full"
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    <option value="ate-3">Até 3 meses</option>
                    <option value="3-6">3 a 6 meses</option>
                    <option value="6-12">6 a 12 meses</option>
                    <option value="pesquisando">Pesquisando</option>
                  </select>
                  <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 rotate-90 pointer-events-none" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label flex items-center gap-2">
                  <Wallet className="w-4 h-4" /> Capital de investimento
                </label>
                <div className="relative">
                  <select
                    value={capital}
                    onChange={(e) => setCapital(e.target.value)}
                    className="form-input select-dark appearance-none w-full"
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    <option value="450k-600k">R$ 450k - R$ 600k</option>
                    <option value="600k-900k">R$ 600k - R$ 900k</option>
                    <option value="900k+">Acima de R$ 900k</option>
                  </select>
                  <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 rotate-90 pointer-events-none" />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setStep(4)}
                  className="form-submit bg-white/5 border border-white/10 !w-1/3"
                >
                  Voltar
                </button>
                <button
                  onClick={handleNext}
                  disabled={!clinica || !prazo || !capital}
                  className="form-submit flex items-center justify-center gap-2 flex-1 disabled:opacity-50"
                >
                  Próximo <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap gap-2">
                {confirmTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1 rounded-full border border-[var(--lime)]/30 bg-[var(--lime)]/10 text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {errorMessage && (
                <p className="text-sm text-center" style={{ color: "#e57373" }}>
                  {errorMessage}
                </p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => setStep(5)}
                  className="form-submit bg-white/5 border border-white/10 !w-1/3"
                  disabled={loading}
                >
                  Editar
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="form-submit flex items-center justify-center gap-2 flex-1 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    "Receber plano de negócio"
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="form-trust mt-4">
        <svg
          width="12"
          height="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>Dados protegidos · Sem compromisso · Resposta em até 2h.</span>
      </div>
    </div>
  );
}
