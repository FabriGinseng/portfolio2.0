<template>
  <section id="experience" class="frame mx-auto max-w-[110rem] py-24 md:py-32">
    <h2 class="sr-only">{{ t('experience.title') }}</h2>

    <ol>
      <li v-for="item in experiences" :key="item.company" data-reveal class="py-6 md:py-10">
        <div class="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
          <h3 class="text-head font-display font-bold leading-[0.92] tracking-[-0.04em]">{{ item.company }}</h3>
          <p class="tabular-nums">{{ item.period }}</p>
        </div>
        <div class="mt-6 grid gap-6 md:grid-cols-[1fr_2fr]">
          <p class="font-display text-2xl font-semibold">{{ item.position }}</p>
          <ul class="max-w-[60ch] space-y-2">
            <li v-for="line in bullets(item.description)" :key="line">{{ line }}</li>
          </ul>
        </div>
      </li>
    </ol>

    <div class="mt-24 grid gap-16 md:mt-36 md:grid-cols-[3fr_2fr] md:gap-12">
      <div data-reveal>
        <h3 class="font-display text-2xl font-bold tracking-tight">{{ t('background.title') }}</h3>
        <ul class="mt-8 space-y-8">
          <li v-for="i in 2" :key="i" class="grid gap-1 md:grid-cols-[10rem_1fr] md:gap-6">
            <p class="tabular-nums text-muted">{{ t(`background.education.${i - 1}.period`) }}</p>
            <div>
              <p class="font-display text-2xl font-semibold">{{ t(`background.education.${i - 1}.degree`) }}</p>
              <p class="text-accent">{{ t(`background.education.${i - 1}.institution`) }}</p>
              <p class="mt-2 max-w-[56ch]">{{ t(`background.education.${i - 1}.description`) }}</p>
            </div>
          </li>
        </ul>
        <a
          :href="t('background.publications.0.url')"
          target="_blank"
          rel="noopener noreferrer"
          class="group mt-12 flex items-start justify-between gap-6 bg-surface p-6 transition-transform hover:-translate-y-0.5"
        >
          <span>
            <span class="block font-display font-semibold group-hover:text-accent">{{ t('background.publications.0.title') }}</span>
            <span class="mt-2 block text-muted">{{ t('background.publications.0.publisher') }}, {{ t('background.publications.0.date') }}</span>
          </span>
          <ArrowUpRight :size="24" class="shrink-0" />
        </a>
      </div>
      <figure data-reveal style="--d: 120ms" class="m-0 overflow-hidden md:self-start">
        <img src="/img/library.webp" :alt="t('experience.libraryAlt')" width="1024" height="683" loading="lazy" class="drift block h-full w-full object-cover" />
      </figure>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowUpRight } from 'lucide-vue-next'

const { t } = useI18n()

// Le descrizioni con elenco sono una stringa "- a - b - c": le spezzo in punti.
const bullets = (key: string) =>
  t(key).replace(/^-\s*/, '').split(/\s+-\s+/).map((s) => s.trim()).filter(Boolean)

const experiences = computed(() => [
  { position: 'Senior Frontend Developer', company: 'Sorint .Lab', period: '2023 - ' + t('experience.present'), description: 'experience.sorint_description' },
  { position: 'Full Stack Developer', company: 'Gesan srl', period: '2018 - 2023', description: 'experience.gesan_description' },
  { position: 'Junior Software Developer', company: 'AK-12 srl', period: '2017 - 2018', description: 'experience.ak12_description' },
])
</script>
