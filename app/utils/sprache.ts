// Deutsch ist die Hauptfassung und steht ohne Präfix unter /, die anderen
// Sprachen unter /fr/, /it/ und /en/. Die Pfade sind in allen Sprachen
// gleich, nur das Präfix unterscheidet sie.

export const SPRACHEN = [
  { code: 'de', tag: 'de-CH', name: 'Deutsch' },
  { code: 'fr', tag: 'fr-CH', name: 'Français' },
  { code: 'it', tag: 'it-CH', name: 'Italiano' },
  { code: 'en', tag: 'en', name: 'English' }
] as const

export type Sprache = (typeof SPRACHEN)[number]['code']

export const PRAEFIXE: Sprache[] = ['fr', 'it', 'en']

export function spracheAusPfad(pfad: string): Sprache {
  const treffer = pfad.match(/^\/(fr|it|en)(\/|$)/)
  return (treffer?.[1] as Sprache) ?? 'de'
}

// Pfad ohne Sprachpräfix, mit Schrägstrich am Ende: /fr/profil → /profil/
export function ohneSprache(pfad: string): string {
  const rest = pfad.replace(/^\/(fr|it|en)(?=\/|$)/, '') || '/'
  return rest.endsWith('/') ? rest : `${rest}/`
}

export function mitSprache(sprache: Sprache, pfad: string): string {
  return sprache === 'de' ? pfad : `/${sprache}${pfad === '/' ? '/' : pfad}`
}
