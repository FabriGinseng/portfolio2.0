<template>
  <footer id="contact" data-field class="field relative flex min-h-[80dvh] flex-col justify-between overflow-hidden" style="background: var(--f-foot); color: var(--f-ink)">
    <div class="frame mx-auto w-full max-w-[110rem] pt-20 md:pt-28">
      <h2 data-reveal class="max-w-[28ch] font-display text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-tight">
        {{ t('contact.prompt1') }} {{ t('contact.prompt2') }}
      </h2>
      <a
        href="mailto:antoniofabriziofiume95@gmail.com"
        data-reveal
        class="mail mt-8 block font-display text-[clamp(1.35rem,5.2vw,5rem)] max-md:text-[4.7vw] font-bold leading-[1.05] tracking-[-0.03em] underline decoration-[0.06em] underline-offset-[0.14em] [overflow-wrap:anywhere]"
      >antoniofabriziofiume95@gmail.com</a>
      <ul class="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-xl font-medium">
        <li><a href="https://github.com/fabriGinseng" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-11 items-center gap-1 underline underline-offset-4">GitHub <ArrowUpRight :size="18" /></a></li>
        <li><a href="https://www.linkedin.com/in/antonio-fabrizio-fiume-13345a160/" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-11 items-center gap-1 underline underline-offset-4">LinkedIn <ArrowUpRight :size="18" /></a></li>
      </ul>
    </div>

    <div>
      <p class="frame mx-auto mt-16 flex max-w-[110rem] flex-col gap-2 text-sm md:flex-row md:justify-between">
        <span>© {{ year }} Antonio Fabrizio Fiume. {{ t('footer.rights') }}</span>
        <span class="max-w-[60ch] md:text-right">{{ t('footer.credits') }}</span>
      </p>
      <!-- Il nome torna a tutta larghezza, tagliato dal bordo inferiore. -->
      <p aria-hidden="true" data-letters class="mt-6 translate-y-[22%] max-md:mb-16 whitespace-nowrap pl-3 font-display text-[min(30vw,28rem)] font-extrabold leading-[0.8] tracking-[-0.05em] md:pl-6"><span v-for="(c, i) in [...'Fiume']" :key="i" class="letter" :style="{ '--i': i }">{{ c }}</span></p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ArrowUpRight } from 'lucide-vue-next'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>
