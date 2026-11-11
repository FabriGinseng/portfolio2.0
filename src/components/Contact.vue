<template>
  <section id="contact" class="frame mx-auto max-w-[110rem] py-24 md:py-32">
    <div class="mx-auto max-w-3xl" data-reveal>
      <p class="font-display text-2xl font-semibold text-muted">{{ t('contact.prompt1') }}</p>
      <h2 class="text-head mt-3 font-display font-bold leading-[1] tracking-[-0.035em]">{{ t('contact.prompt2') }}</h2>
      <dl class="mt-12 space-y-5">
        <div>
          <dt class="text-muted">{{ t('contact.email') }}</dt>
          <dd><a href="mailto:antoniofabriziofiume95@gmail.com" class="break-all font-display text-2xl font-semibold text-accent underline underline-offset-4">antoniofabriziofiume95@gmail.com</a></dd>
        </div>
        <div>
          <dt class="text-muted">GitHub</dt>
          <dd><a href="https://github.com/fabriGinseng" target="_blank" rel="noopener noreferrer" class="font-medium underline underline-offset-4 hover:text-accent">github.com/fabriGinseng</a></dd>
        </div>
        <div>
          <dt class="text-muted">LinkedIn</dt>
          <dd><a href="https://www.linkedin.com/in/antonio-fabrizio-fiume-13345a160/" target="_blank" rel="noopener noreferrer" class="font-medium underline underline-offset-4 hover:text-accent">Antonio Fabrizio Fiume</a></dd>
        </div>
      </dl>
      <img src="/img/naples-harbour.jpg" :alt="t('contact.harbourAlt')" width="1200" height="743" loading="lazy" class="mt-12 block w-full" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
