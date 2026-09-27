import type { Sprache } from '~/utils/sprache'

// Sprache der aktuellen Seite und ein Helfer für interne Links.
// `texte` ist ein Objekt mit je einer Fassung pro Sprache, `t` die passende.
export function useSprache<T>(texte?: Record<Sprache, T>) {
  const route = useRoute()
  const sprache = computed(() => spracheAusPfad(route.path))
  const pfad = (ziel: string) => mitSprache(sprache.value, ziel)
  const t = computed(() => texte?.[sprache.value] as T)
  return { sprache, pfad, t }
}
