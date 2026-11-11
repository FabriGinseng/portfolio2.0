<template>
  <section id="about" class="frame mx-auto max-w-[110rem] py-24 md:py-32">
    <h2 class="sr-only">{{ t('about.title') }}</h2>
    <div class="grid gap-12 md:grid-cols-[3fr_1fr] md:gap-16">
      <p
        data-reveal
        class="text-[clamp(1.125rem,1.7vw,1.5rem)] leading-[1.3] md:columns-2 md:gap-12 md:text-justify md:hyphens-auto"
        :lang="locale"
      >
        <template v-for="(part, i) in parts" :key="i">
          <mark v-if="part.mark" class="mark" :style="{ backgroundColor: part.color }">{{ part.text }}</mark>
          <template v-else>{{ part.text }}</template>
        </template>
        <a
          href="#contact"
          class="mt-8 inline-block bg-accent px-3 py-2 font-medium text-on-accent transition-transform hover:-translate-y-0.5"
        >
          {{ t('about.closing') }}
        </a>
      </p>
      <figure data-reveal style="--d: 120ms" class="m-0 overflow-hidden md:self-start">
        <img
          src="/img/naples-1754.jpg"
          :alt="t('about.mapAlt')"
          width="1000"
          height="915"
          loading="lazy"
          class="drift block w-full object-cover"
        />
      </figure>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

// Parole del testo evidenziate (uguali in italiano e inglese), nei colori dei Generi di My Book Club.
const marks = [
  ['Vue.js', 'var(--s-green)'],
  ['Campania in Salute', 'var(--s-blue)'],
  ['Ionic + Vue', 'var(--s-amber)'],
  ['PWA', 'var(--s-pink)'],
  ['Node.js', 'var(--s-orange)'],
  ['My Book Club', 'var(--s-blue)'],
  ['second brain', 'var(--s-green)'],
] as const

const parts = computed(() => {
  let rest = t('about.description')
  const out: { text: string; mark: boolean; color?: string }[] = []
  // Evidenzia la prima occorrenza di ogni parola, nell'ordine in cui compaiono nel testo.
  const hits = marks
    .map(([word, color]) => ({ word, color, at: rest.indexOf(word) }))
    .filter((h) => h.at >= 0)
    .sort((a, b) => a.at - b.at)
  let offset = 0
  for (const h of hits) {
    const at = h.at - offset
    if (at < 0) continue
    if (at > 0) out.push({ text: rest.slice(0, at), mark: false })
    out.push({ text: h.word, mark: true, color: h.color })
    rest = rest.slice(at + h.word.length)
    offset = h.at + h.word.length
  }
  out.push({ text: rest + ' ', mark: false })
  return out
})
</script>
