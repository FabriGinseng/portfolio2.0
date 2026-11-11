<template>
  <section id="experience" data-field class="field overflow-x-clip" style="background: var(--f-exp); color: var(--f-exp-ink); --f-ink: var(--f-exp-ink)">
    <div class="frame mx-auto max-w-[110rem] py-20 md:py-32">
      <h2 class="text-title font-display font-bold" data-reveal>{{ t('experience.title') }}</h2>

      <!-- Il fiume scende dalla sorgente (il primo lavoro) fino a oggi; i testi stanno sulla riva opposta alla curva. -->
      <div class="river-wrap relative mt-10 md:mt-14">
        <svg aria-hidden="true" class="river absolute inset-0 h-full w-full max-md:hidden" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M72 0 C72 12 28 6 28 33 C28 60 72 40 72 66 C72 88 72 90 72 100"
            fill="none"
            stroke="var(--s-cyan)"
            stroke-width="64"
            vector-effect="non-scaling-stroke"
          />
        </svg>
        <svg aria-hidden="true" class="river absolute inset-0 h-full w-full md:hidden" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M10 0 C10 10 15 12 15 25 C15 38 8 40 8 55 C8 70 14 72 14 85 C14 92 11 95 11 100"
            fill="none"
            stroke="var(--s-cyan)"
            stroke-width="26"
            stroke-linecap="round"
            vector-effect="non-scaling-stroke"
          />
        </svg>
        <ol class="relative">
          <li
            v-for="(item, n) in experiences"
            :key="item.company"
            data-reveal
            class="exp-row grid gap-4 py-7 max-md:pl-[4.75rem] md:grid-cols-2 md:py-14"
          >
            <div class="md:max-w-[34rem]" :class="n % 2 ? 'md:col-start-2 md:justify-self-end' : 'md:justify-self-start'">
              <h3 class="line-mask font-display text-[clamp(2rem,3.4vw,2.5rem)] font-bold leading-[1.05] tracking-[-0.03em]"><span>{{ item.company }}</span></h3>
              <p class="mt-2 text-lg"><span class="font-semibold">{{ item.position }}</span> <span class="whitespace-nowrap">· {{ item.period }}</span></p>
              <ul class="mt-4 space-y-3 text-[1.0625rem] leading-[1.5] md:text-lg">
                <li v-for="(line, k) in bullets(item.description)" :key="line" class="exp-bullet" :style="{ '--i': k }">{{ line }}</li>
              </ul>
            </div>
          </li>
        </ol>
      </div>

      <div class="mt-16 grid gap-12 md:mt-24 md:grid-cols-[5fr_7fr] md:gap-x-16">
        <figure data-reveal class="m-0 overflow-hidden max-md:order-2 md:self-stretch">
          <img src="/img/library.webp" :alt="t('experience.libraryAlt')" width="1024" height="683" loading="lazy" class="drift block h-full max-h-96 w-full object-cover md:max-h-none" />
        </figure>
        <div data-reveal>
          <h3 class="font-display text-[clamp(2rem,3.4vw,2.5rem)] font-bold leading-[1.05] tracking-[-0.03em]">{{ t('background.title') }}</h3>
          <ul class="mt-8 space-y-8">
            <li v-for="i in 2" :key="i" class="grid gap-1 md:grid-cols-[9rem_1fr] md:gap-6">
              <p class="tabular-nums">{{ t(`background.education.${i - 1}.period`) }}</p>
              <div>
                <p class="font-display text-2xl font-semibold">{{ t(`background.education.${i - 1}.degree`) }}</p>
                <p class="font-semibold">{{ t(`background.education.${i - 1}.institution`) }}</p>
                <p class="mt-2 max-w-[56ch]">{{ t(`background.education.${i - 1}.description`) }}</p>
              </div>
            </li>
          </ul>
          <a
            :href="t('background.publications.0.url')"
            target="_blank"
            rel="noopener noreferrer"
            class="group mt-10 flex items-start justify-between gap-6 bg-[#14141a] p-6 text-white transition-transform hover:-translate-y-0.5"
          >
            <span>
              <span class="block font-display font-semibold group-hover:text-[var(--s-amber)]">{{ t('background.publications.0.title') }}</span>
              <span class="mt-2 block">{{ t('background.publications.0.publisher') }}, {{ t('background.publications.0.date') }}</span>
            </span>
            <ArrowUpRight :size="24" class="shrink-0" />
          </a>
        </div>
      </div>
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
  { position: 'Junior Software Developer', company: 'AK-12 srl', period: '2017 - 2018', description: 'experience.ak12_description' },
  { position: 'Full Stack Developer', company: 'Gesan srl', period: '2018 - 2023', description: 'experience.gesan_description' },
  { position: 'Senior Frontend Developer', company: 'Sorint .Lab', period: '2023 - ' + t('experience.present'), description: 'experience.sorint_description' },
])
</script>
