<template>
  <footer class="relative flex min-h-[100dvh] flex-col justify-between overflow-hidden bg-inv-bg text-inv-ink">
    <div class="frame mx-auto grid w-full max-w-[110rem] gap-12 pt-24 md:grid-cols-[7fr_3fr] md:pt-32">
      <div>
        <p class="text-head font-display font-bold leading-[0.98] tracking-[-0.035em]">{{ t('contact.subtitle') }}</p>
        <a
          href="mailto:antoniofabriziofiume95@gmail.com"
          class="mt-10 inline-flex min-h-12 items-center gap-2 bg-inv-ink px-7 py-3 font-medium text-inv-bg transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
        >
          {{ t('footer.write') }}
          <ArrowUpRight :size="18" />
        </a>
      </div>
      <ul class="space-y-3 md:pt-3">
        <li><a href="https://github.com/fabriGinseng" target="_blank" rel="noopener noreferrer" class="underline underline-offset-4">GitHub</a></li>
        <li><a href="https://www.linkedin.com/in/antonio-fabrizio-fiume-13345a160/" target="_blank" rel="noopener noreferrer" class="underline underline-offset-4">LinkedIn</a></li>
        <li><a href="mailto:antoniofabriziofiume95@gmail.com" class="underline underline-offset-4">Email</a></li>
      </ul>
    </div>

    <div>
      <p class="frame mx-auto mt-16 flex max-w-[110rem] flex-col gap-2 text-sm text-inv-muted md:flex-row md:justify-between">
        <span>© {{ year }} Antonio Fabrizio Fiume. {{ t('footer.rights') }}</span>
        <span class="max-w-[60ch] md:text-right">{{ t('footer.credits') }}</span>
      </p>
      <!-- Il nome torna a tutta larghezza, tagliato dal bordo inferiore. -->
      <p aria-hidden="true" class="mt-6 translate-y-[22%] whitespace-nowrap pl-3 font-display text-[min(30vw,28rem)] font-extrabold leading-[0.8] tracking-[-0.05em] md:pl-6">Fiume</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ArrowUpRight } from 'lucide-vue-next'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>
