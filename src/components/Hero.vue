<template>
  <section class="mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-end px-5 pb-16 pt-24 md:px-8 md:pb-24">
    <p class="mb-4 text-lg text-muted">{{ t('hero.greeting') }}</p>
    <h1 class="font-display leading-[0.92] tracking-tighter text-[clamp(2.5rem,9.5vw,8.5rem)]">
      <span class="name-in block whitespace-nowrap">{{ first }}</span>
      <span class="name-in block whitespace-nowrap text-accent">{{ last }}</span>
    </h1>

    <div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-end">
      <div>
        <p class="font-display text-2xl font-semibold md:text-3xl">{{ t('hero.title') }}</p>
        <p class="mt-3 max-w-[48ch] text-lg text-muted">{{ t('hero.description') }}</p>
      </div>
      <div class="flex flex-wrap gap-3">
        <a
          href="#projects"
          class="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-accent px-6 py-3.5 font-medium text-on-accent transition-transform active:scale-[0.98]"
        >
          {{ t('hero.cta') }}
          <ArrowDown :size="18" />
        </a>
        <a
          href="#contact"
          class="inline-flex items-center whitespace-nowrap rounded-md border border-field px-6 py-3.5 font-medium transition-colors hover:border-accent hover:text-accent active:scale-[0.98]"
        >
          {{ t('contact.title') }}
        </a>
        <a
          href="/cv-antonio-fiume.pdf"
          download
          class="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-field px-6 py-3.5 font-medium transition-colors hover:border-accent hover:text-accent active:scale-[0.98]"
        >
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
// Il nome va su due righe fisse: così l'animazione di larghezza non fa saltare l'a capo.
const parts = computed(() => t('hero.name').split(' '))
const last = computed(() => parts.value.slice(-1)[0])
const first = computed(() => parts.value.slice(0, -1).join(' '))
</script>
