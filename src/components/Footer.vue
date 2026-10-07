<template>
  <footer class="border-t border-line py-10">
    <div class="mx-auto flex max-w-6xl flex-col gap-6 px-5 md:flex-row md:items-center md:justify-between md:px-8">
      <div class="flex items-center gap-4">
        <Logo :size="28" :show-text="false" />
        <p class="text-sm text-muted">© {{ year }} Antonio Fabrizio Fiume. {{ t('footer.rights') }}</p>
      </div>
      <ul class="flex gap-6 text-sm">
        <li><a href="https://github.com/fabriGinseng" target="_blank" rel="noopener noreferrer" class="text-muted hover:text-ink">GitHub</a></li>
        <li><a href="https://www.linkedin.com/in/antonio-fabrizio-fiume-13345a160/" target="_blank" rel="noopener noreferrer" class="text-muted hover:text-ink">LinkedIn</a></li>
        <li><a href="mailto:antoniofabriziofiume95@gmail.com" class="text-muted hover:text-ink">Email</a></li>
      </ul>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Logo from './Logo.vue'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>
