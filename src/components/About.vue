<template>
  <section id="about" class="frame mx-auto max-w-[110rem] py-24 md:py-32">
    <h2 class="sr-only">{{ t('about.title') }}</h2>
    <div class="grid gap-12 md:grid-cols-[3fr_1fr] md:gap-16">
      <p
        data-reveal
        class="text-[1.0625rem] leading-[1.5] md:text-[clamp(1.125rem,1.7vw,1.5rem)] md:leading-[1.3] md:columns-2 md:gap-12 md:text-justify md:hyphens-auto"
        :lang="locale"
      >
        <!-- Sul telefono il testo va a capo per paragrafi e il primo è più grande; da md in su scorre come un'unica colonna. -->
        <span v-for="(para, k) in paragraphs" :key="k" :class="k === 0 ? 'max-md:mb-6 max-md:block max-md:text-[1.5rem] max-md:leading-[1.25]' : 'max-md:mb-5 max-md:block'">
          <template v-for="(part, i) in para" :key="i">
            <mark v-if="part.mark" class="mark" :style="{ backgroundColor: part.color }">{{ part.text }}</mark>
            <template v-else>{{ part.text }}</template>
          </template>
          {{ ' ' }}
        </span>
        <a
          href="#contact"
          class="mt-8 inline-flex min-h-12 items-center bg-accent px-4 py-2 font-medium text-on-accent max-md:w-full press hover:-translate-y-0.5"
        >
          {{ t('about.closing') }}
        </a>
      </p>
      <div class="flex flex-col gap-10 md:self-start">
        <figure data-reveal class="m-0">
          <img
            src="/img/antonio.webp"
            :alt="t('about.portraitAlt')"
            width="560"
            height="560"
            loading="lazy"
            class="block w-full"
          />
        </figure>
        <figure data-reveal style="--d: 120ms" class="m-0">
          <img
            src="/img/cody.webp"
            :alt="t('about.catAlt')"
            width="560"
            height="700"
            loading="lazy"
            class="block w-full"
          />
          <figcaption class="mt-3 text-sm text-muted">{{ t('about.catCaption') }}</figcaption>
        </figure>
      </div>
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

// Il testo è un'unica stringa i18n: lo spezzo ogni due frasi; ogni parola evidenziata vale solo alla prima occorrenza.
const paragraphs = computed(() => {
  const sentences = t('about.description').split(/(?<=[.!?])\s+/)
  const used = new Set<string>()
  const out: { text: string; mark: boolean; color?: string }[][] = []
  for (let n = 0; n < sentences.length; n += 2) {
    let rest = sentences.slice(n, n + 2).join(' ')
    const hits = marks
      .filter(([word]) => !used.has(word))
      .map(([word, color]) => ({ word, color, at: rest.indexOf(word) }))
      .filter((h) => h.at >= 0)
      .sort((a, b) => a.at - b.at)
    const para: { text: string; mark: boolean; color?: string }[] = []
    let offset = 0
    for (const h of hits) {
      const at = h.at - offset
      if (at < 0) continue
      if (at > 0) para.push({ text: rest.slice(0, at), mark: false })
      para.push({ text: h.word, mark: true, color: h.color })
      used.add(h.word)
      rest = rest.slice(at + h.word.length)
      offset = h.at + h.word.length
    }
    para.push({ text: rest, mark: false })
    out.push(para)
  }
  return out
})
</script>
