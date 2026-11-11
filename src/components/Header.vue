<template>
  <header class="fixed inset-x-0 top-0 z-50 bg-bg">
    <nav class="frame mx-auto flex h-16 max-w-[110rem] items-center justify-between" :aria-label="t('nav.label')">
      <a href="#" class="font-display font-bold tracking-tight">Fabrizio Fiume</a>

      <div class="hidden items-center gap-8 md:flex">
        <a v-for="id in navItems" :key="id" :href="`#${id}`" class="py-2 text-muted transition-colors hover:text-ink">
          {{ t(`nav.${id}`) }}
        </a>
        <button
          @click="toggleTheme"
          class="p-2 text-muted transition-colors hover:text-ink"
          :aria-label="isDark ? t('nav.light') : t('nav.dark')"
        >
          <Sun v-if="isDark" :size="18" />
          <Moon v-else :size="18" />
        </button>
        <button
          @click="toggleLocale"
          class="bg-surface px-3 py-1.5 font-medium transition-transform hover:text-accent active:scale-[0.97]"
          :aria-label="locale === 'en' ? 'Passa all\'italiano' : 'Switch to English'"
        >
          {{ locale === 'en' ? 'IT' : 'EN' }}
        </button>
      </div>

      <button
        @click="open = !open"
        class="p-2 md:hidden"
        :aria-label="open ? t('nav.close') : t('nav.menu')"
        :aria-expanded="open"
      >
        <X v-if="open" :size="22" />
        <Menu v-else :size="22" />
      </button>
    </nav>

    <div v-if="open" class="frame bg-surface py-2 md:hidden">
      <a v-for="id in navItems" :key="id" :href="`#${id}`" @click="open = false" class="block py-4">
        {{ t(`nav.${id}`) }}
      </a>
      <div class="flex items-center justify-between py-4">
        <button @click="toggleTheme" class="flex items-center gap-2 text-muted">
          <Sun v-if="isDark" :size="18" />
          <Moon v-else :size="18" />
          {{ isDark ? t('nav.light') : t('nav.dark') }}
        </button>
        <button @click="toggleLocale" class="bg-bg px-3 py-1.5 font-medium">{{ locale === 'en' ? 'IT' : 'EN' }}</button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Menu, X, Sun, Moon } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'

const { t, locale } = useI18n()
const { isDark, toggleTheme } = useTheme()
const open = ref(false)
const navItems = ['about', 'projects', 'experience', 'contact']

const toggleLocale = () => {
  locale.value = locale.value === 'en' ? 'it' : 'en'
  open.value = false
}
</script>
