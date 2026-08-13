const ESPECIALIDADE_LABELS: Record<string, string> = {
  "clinico-geral": "Clinico Geral",
  ortodontia: "Ortodontia",
  "implante-protese": "Implante e Protese",
  endodontia: "Endodontia",
  outra: "Outra",
};

const CLINICA_LABELS: Record<string, string> = {
  propria: "sim_clinica_propria",
  socio: "sim_socio_clinica",
  nao: "nao_tem_clinica",
};

const PRAZO_LABELS: Record<string, string> = {
  "ate-3": "ate_3_meses",
  "3-6": "3_a_6_meses",
  "6-12": "6_a_12_meses",
  pesquisando: "pesquisando",
};

const CAPITAL_LABELS: Record<string, string> = {
  "450k-600k": "450k_600k",
  "600k-900k": "600k_900k",
  "900k+": "900k_mais",
};

export function mapEspecialidade(value: string) {
  return ESPECIALIDADE_LABELS[value] || value;
}

export function mapPossuiClinica(value: string) {
  return CLINICA_LABELS[value] || value;
}

export function mapPrazo(value: string) {
  return PRAZO_LABELS[value] || value;
}

export function mapCapital(value: string) {
  return CAPITAL_LABELS[value] || value;
}
