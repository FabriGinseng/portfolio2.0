<template>
  <section id="background" class="border-t border-line py-24 md:py-32">
    <div class="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1fr_2fr] md:px-8">
      <h2 class="font-display text-3xl font-semibold tracking-tight md:text-4xl">{{ t('background.title') }}</h2>

      <div>
        <ul class="divide-y divide-line">
          <li v-for="i in 2" :key="i" class="grid gap-2 py-6 first:pt-0 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <p class="text-sm text-muted">{{ t(`background.education.${i - 1}.period`) }}</p>
            <div>
              <h3 class="font-display text-xl font-semibold">{{ t(`background.education.${i - 1}.degree`) }}</h3>
              <p class="mt-1 text-accent">{{ t(`background.education.${i - 1}.institution`) }}</p>
              <p class="mt-3 max-w-[60ch] text-muted">{{ t(`background.education.${i - 1}.description`) }}</p>
            </div>
          </li>
        </ul>

        <h3 class="mb-4 mt-16 font-display text-2xl font-semibold">{{ t('background.publicationsTitle') }}</h3>
        <a
          :href="t('background.publications.0.url')"
          target="_blank"
          rel="noopener noreferrer"
          class="group block border-t border-line pt-6"
        >
          <div class="flex items-start justify-between gap-6">
            <div>
              <h4 class="max-w-[48ch] font-display text-xl font-semibold group-hover:text-accent">
                {{ t('background.publications.0.title') }}
              </h4>
              <p class="mt-2 text-muted">
                {{ t('background.publications.0.publisher') }}, {{ t('background.publications.0.date') }}
              </p>
              <p class="mt-2 line-clamp-2 max-w-[60ch] text-sm text-muted">
                {{ t('background.publications.0.editors') }}
              </p>
            </div>
            <ArrowUpRight :size="24" class="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ArrowUpRight } from 'lucide-vue-next'

const { t } = useI18n()
</script>
