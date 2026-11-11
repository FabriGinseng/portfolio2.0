<template>
  <section id="projects">
    <!-- Tutti i Progetti sullo stesso scaffale: un clic apre il libro. -->
    <div data-field class="field" style="background: var(--f-shelf); color: var(--f-shelf-ink); --f-ink: var(--f-shelf-ink)">
     <div class="frame mx-auto max-w-[110rem] pb-20 pt-20 md:pb-28 md:pt-28">
      <h2 class="text-title font-display font-bold" data-reveal>{{ t('projects.title') }}</h2>
      <p class="mt-6 text-lg" data-reveal>{{ t('projects.shelf') }}</p>
      <!-- Telefono: una pila di libri, una barra per progetto; da md in su i dorsi stanno in piedi sullo scaffale. -->
      <ul class="mt-10 flex flex-col gap-[6px] md:h-[36rem] md:flex-row md:items-end md:gap-2">
        <li
          v-for="(project, i) in projects"
          :key="project.id"
          data-reveal
          class="shelf-item group relative md:h-[var(--h)] md:min-w-0 md:flex-1 md:basis-0"
          :style="{ '--d': `${i * 80}ms`, '--h': `${heights[i % heights.length]}%` }"
        >
          <button
            type="button"
            aria-haspopup="dialog"
            class="spine flex min-h-14 w-full cursor-pointer items-baseline justify-between gap-4 overflow-hidden px-5 py-4 text-left text-[#14141a] md:block md:h-full md:px-3 md:py-6 lg:px-4"
            :style="{ backgroundColor: colors[i % colors.length] }"
            :aria-label="project.title"
            @click="show(i, $event)"
          >
            <span class="block min-w-0 whitespace-nowrap font-bold max-md:truncate md:text-xl">{{ project.title }}</span>
            <span class="block whitespace-nowrap font-medium max-md:shrink-0 md:mt-4 md:text-base md:max-lg:hidden">{{ project.technologies[0] }}</span>
          </button>
        </li>
      </ul>
      <!-- Il piano dello scaffale. -->
      <div aria-hidden="true" class="h-3 bg-[#f1f1ee] max-md:hidden" />
     </div>
    </div>

    <!-- Il libro aperto. Il div interno riempie il dialog: un clic sul dialog stesso è un clic sullo sfondo. -->
    <dialog
      ref="dlg"
      class="book-dialog m-auto w-[min(92vw,70rem)] max-w-none bg-transparent p-0 backdrop:bg-black/70"
      :aria-label="current?.title"
      @click="(e) => e.target === dlg && dlg?.close()"
      @close="open = false"
    >
      <div v-if="current" class="book grid max-h-[90dvh] overflow-y-auto md:grid-cols-2">
        <!-- Pagina sinistra: da md in su gira attorno al dorso. Chiusa mostra la copertina (colore del dorso), aperta mostra l'interno. -->
        <div class="page-l relative z-10">
          <div class="face-in flex h-full min-h-48 items-center justify-center text-[#14141a]" :style="{ backgroundColor: colors[index % colors.length] }">
            <img v-if="current.image" :src="current.image" :alt="current.title" width="1200" height="630" class="block h-full w-full object-contain p-4 md:p-6" />
            <img v-else-if="current.icon" :src="current.icon" alt="" width="160" height="160" class="my-12 block h-32 w-32 object-contain md:h-40 md:w-40" />
            <p v-else class="p-8 font-display text-5xl font-bold leading-none tracking-[-0.04em]">{{ current.title }}</p>
          </div>
          <div aria-hidden="true" class="face-cover flex-col justify-between p-10 text-[#14141a]" :style="{ backgroundColor: colors[index % colors.length] }">
            <p class="font-display text-5xl font-bold leading-[0.95] tracking-[-0.04em]">{{ current.title }}</p>
            <p class="text-xl font-medium">{{ current.technologies[0] }}</p>
          </div>
        </div>
        <div class="page-r flex flex-col bg-[#f1f1ee] p-7 text-[#14141a] md:p-10">
          <h3 class="font-display text-4xl font-bold leading-[0.95] tracking-[-0.04em] md:text-5xl">{{ current.title }}</h3>
          <p class="mt-6 max-w-[48ch] text-lg leading-snug">{{ current.description[lang] }}</p>
          <p class="mt-4 font-medium">{{ current.technologies.join(', ') }}</p>
          <div class="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 md:mt-auto md:pt-8">
            <a
              v-if="current.liveUrl"
              :href="current.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn inline-flex min-h-12 items-center gap-2 px-7 py-3 font-medium press"
              style="--b-bg: #14141a; --b-ink: #ffffff; --b-sweep: var(--m-violet)"
            >
              {{ t('projects.viewProject') }}
              <ArrowUpRight :size="18" />
            </a>
            <button type="button" class="inline-flex min-h-11 cursor-pointer items-center font-medium underline underline-offset-4" @click="dlg?.close()">
              {{ t('projects.close') }}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowUpRight } from 'lucide-vue-next'
import { projects } from '@/data/projects'

const { t, locale } = useI18n()
const lang = computed(() => (locale.value === 'it' ? 'it' : 'en'))
const heights = [100, 84, 94, 78, 90, 72, 98, 86]
const colors = ['var(--s-blue)', 'var(--s-orange)', 'var(--s-green)', 'var(--s-pink)', 'var(--s-amber)', 'var(--s-violet)', 'var(--s-cyan)', 'var(--s-coral)']

const dlg = ref<HTMLDialogElement>()
const index = ref(0)
const open = ref(false)
const current = computed(() => (open.value ? (projects[index.value] as (typeof projects)[number] & { image?: string }) : null))

async function show(i: number, e: MouseEvent) {
  index.value = i
  open.value = true
  // Il libro parte dalla posizione del dorso cliccato (vedi book-pull in style.css).
  const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
  await nextTick()
  dlg.value?.style.setProperty('--dx', `${r.left + r.width / 2 - innerWidth / 2}px`)
  dlg.value?.style.setProperty('--dy', `${r.top + r.height / 2 - innerHeight / 2}px`)
  dlg.value?.showModal()
}
</script>
