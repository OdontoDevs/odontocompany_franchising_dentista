const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

const CLICK_ID_KEYS = ["gclid", "fbclid", "wbraid", "gbraid", "msclkid"] as const;

const ATTR_STORAGE_KEY = "oc_dentistas_attribution";
const FROM_URL_KEY = "oc_dentistas_from_url";

// Cookie do script nativo de rastreamento do RD Station, confirmado na documentação oficial
// (https://developers.rdstation.com/reference/conversao): "Valor de um cookie '_rdtrk'."
// Formato esperado é um UUID (ex: 43b00843-09af-4fae-bf9d-a0697640b808).
const RD_TRACKING_COOKIE_NAME = "_rdtrk";

export type UtmParams = Record<(typeof UTM_KEYS)[number], string>;
export type ClickIdParams = Record<(typeof CLICK_ID_KEYS)[number], string>;

export type AttributionParams = UtmParams &
  ClickIdParams & {
    page_url: string;
    from_url: string;
    referrer: string;
  };

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function emptyUtms(): UtmParams {
  return {
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
  };
}

function emptyClickIds(): ClickIdParams {
  return {
    gclid: "",
    fbclid: "",
    wbraid: "",
    gbraid: "",
    msclkid: "",
  };
}

export function pushDataLayer(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

export function captureAttribution(): AttributionParams {
  if (typeof window === "undefined") {
    return {
      ...emptyUtms(),
      ...emptyClickIds(),
      page_url: "",
      from_url: "",
      referrer: "",
    };
  }

  const params = new URLSearchParams(window.location.search);
  const storedRaw = sessionStorage.getItem(ATTR_STORAGE_KEY);
  const stored = storedRaw ? (JSON.parse(storedRaw) as Partial<AttributionParams>) : {};

  const next: AttributionParams = {
    ...emptyUtms(),
    ...emptyClickIds(),
    page_url: window.location.href,
    from_url: sessionStorage.getItem(FROM_URL_KEY) || window.location.href,
    referrer: document.referrer || "",
  };

  if (!sessionStorage.getItem(FROM_URL_KEY)) {
    sessionStorage.setItem(FROM_URL_KEY, window.location.href);
    next.from_url = window.location.href;
  }

  for (const key of UTM_KEYS) {
    next[key] = params.get(key) || stored[key] || "";
  }
  for (const key of CLICK_ID_KEYS) {
    next[key] = params.get(key) || stored[key] || "";
  }

  sessionStorage.setItem(ATTR_STORAGE_KEY, JSON.stringify(next));
  return next;
}

/**
 * Sem UTM, classifica a origem como "organico" (usando o domínio do referrer) quando existe
 * um referrer externo, ou "direto" quando não há nenhuma pista de origem (acesso direto,
 * favorito, ou referrer do próprio domínio).
 */
export function resolveTrafficSource(
  utmSource: string,
  utmMedium: string,
  referrer: string
): { source: string; medium: string } {
  if (utmSource) {
    return { source: utmSource, medium: utmMedium || "" };
  }
  if (!referrer) {
    return { source: "direto", medium: "direto" };
  }
  try {
    const referrerHost = new URL(referrer).hostname.replace(/^www\./, "");
    const currentHost = typeof window !== "undefined" ? window.location.hostname : "";
    if (referrerHost && referrerHost !== currentHost) {
      return { source: referrerHost, medium: "organico" };
    }
  } catch {
    // referrer malformado — cai no fallback abaixo
  }
  return { source: "direto", medium: "direto" };
}

function getCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

/** Lê o cookie do script nativo do RD Station, se o script estiver instalado. */
export function getClientTrackingId(): string {
  return getCookie(RD_TRACKING_COOKIE_NAME);
}

export function trackCtaClick(ctaText: string, ctaSection: string, ctaUrl = "#cta") {
  pushDataLayer({
    event: "cta_click",
    cta_text: ctaText,
    cta_section: ctaSection,
    cta_url: ctaUrl,
  });
}

export function trackVideoPlay(videoTitle: string, videoUrl: string) {
  pushDataLayer({
    event: "video_play",
    video_title: videoTitle,
    video_url: videoUrl,
  });
}

export function createEventId() {
  const now = new Date();
  const stamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
    String(now.getSeconds()).padStart(2, "0"),
  ].join("");
  const suffix = Math.floor(10000 + Math.random() * 90000);
  return `oc_dentistas_${stamp}_${suffix}`;
}

export { UTM_KEYS, CLICK_ID_KEYS };
