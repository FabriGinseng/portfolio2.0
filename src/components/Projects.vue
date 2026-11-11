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
            class="mt-10 inline-flex min-h-12 items-center gap-2 bg-[#1c1c1c] px-7 py-3 font-medium text-[#efeee9] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
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
      <!-- Telefono: lo scaffale scorre di lato (un dorso per libro, il successivo spunta dal bordo); da md in su sta tutto in vista. -->
      <ul class="-mx-5 mt-10 flex h-[22rem] snap-x snap-mandatory items-end gap-[6px] overflow-x-auto scroll-px-5 px-5 pb-2 md:mx-0 md:h-[28rem] md:snap-none md:overflow-visible md:px-0 md:pb-0">
        <li
          v-for="(project, i) in shelf"
          :key="project.id"
          data-reveal
          :style="{ '--d': `${i * 60}ms` }"
          class="h-full w-[5.2rem] shrink-0 snap-start md:w-auto md:min-w-0 md:max-w-28 md:flex-1 md:shrink md:basis-0"
        >
          <component
            :is="project.liveUrl ? 'a' : 'div'"
            :href="project.liveUrl"
            :target="project.liveUrl ? '_blank' : undefined"
            :rel="project.liveUrl ? 'noopener noreferrer' : undefined"
            class="spine block h-full overflow-hidden px-3 py-5 text-[#1c1c1c]"
            :style="{ backgroundColor: colors[i % colors.length] }"
            :aria-label="`${project.title}: ${project.description[lang]}`"
          >
            <span class="block whitespace-nowrap font-bold">{{ project.title }}</span>
            <span class="block whitespace-nowrap font-medium">{{ project.technologies[0] }}</span>
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
