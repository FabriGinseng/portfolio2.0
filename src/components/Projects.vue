<template>
  <section id="projects">
    <!-- Il primo Progetto (order più basso) occupa un campo di colore intero. -->
    <div v-if="lead" data-field class="field py-20 md:py-28" style="background: var(--f-lead); color: var(--f-ink)">
      <h2 class="frame mx-auto mb-12 max-w-[110rem] text-title font-display font-bold md:mb-16" data-reveal>{{ t('projects.title') }}</h2>
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
            class="btn mt-10 inline-flex min-h-12 items-center gap-2 px-7 py-3 font-medium press"
            style="--b-bg: #14141a; --b-ink: #ffffff; --b-sweep: var(--m-violet)"
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
    <div data-field class="field" style="background: var(--f-shelf); color: var(--f-shelf-ink); --f-ink: var(--f-shelf-ink)">
     <div class="frame mx-auto max-w-[110rem] pb-20 pt-16 md:pb-28 md:pt-24">
      <p class="text-lg">{{ t('projects.shelf') }}</p>
      <!-- Telefono: una pila di libri, una barra per progetto; da md in su i dorsi stanno in piedi sullo scaffale. -->
      <ul class="mt-8 flex flex-col gap-[6px] md:h-[36rem] md:flex-row md:items-end md:gap-2">
        <li
          v-for="(project, i) in shelf"
          :key="project.id"
          data-reveal
          class="shelf-item group relative md:h-[var(--h)] md:min-w-0 md:flex-1 md:basis-0"
          :style="{ '--d': `${i * 80}ms`, '--h': `${heights[i % heights.length]}%` }"
        >
          <component
            :is="project.liveUrl ? 'a' : 'div'"
            :href="project.liveUrl"
            :target="project.liveUrl ? '_blank' : undefined"
            :rel="project.liveUrl ? 'noopener noreferrer' : undefined"
            :tabindex="project.liveUrl ? undefined : 0"
            class="spine flex min-h-14 items-baseline justify-between gap-4 overflow-hidden px-5 py-4 text-[#14141a] md:block md:h-full md:w-full md:px-3 md:py-6 lg:px-4"
            :style="{ backgroundColor: colors[i % colors.length] }"
            :aria-label="`${project.title}: ${project.description[lang]}`"
          >
            <span class="block min-w-0 whitespace-nowrap font-bold max-md:truncate md:text-xl">{{ project.title }}</span>
            <span class="block whitespace-nowrap font-medium max-md:shrink-0 md:mt-4 md:text-base md:max-lg:hidden">{{ project.technologies[0] }}</span>
          </component>
          <!-- Scheda: appare al passaggio o al focus (solo da md in su). -->
          <div
            class="spine-card pointer-events-none absolute bottom-3 z-10 hidden w-72 bg-[#f1f1ee] p-5 text-[#14141a] md:block"
            :class="i >= shelf.length / 2 ? 'right-2' : 'left-2'"
          >
            <p class="font-display text-xl font-bold leading-tight">{{ project.title }}</p>
            <p class="mt-2 leading-snug">{{ project.description[lang] }}</p>
            <p class="mt-3 text-sm font-medium">{{ project.technologies.join(', ') }}</p>
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-4 inline-flex min-h-11 items-center gap-1 font-medium underline underline-offset-4"
            >
              {{ t('projects.viewProject') }}
              <ArrowUpRight :size="18" />
            </a>
          </div>
        </li>
      </ul>
      <!-- Il piano dello scaffale. -->
      <div aria-hidden="true" class="h-3 bg-[#f1f1ee] max-md:hidden" />
     </div>
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
const heights = [100, 84, 94, 78, 90, 72, 98, 86]
const colors = ['var(--s-blue)', 'var(--s-orange)', 'var(--s-green)', 'var(--s-pink)', 'var(--s-amber)', 'var(--s-violet)', 'var(--s-cyan)', 'var(--s-coral)']
</script>
