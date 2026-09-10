<script setup lang="ts">
const dunkel = ref(false)

function umschalten() {
  const wert = !dunkel.value
  dunkel.value = wert
  document.documentElement.dataset.thema = wert ? 'dunkel' : 'hell'
  try {
    localStorage.setItem('thema', wert ? 'dunkel' : 'hell')
  } catch {
    // Speicher gesperrt: die Wahl gilt dann nur fuer diesen Besuch.
  }
}

onMounted(() => {
  dunkel.value = document.documentElement.dataset.thema === 'dunkel'
})
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="dunkel"
    aria-label="Dunkles Farbschema"
    class="schalter"
    @click="umschalten"
  >
    <span class="schalter-knopf">
      <svg class="schalter-sonne" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.4" />
        <g stroke-linecap="round" stroke-width="2">
          <path d="M12 1.4v2.2M12 20.4v2.2M1.4 12h2.2M20.4 12h2.2" />
          <path d="M4.4 4.4 6 6M18 18l1.6 1.6M19.6 4.4 18 6M6 18l-1.6 1.6" />
        </g>
      </svg>
      <svg class="schalter-mond" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
      </svg>
    </span>
  </button>
</template>
