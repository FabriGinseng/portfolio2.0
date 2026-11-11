<template>
  <section id="projects">
    <h2 class="sr-only">{{ t('projects.title') }}</h2>

    <!-- Il primo Progetto (order più basso) occupa un campo di colore intero. -->
    <div v-if="lead" class="bg-feature py-24 text-[#1c1c1c] md:py-36">
      <div class="frame mx-auto grid max-w-[110rem] items-center gap-12 md:grid-cols-2 md:gap-16">
        <div data-reveal>
          <img src="/img/my-book-club.jpg" alt="" width="64" height="64" class="mb-8 block h-16 w-16" />
          <h3 class="text-head font-display font-bold leading-[0.92] tracking-[-0.04em]">{{ lead.title }}</h3>
          <p class="mt-8 max-w-[44ch] text-2xl leading-snug">{{ lead.description[lang] }}</p>
          <p class="mt-4 font-medium">{{ lead.technologies.join(', ') }}</p>
          <a
            v-if="lead.liveUrl"
            :href="lead.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-10 inline-flex min-h-12 items-center gap-2 bg-[#1c1c1c] px-7 py-3 font-medium text-[#efeee9] press hover:-translate-y-0.5"
          >
            {{ t('projects.open') }}
            <ArrowUpRight :size="18" />
          </a>
        </div>
        <img
          v-if="lead.image"
          data-reveal
          style="--d: 120ms"
          :src="lead.image"
          :alt="lead.title"
          width="1200"
          height="630"
          class="block w-full"
        />
      </div>
    </div>

    <!-- Gli altri Progetti: un dorso per libro. -->
    <div class="frame mx-auto max-w-[110rem] py-24 md:py-36">
      <div class="flex flex-col justify-between gap-2 md:flex-row md:items-baseline">
        <h3 class="font-display text-2xl font-bold tracking-tight">{{ t('projects.subtitle') }}</h3>
        <p class="text-muted">{{ t('projects.shelf') }}</p>
      </div>
      <!-- Telefono: una pila di libri, una barra per progetto; da md in su i dorsi stanno in piedi sullo scaffale. -->
      <ul class="mt-10 flex flex-col gap-[6px] md:h-[28rem] md:flex-row md:items-end">
        <li
          v-for="(project, i) in shelf"
          :key="project.id"
          data-reveal
          class="shelf-item md:h-full md:min-w-0 md:max-w-28 md:flex-1 md:basis-0"
          :style="{ '--d': `${i * 90}ms` }"
        >
          <component
            :is="project.liveUrl ? 'a' : 'div'"
            :href="project.liveUrl"
            :target="project.liveUrl ? '_blank' : undefined"
            :rel="project.liveUrl ? 'noopener noreferrer' : undefined"
            class="spine flex min-h-14 items-baseline justify-between gap-4 overflow-hidden px-5 py-4 text-[#1c1c1c] md:block md:h-full md:px-3 md:py-5"
            :style="{ backgroundColor: colors[i % colors.length] }"
            :aria-label="`${project.title}: ${project.description[lang]}`"
          >
            <span class="block min-w-0 whitespace-nowrap font-bold max-md:truncate">{{ project.title }}</span>
            <span class="block whitespace-nowrap font-medium max-md:shrink-0">{{ project.technologies[0] }}</span>
          </component>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowUpRight } from 'lucide-vue-next'
import { projects } from '@/data/projects'

const { t, locale } = useI18n()
const lang = computed(() => (locale.value === 'it' ? 'it' : 'en'))
const lead = projects[0] as (typeof projects)[number] & { image?: string }
const shelf = projects.slice(1)
const colors = ['var(--s-blue)', 'var(--s-orange)', 'var(--s-green)', 'var(--s-pink)', 'var(--s-amber)']
</script>
