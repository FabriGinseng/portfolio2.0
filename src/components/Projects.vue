<template>
  <section id="projects" class="border-t border-line py-24 md:py-32">
    <div class="mx-auto max-w-6xl px-5 md:px-8">
      <h2 class="font-display text-3xl font-semibold tracking-tight md:text-4xl">{{ t('projects.title') }}</h2>

      <ul class="mt-12 grid gap-x-16 md:grid-cols-2">
        <li
          v-for="(project, index) in projects"
          :key="project.title"
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
                {{ t(`projects.items.${index}.title`) }}
                <ArrowUpRight
                  v-if="project.liveUrl"
                  :size="index === 0 ? 28 : 20"
                  class="mt-1 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </h3>
              <p class="mt-3 max-w-[60ch] text-muted">{{ t(`projects.items.${index}.description`) }}</p>
              <p class="mt-4 text-sm">{{ project.technologies.join(', ') }}</p>
            </div>
          </component>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ArrowUpRight } from 'lucide-vue-next'

const { t } = useI18n()

// Titolo e descrizione arrivano da i18n (per indice); qui solo icona, stack e link.
// liveUrl vuoto = nessun link.
const projects = [
  {
    title: 'Campania In Salute App',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/e1/81/53/e1815395-abd6-1281-c010-0bf256dba807/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/460x0w.webp',
    technologies: ['Xamarin Forms', 'C#', 'Node.js'],
    liveUrl: 'https://apps.apple.com/it/app/campania-in-salute/id1526791777',
  },
  {
    title: 'ARPA',
    icon: '/img/arpa.png',
    technologies: ['Vue js', 'Javascript', 'Vuetify', 'Pinia'],
    liveUrl: '',
  },
  {
    title: 'REFIT- REST METHODS NUGET PACKAGE',
    icon: 'https://api.nuget.org/v3-flatcontainer/refitrestmethodspackage/1.1.6/icon',
    technologies: ['C#', '.NET', 'NuGet', 'Visual Studio App Center'],
    liveUrl: 'https://www.nuget.org/packages/RefitRestMethodsPackage',
  },
  {
    title: 'Entropia didattica',
    icon: '/img/hcm.png',
    technologies: ['Vue.js', 'Chart.js', 'JavaScript', 'TypeScript'],
    liveUrl: 'https://entropy-henna.vercel.app/',
  },
  {
    title: 'Old Portfolio Website',
    icon: 'https://avatars.githubusercontent.com/u/28861456?v=4',
    technologies: ['Vuejs', 'CSS', 'ElementUI'],
    liveUrl: 'https://portfolio-e6pdxlbb7-fabriginseng.vercel.app/',
  },
  {
    title: 'QuickQueueSystem',
    icon: 'https://kinsta.com/wp-content/uploads/2022/03/what-is-vue-3.png',
    technologies: ['VueJs', 'Ionic', 'Node.js', 'PostgreSQL', 'Fastify'],
    liveUrl: '',
  },
  {
    title: 'E-commerce template',
    icon: 'https://kinsta.com/wp-content/uploads/2022/03/what-is-vue-3.png',
    technologies: ['Vue.js', 'Pinia', 'JavaScript'],
    liveUrl: 'https://github.com/FabriGinseng/ecommerce',
  },
]
</script>
