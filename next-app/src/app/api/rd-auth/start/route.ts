import { NextResponse } from "next/server";

// Rota administrativa: acesse /api/rd-auth/start logado como admin no RD Station
// para iniciar a autorização OAuth (uso único, não faz parte do fluxo do lead).
export const dynamic = "force-dynamic";

export async function GET() {
  const clientId = process.env.RD_CLIENT_ID;
  const redirectUri = process.env.RD_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      { error: "RD_CLIENT_ID ou RD_REDIRECT_URI não configurados nas variáveis de ambiente." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }

  const authUrl = new URL("https://api.rd.services/auth/dialog");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);

  return NextResponse.redirect(authUrl.toString(), {
    headers: { "Cache-Control": "no-store" },
  });
}
