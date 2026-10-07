<template>
  <section id="experience" class="border-t border-line py-24 md:py-32">
    <div class="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1fr_2fr] md:px-8">
      <h2 class="font-display text-3xl font-semibold tracking-tight md:text-4xl">{{ t('experience.title') }}</h2>

      <ol class="divide-y divide-line">
        <li v-for="item in experiences" :key="item.company" class="grid gap-2 py-8 first:pt-0 sm:grid-cols-[9rem_1fr] sm:gap-6">
          <p class="text-sm text-muted">{{ item.period }}</p>
          <div>
            <h3 class="font-display text-xl font-semibold">{{ item.position }}</h3>
            <p class="mt-1 text-accent">{{ item.company }}</p>

            <ul class="mt-4 max-w-[65ch] space-y-2 text-muted">
              <li v-for="line in bullets(item.description)" :key="line" class="flex gap-3">
                <span class="mt-2.5 h-px w-3 shrink-0 bg-field" aria-hidden="true"></span>
                <span>{{ line }}</span>
              </li>
            </ul>

            <ul class="mt-5 flex flex-wrap gap-2">
              <li
                v-for="tech in item.technologiesWebSites"
                :key="tech.key"
                class="inline-flex items-center gap-2 rounded-md border border-line px-2.5 py-1 text-sm"
              >
                <img
                  :src="`https://img.logo.dev/${tech.key}?token=pk_Fa1L-6ooTI-mtHMAMofjaA`"
                  alt=""
                  width="16"
                  height="16"
                  loading="lazy"
                  class="h-4 w-4 rounded-sm object-cover"
                />
                {{ tech.value }}
              </li>
            </ul>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Le descrizioni con elenco sono una stringa "- a - b - c": le spezzo in punti.
const bullets = (key: string) =>
  t(key).replace(/^-\s*/, '').split(/\s+-\s+/).map((s) => s.trim()).filter(Boolean)

const experiences = computed(() => [
  {
    position: 'Senior Frontend Developer',
    company: 'Sorint .Lab',
    period: '2023 - ' + t('experience.present'),
    description: 'experience.sorint_description',
    technologiesWebSites: [{key: 'vuejs.org', value: 'Vuejs'}, {key: 'javascript.com', value: 'JavaScript'}, {key: 'nodejs.org', value: 'Node.js'}, {key: 'typescriptlang.org', value: 'TypeScript'}, {key: 'docker.com', value: 'Docker'}]
  },
  {
    position: 'Full Stack Developer',
    company: 'Gesan srl',
    period: '2018 - 2023',
    description: 'experience.gesan_description',
    technologiesWebSites: [{key: 'dotnet.microsoft.com', value: '.NET/C#'}, {key: 'nodejs.org', value: 'Node.js'}, {key: 'vuejs.org', value: 'Vuejs'}, {key: 'ionicframework.com', value: 'Ionic'}, {key: 'electronjs.org', value: 'Electron'}, {key: 'python.org', value: 'Python'}, {key: 'javascript.com', value: 'JavaScript'}, {key: 'typescriptlang.org', value: 'TypeScript'}, {key: 'mongodb.com', value: 'MongoDB'}],
  },
  {
    position: 'Junior Software Developer',
    company: 'AK-12 srl',
    period: '2017 - 2018',
    description: 'experience.ak12_description',
    technologiesWebSites: [{key: 'javascript.com', value: 'JavaScript'}, {key: 'developer.android.com', value: 'Android'}, {key: 'dotnet.microsoft.com', value: '.NET/C#'}],
  }
])
</script>
