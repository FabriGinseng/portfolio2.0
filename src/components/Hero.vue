<template>
  <section class="hero field relative overflow-x-clip" style="--f-ink: var(--f-hero-ink); background: var(--f-hero); color: var(--f-hero-ink)">
    <div class="frame relative mx-auto flex min-h-[100dvh] max-w-[110rem] flex-col justify-end pb-14 pt-[calc(24vh+7rem)] md:pb-12 md:pt-[calc(min(28vh,22rem)+6.5rem)]">
      <!-- Dorsi in colore: decorazione, salgono uno dopo l'altro. -->
      <div aria-hidden="true" class="pointer-events-none absolute inset-x-5 top-20 flex h-[24vh] items-end gap-[6px] md:inset-x-8 md:top-20 md:h-[min(28vh,22rem)] md:gap-3">
        <span
          v-for="(bar, i) in bars"
          :key="i"
          class="hero-bar min-w-0 flex-1"
          :style="{ height: `${bar[0]}%`, backgroundColor: bar[1], '--i': i }"
        />
      </div>

      <h1 class="hero-name font-display font-bold leading-[0.9] tracking-[-0.045em] text-[clamp(2.75rem,10.5vw,9.5rem)] max-md:text-[22vw]">
        <!-- Sul telefono resta «Fabrizio Fiume», molto più grande; il primo nome rimane per i lettori di schermo. -->
        <span class="line-mask split-a"><span class="whitespace-nowrap"><span class="max-md:sr-only">{{ given }}{{ ' ' }}</span>{{ middle }}</span></span>
        <span class="line-mask split-b"><span class="whitespace-nowrap"><span class="surname text-[var(--s-amber)]">{{ last }}</span></span></span>
      </h1>

      <div class="after-title mt-8 md:mt-8">
        <p class="font-display text-2xl font-semibold">{{ t('hero.title') }}</p>
        <p class="mt-3 max-w-[34ch] text-xl leading-snug">{{ t('hero.description') }}</p>
        <div class="mt-10 flex flex-col gap-5 md:flex-row md:items-center md:gap-10">
          <a
            href="#projects"
            class="btn inline-flex min-h-14 items-center justify-center gap-3 whitespace-nowrap px-9 py-4 text-lg font-semibold press max-md:w-full md:min-h-16 md:px-12 md:text-xl"
            style="--b-bg: var(--s-amber); --b-ink: #14141a; --b-sweep: #ffffff"
          >
            {{ t('hero.cta') }}
            <ArrowDown :size="22" />
          </a>
          <a href="/cv-antonio-fiume.pdf" download class="inline-flex min-h-11 items-center justify-center gap-2 py-2 font-medium underline underline-offset-4 transition-colors hover:text-[var(--s-amber)]">
            {{ t('hero.cv') }}
            <Download :size="18" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowDown, Download } from 'lucide-vue-next'

const { t } = useI18n()
// Il nome va su due righe fisse: la prima porta nome e secondo nome, la seconda il cognome.
const parts = computed(() => t('hero.name').split(' '))
const last = computed(() => parts.value.slice(-1)[0])
const given = computed(() => parts.value[0])
// Dal secondo nome in poi, fino al cognome escluso.
const middle = computed(() => parts.value.slice(1, -1).join(' '))

// Altezza (%) e colore dei cinque dorsi.
const bars = [
  [62, 'var(--s-blue)'],
  [100, 'var(--s-orange)'],
  [78, 'var(--s-green)'],
  [46, 'var(--s-pink)'],
  [88, 'var(--s-amber)'],
] as const
</script>
