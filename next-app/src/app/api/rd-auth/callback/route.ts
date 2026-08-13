import { NextRequest, NextResponse } from "next/server";

// Rota administrativa: recebe o "code" que o RD envia após a autorização manual
// (via /api/rd-auth/start) e troca por access_token/refresh_token.
// Uso único — o refresh_token exibido aqui deve ser copiado para a variável
// de ambiente RD_REFRESH_TOKEN e essa rota não é mais necessária no dia a dia.
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const clientId = process.env.RD_CLIENT_ID;
  const clientSecret = process.env.RD_CLIENT_SECRET;
  const redirectUri = process.env.RD_REDIRECT_URI;

  if (!code) {
    return NextResponse.json(
      { error: "Parâmetro 'code' ausente na URL." },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }
  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json(
      { error: "RD_CLIENT_ID, RD_CLIENT_SECRET ou RD_REDIRECT_URI não configurados." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }

  const res = await fetch("https://api.rd.services/auth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Falha ao trocar o code por tokens.", detail: await res.text() },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    );
  }

  const data = await res.json();

  return new NextResponse(
    `<html><body style="font-family: sans-serif; padding: 40px; max-width: 640px; margin: 0 auto;">
      <h2>Autorização concluída</h2>
      <p>Copie o valor abaixo e salve como a variável de ambiente <code>RD_REFRESH_TOKEN</code> no painel de deploy (HML/PROD). Depois disso, esta página não é mais necessária.</p>
      <p><strong>refresh_token:</strong></p>
      <pre style="background:#f4f4f4; padding:12px; border-radius:6px; word-break:break-all;">${data.refresh_token}</pre>
    </body></html>`,
    {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    }
  );
}
