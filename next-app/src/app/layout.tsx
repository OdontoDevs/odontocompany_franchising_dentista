import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-brand",
  subsets: ["latin"],
  display: "swap",
});

const GTM_ID = "GTM-WGJGL3D";

const brandLogo =
  "https://pub-db8ed4fb33634589a6ce5fb07e85cb46.r2.dev/landingpage_odc_franchising/logo_odontocompany%20(2).svg";

const pageTitle = "OdontoCompany Franchising - Seja um franqueado";
const pageDescription =
  "Abra sua clínica OdontoCompany com o suporte completo da maior rede de franquias odontológicas do Brasil. Invista em um negócio consolidado com marketing, gestão e operação prontos.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  icons: {
    icon: brandLogo,
    shortcut: brandLogo,
    apple: brandLogo,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "https://lp-odc.op7franquia.com.br/",
    siteName: "OdontoCompany Franchising",
    images: [
      {
        url: brandLogo,
        alt: "OdontoCompany Franchising",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [brandLogo],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* Script nativo de rastreamento do RD Station — gera o cookie _rdtrk usado como client_tracking_id */}
        <Script
          id="rd-station-tracking"
          strategy="afterInteractive"
          src="https://d335luupugsy2.cloudfront.net/js/loader-scripts/54159491-bf1c-4952-844e-e6953d248069-loader.js"
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
