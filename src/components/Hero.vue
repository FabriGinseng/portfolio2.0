<template>
  <section class="frame mx-auto flex min-h-[100dvh] max-w-[110rem] flex-col justify-end pb-14 pt-32 md:pb-20">
    <h1 class="font-display font-bold leading-[0.9] tracking-[-0.045em] text-[clamp(2.75rem,10.5vw,9.5rem)] max-md:text-[22vw]">
      <!-- Sul telefono resta «Fabrizio Fiume», molto più grande; il primo nome rimane per i lettori di schermo. -->
      <span class="line-mask"><span class="whitespace-nowrap"><span class="max-md:sr-only">{{ given }}{{ ' ' }}</span>{{ middle }}</span></span>
      <span class="line-mask"><span class="whitespace-nowrap text-accent">{{ last }}</span></span>
    </h1>

    <div class="after-title mt-10 grid gap-8 md:mt-14 md:grid-cols-[1fr_auto] md:items-end">
      <div>
        <p class="font-display text-2xl font-semibold">{{ t('hero.title') }}</p>
        <p class="mt-3 max-w-[40ch]">{{ t('hero.description') }}</p>
      </div>
      <div class="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:gap-x-8">
        <a
          href="#projects"
          class="inline-flex min-h-14 items-center justify-center gap-2 max-md:w-full md:min-h-12 whitespace-nowrap press bg-accent px-7 py-3 font-medium text-on-accent hover:-translate-y-0.5"
        >
          {{ t('hero.cta') }}
          <ArrowDown :size="18" />
        </a>
        <a href="/cv-antonio-fiume.pdf" download class="inline-flex min-h-11 items-center justify-center gap-2 py-2 font-medium underline underline-offset-4 transition-colors hover:text-accent">
          {{ t('hero.cv') }}
          <Download :size="18" />
        </a>
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
</script>
