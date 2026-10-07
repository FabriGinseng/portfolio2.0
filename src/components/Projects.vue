<template>
  <section id="projects" class="border-t border-line py-24 md:py-32">
    <div class="mx-auto max-w-6xl px-5 md:px-8">
      <h2 class="font-display text-3xl font-semibold tracking-tight md:text-4xl">{{ t('projects.title') }}</h2>

      <ul class="mt-12 grid gap-x-16 md:grid-cols-2">
        <li
          v-for="(project, index) in projects"
          :key="project.id"
          class="border-t border-line py-8"
          :class="index === 0 ? 'md:col-span-2 md:py-12' : ''"
        >
          <component
            :is="project.liveUrl ? 'a' : 'div'"
            :href="project.liveUrl"
            :target="project.liveUrl ? '_blank' : undefined"
            :rel="project.liveUrl ? 'noopener noreferrer' : undefined"
            class="group flex gap-5"
          >
            <img
              :src="project.icon"
              alt=""
              loading="lazy"
              class="shrink-0 rounded-md bg-line object-cover"
              :class="index === 0 ? 'h-16 w-16 md:h-20 md:w-20' : 'h-12 w-12'"
            />
            <div class="min-w-0">
              <h3
                class="flex items-start gap-2 font-display font-semibold tracking-tight group-hover:text-accent"
                :class="index === 0 ? 'text-3xl md:text-4xl' : 'text-xl'"
              >
                {{ project.title }}
                <ArrowUpRight
                  v-if="project.liveUrl"
                  :size="index === 0 ? 28 : 20"
                  class="mt-1 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </h3>
              <p class="mt-3 max-w-[60ch] text-muted">{{ project.description[lang] }}</p>
              <p class="mt-4 text-sm">{{ project.technologies.join(', ') }}</p>
            </div>
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
</script>
