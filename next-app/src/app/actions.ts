"use server";

import { sendConversionToRD } from "@/lib/rd-station";

export async function submitCtaForm(formData: FormData) {
  const name = (formData.get("name") as string) || "";
  const whatsapp = (formData.get("whatsapp") as string) || "";
  const email = (formData.get("email") as string) || "";
  const especialidade = (formData.get("especialidade") as string) || "";
  const anosFormado = (formData.get("anosFormado") as string) || "";
  const city = (formData.get("city") as string) || "";
  const estado = (formData.get("estado") as string) || "";
  const clinica = (formData.get("clinica") as string) || "";
  const prazo = (formData.get("prazo") as string) || "";
  const capital = (formData.get("capital") as string) || "";
  const eventId = (formData.get("event_id") as string) || "";
  const utmSource = (formData.get("utm_source") as string) || "";
  const utmMedium = (formData.get("utm_medium") as string) || "";
  const utmCampaign = (formData.get("utm_campaign") as string) || "";
  const utmContent = (formData.get("utm_content") as string) || "";
  const utmTerm = (formData.get("utm_term") as string) || "";
  const gclid = (formData.get("gclid") as string) || "";
  const fbclid = (formData.get("fbclid") as string) || "";
  const wbraid = (formData.get("wbraid") as string) || "";
  const gbraid = (formData.get("gbraid") as string) || "";
  const msclkid = (formData.get("msclkid") as string) || "";
  const pageUrl = (formData.get("page_url") as string) || "";
  const fromUrl = (formData.get("from_url") as string) || "";
  const referrer = (formData.get("referrer") as string) || "";

  if (
    !name ||
    !whatsapp ||
    !email ||
    !especialidade ||
    !city ||
    !estado ||
    !clinica ||
    !prazo ||
    !capital
  ) {
    return { success: false, message: "Preencha todos os campos obrigatórios." };
  }

  let leadId: string | undefined;

  try {
    const result = await sendConversionToRD({
      name,
      email,
      personalPhone: whatsapp.replace(/\D/g, ""),
      especialidade,
      anosFormado,
      cidadeInteresse: city,
      estado,
      possuiClinica: clinica,
      prazoAbertura: prazo,
      capitalInvestimento: capital,
      eventId,
      trafficSource: utmSource || "site",
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      utmTerm,
      gclid,
      fbclid,
      wbraid,
      gbraid,
      msclkid,
      pageUrl,
      fromUrl,
      referrer,
    });
    leadId = result.leadId;
  } catch (error) {
    console.error("Falha ao enviar lead para o RD Station:", error);
    return {
      success: false,
      message: "Não foi possível enviar seu cadastro. Tente novamente.",
    };
  }

  console.log("Lead enviado ao RD Station:", {
    name,
    email,
    whatsapp,
    especialidade,
    city,
    estado,
    leadId,
  });

  return { success: true, message: "Cadastro recebido com sucesso!", leadId };
}
