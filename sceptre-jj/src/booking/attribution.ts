/* ─────────────────────────────────────────────────────────────
   BOOKING · atribuição (UTM + click ids + URL de chegada) — só Webhook 1 (§4.3).
   Não entra no Webhook 2 para não tocar no contrato crítico do n8n.

   Duas persistências em sessionStorage, ambas first-touch:
   - nd_attribution: UTMs + fbclid/gclid. Só grava quando a URL traz ≥ 1 param.
   - nd_landing: landing_url + landing_referrer. Grava na PRIMEIRA visita da
     sessão mesmo sem param nenhum (é o rastro do tráfego que perdeu a UTM).
   ───────────────────────────────────────────────────────────── */

const KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'fbclid',
  'gclid',
] as const

const STORAGE_KEY = 'nd_attribution'
const LANDING_KEY = 'nd_landing'
const LANDING_URL_MAX = 1000

export type Attribution = Partial<Record<(typeof KEYS)[number], string>> & {
  landing_url?: string
  landing_referrer?: string
}

/** merge tag do GHL que não foi resolvida não é valor */
function isUsable(v: string | null | undefined): v is string {
  return !!v && !v.includes('{{') && !v.includes('}}')
}

function readFromUrl(): Attribution {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  const out: Attribution = {}
  for (const k of KEYS) {
    const v = params.get(k)
    if (isUsable(v)) out[k] = v.trim()
  }
  return out
}

function readLanding(): { landing_url?: string; landing_referrer?: string } {
  if (typeof window === 'undefined') return {}
  const out: { landing_url?: string; landing_referrer?: string } = {}
  /* nunca remover a query string: é ela que interessa; corta pelo fim */
  out.landing_url = window.location.href.slice(0, LANDING_URL_MAX)
  if (isUsable(document.referrer)) out.landing_referrer = document.referrer
  return out
}

/**
 * Chamar UMA vez no boot do app (main.tsx), antes de qualquer navegação poder
 * limpar a query string. First-touch: a primeira visita da sessão que trouxer
 * qualquer param vence, e navegação interna / tráfego direto não sobrescreve.
 * landing_url/referrer gravam na primeira visita MESMO sem param.
 */
export function captureAttribution(): void {
  try {
    if (!sessionStorage.getItem(LANDING_KEY)) {
      sessionStorage.setItem(LANDING_KEY, JSON.stringify(readLanding()))
    }
  } catch {
    /* modo privado / storage bloqueado — getAttribution cai na leitura direta */
  }
  const fromUrl = readFromUrl()
  if (Object.keys(fromUrl).length === 0) return
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return // first-touch, sem clobber
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl))
  } catch {
    /* idem */
  }
}

export function getAttribution(): Attribution {
  let params: Attribution | null = null
  let landing: { landing_url?: string; landing_referrer?: string } | null = null
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) params = JSON.parse(raw) as Attribution
  } catch {
    /* ignora e cai na leitura direta */
  }
  try {
    const raw = sessionStorage.getItem(LANDING_KEY)
    if (raw) landing = JSON.parse(raw) as { landing_url?: string }
  } catch {
    /* idem */
  }
  const out: Attribution = {
    ...(params ?? readFromUrl()),
    ...(landing ?? readLanding()),
  }
  if (out.landing_url) out.landing_url = out.landing_url.slice(0, LANDING_URL_MAX)
  return out
}

const META_SOURCES = new Set(['facebook', 'fb', 'instagram', 'ig', 'meta'])

/**
 * Source do contato no CRM, dinâmico pela atribuição (regra da operação):
 * fbclid ou utm_source de Meta → "Landing Page - Meta Ads"; gclid ou
 * utm_source google (QUALQUER medium, GMB conta como Google) →
 * "Landing Page - Google". Sem sinal pago, cai no rótulo padrão da academia.
 * O lead audit classifica pelo source, por isso os rótulos carregam
 * "Meta"/"Google" no nome.
 */
export function getSourceLabel(fallback: string): string {
  const a = getAttribution()
  const utm = (a.utm_source ?? '').trim().toLowerCase()
  if (a.fbclid || META_SOURCES.has(utm)) return 'Landing Page - Meta Ads'
  if (a.gclid || utm.includes('google')) return 'Landing Page - Google'
  return fallback
}
