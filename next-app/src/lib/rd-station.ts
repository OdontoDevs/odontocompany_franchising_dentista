import {
  mapCapital,
  mapEspecialidade,
  mapPossuiClinica,
  mapPrazo,
} from "@/lib/lead-fields";

const RD_TOKEN_URL = "https://api.rd.services/auth/token";
const RD_EVENTS_URL = "https://api.rd.services/platform/events";

const CONVERSION_IDENTIFIER = "LP Dentistas OdontoCompany";
const LEAD_TAGS = ["lp_dentistas", "b2b_franquias", "franquia_dentista"];

let cachedAccessToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now()) {
    return cachedAccessToken.token;
  }

  const clientId = process.env.RD_CLIENT_ID;
  const clientSecret = process.env.RD_CLIENT_SECRET;
  const refreshToken = process.env.RD_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "RD Station: variáveis de ambiente ausentes (RD_CLIENT_ID/RD_CLIENT_SECRET/RD_REFRESH_TOKEN)."
    );
  }

  const res = await fetch(RD_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) {
    throw new Error(
      `RD Station: falha ao renovar access_token (${res.status}): ${await res.text()}`
    );
  }

  const data = await res.json();
  cachedAccessToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };
  return cachedAccessToken.token;
}

export type RdLeadInput = {
  name: string;
  email: string;
  personalPhone: string;
  especialidade: string;
  anosFormado: string;
  cidadeInteresse: string;
  estado: string;
  possuiClinica: string;
  prazoAbertura: string;
  capitalInvestimento: string;
  eventId: string;
  trafficSource: string;
  trafficMedium: string;
  utmSource?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
  fbclid?: string;
  wbraid?: string;
  gbraid?: string;
  msclkid?: string;
  conversionUrl?: string;
  clientTrackingId?: string;
};

export type RdConversionResult = {
  leadId?: string;
};

export async function sendConversionToRD(lead: RdLeadInput): Promise<RdConversionResult> {
  const accessToken = await getAccessToken();

  const res = await fetch(RD_EVENTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      event_type: "CONVERSION",
      event_family: "CDP",
      event_id: lead.eventId,
      payload: {
        conversion_identifier: CONVERSION_IDENTIFIER,
        name: lead.name,
        email: lead.email,
        personal_phone: lead.personalPhone,
        city: lead.cidadeInteresse,
        state: lead.estado,
        traffic_source: lead.trafficSource,
        traffic_medium: lead.trafficMedium,
        traffic_campaign: lead.utmCampaign || "",
        traffic_term: lead.utmTerm || "",
        traffic_value: lead.utmContent || "",
        conversion_url: lead.conversionUrl || "",
        client_tracking_id: lead.clientTrackingId || "",
        gclid: lead.gclid || "",
        fbclid: lead.fbclid || "",
        wbraid: lead.wbraid || "",
        gbraid: lead.gbraid || "",
        msclkid: lead.msclkid || "",
        tags: LEAD_TAGS,
        cf_dentistas_especialidade: mapEspecialidade(lead.especialidade),
        cf_dentistas_anos_formado: lead.anosFormado,
        cf_dentistas_cidade_interesse: lead.cidadeInteresse,
        cf_dentistas_estado: lead.estado,
        cf_dentistas_possui_clinica: mapPossuiClinica(lead.possuiClinica),
        cf_dentistas_prazo_abertura_clinica: mapPrazo(lead.prazoAbertura),
        cf_dentistas_capital_investimento: mapCapital(lead.capitalInvestimento),
      },
    }),
  });

  if (!res.ok) {
    throw new Error(
      `RD Station: falha ao registrar conversão (${res.status}): ${await res.text()}`
    );
  }

  const data = await res.json().catch(() => ({}));
  console.log("RD Station: resposta do evento de conversão:", data);

  return { leadId: data?.event_uuid || data?.uuid || data?.id || undefined };
}
