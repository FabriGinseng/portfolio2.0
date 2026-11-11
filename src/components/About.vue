<template>
  <section id="about" data-field class="field overflow-x-clip" style="background: var(--f-about); color: var(--f-ink)">
    <div class="frame mx-auto max-w-[110rem] py-20 md:py-28">
    <h2 class="text-title font-display font-bold" data-reveal>{{ t('about.title') }}</h2>
    <div class="mt-10 grid gap-12 md:mt-14 md:grid-cols-[minmax(0,60ch)_1fr] md:gap-16 lg:gap-24">
      <div class="text-[1.0625rem] leading-[1.55] md:text-xl md:leading-[1.5]" :lang="locale">
        <p
          v-for="(para, k) in paragraphs"
          :key="k"
          data-reveal
          :class="k === 0 ? 'mb-6 max-md:text-[1.5rem] max-md:leading-[1.25]' : 'mb-5'"
        >
          <template v-for="(part, i) in para" :key="i">
            <mark v-if="part.mark" class="mark" :style="{ '--mc': part.color }">{{ part.text }}</mark>
            <template v-else>{{ part.text }}</template>
          </template>
        </p>
        <a
          href="#contact"
          class="btn mt-6 inline-flex min-h-12 items-center px-6 py-2 font-medium max-md:w-full press"
          style="--b-bg: #14141a; --b-ink: #ffffff; --b-sweep: var(--m-violet)"
        >
          {{ t('about.closing') }}
        </a>
      </div>
      <div class="md:self-start">
        <div class="flex items-start pb-6">
          <img
            data-reveal
            style="--r: -2deg"
            src="/img/antonio.webp"
            :alt="t('about.portraitAlt')"
            width="560"
            height="560"
            loading="lazy"
            class="photo block aspect-[4/5] w-1/2 flex-1 object-cover"
          />
          <img
            data-reveal
            style="--d: 150ms; --r: 2deg"
            src="/img/cody.webp"
            :alt="t('about.catAlt')"
            width="620"
            height="770"
            loading="lazy"
            class="photo relative z-10 -ml-6 mt-10 block aspect-[4/5] w-1/2 flex-1 object-cover md:-ml-8 md:mt-14"
          />
        </div>
        <p class="mt-3 text-right text-sm">{{ t('about.catCaption') }}</p>
      </div>
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
  ['Vue.js', 'var(--m-green)'],
  ['Campania in Salute', 'var(--m-blue)'],
  ['Ionic + Vue', 'var(--m-violet)'],
  ['PWA', 'var(--m-pink)'],
  ['Node.js', 'var(--m-red)'],
  ['My Book Club', 'var(--m-blue)'],
  ['second brain', 'var(--m-green)'],
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
