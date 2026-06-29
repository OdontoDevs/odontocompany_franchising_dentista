"use server";

export async function submitCtaForm(formData: FormData) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const name = formData.get("name") as string;
  const whatsapp = formData.get("whatsapp") as string;
  const email = formData.get("email") as string;
  const especialidade = formData.get("especialidade") as string;
  const anosFormado = formData.get("anosFormado") as string;
  const city = formData.get("city") as string;
  const estado = formData.get("estado") as string;
  const clinica = formData.get("clinica") as string;
  const prazo = formData.get("prazo") as string;

  console.log("New Lead:", {
    name,
    whatsapp,
    email,
    especialidade,
    anosFormado,
    city,
    estado,
    clinica,
    prazo,
  });

  return { success: true, message: "Cadastro recebido com sucesso!" };
}
