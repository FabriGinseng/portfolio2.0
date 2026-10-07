<template>
  <section id="about" class="border-t border-line py-24 md:py-32">
    <div class="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1fr_2fr] md:px-8">
      <h2 class="font-display text-3xl font-semibold tracking-tight md:text-4xl">{{ t('about.title') }}</h2>
      <div>
        <p
          v-for="(para, i) in paragraphs"
          :key="i"
          class="mb-5 max-w-[65ch] text-lg leading-relaxed text-muted"
        >
          {{ para }}
        </p>
        <dl class="mt-12 flex gap-14">
          <div>
            <dt class="text-sm text-muted">{{ t('about.years') }}</dt>
            <dd class="font-display text-5xl font-bold tracking-tight">{{ new Date().getFullYear() - 2017 }}+</dd>
          </div>
          <div>
            <dt class="text-sm text-muted">{{ t('about.projects') }}</dt>
            <dd class="font-display text-5xl font-bold tracking-tight">10+</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Il testo è un'unica stringa i18n: lo spezzo ogni due frasi per renderlo leggibile.
const paragraphs = computed(() => {
  const sentences = t('about.description').split(/(?<=[.!?])\s+/)
  const out: string[] = []
  for (let i = 0; i < sentences.length; i += 2) out.push(sentences.slice(i, i + 2).join(' '))
  return out
})
</script>
