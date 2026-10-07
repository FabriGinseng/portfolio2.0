<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
    <nav class="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
      <a href="#" aria-label="Home"><Logo :size="32" /></a>

      <div class="hidden items-center gap-8 md:flex">
        <a
          v-for="id in navItems"
          :key="id"
          :href="`#${id}`"
          class="text-sm text-muted transition-colors hover:text-ink"
        >
          {{ t(`nav.${id}`) }}
        </a>
        <button
          @click="toggleTheme"
          class="rounded-md p-2 text-muted transition-colors hover:text-ink"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <Sun v-if="isDark" :size="18" />
          <Moon v-else :size="18" />
        </button>
        <button
          @click="toggleLocale"
          class="rounded-md border border-field px-3 py-1.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          :aria-label="locale === 'en' ? 'Passa all\'italiano' : 'Switch to English'"
        >
          {{ locale === 'en' ? 'IT' : 'EN' }}
        </button>
      </div>

      <button
        @click="open = !open"
        class="rounded-md p-2 md:hidden"
        :aria-label="open ? 'Close menu' : 'Open menu'"
        :aria-expanded="open"
      >
        <X v-if="open" :size="22" />
        <Menu v-else :size="22" />
      </button>
    </nav>

    <div v-if="open" class="border-t border-line bg-bg md:hidden">
      <div class="mx-auto flex max-w-6xl flex-col px-5 py-2">
        <a
          v-for="id in navItems"
          :key="id"
          :href="`#${id}`"
          @click="open = false"
          class="border-b border-line py-4 text-base"
        >
          {{ t(`nav.${id}`) }}
        </a>
        <div class="flex items-center justify-between py-4">
          <button @click="toggleTheme" class="flex items-center gap-2 text-sm text-muted">
            <Sun v-if="isDark" :size="18" />
            <Moon v-else :size="18" />
            {{ isDark ? 'Light' : 'Dark' }}
          </button>
          <button @click="toggleLocale" class="rounded-md border border-field px-3 py-1.5 text-sm font-medium">
            {{ locale === 'en' ? 'IT' : 'EN' }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Menu, X, Sun, Moon } from 'lucide-vue-next'
import Logo from './Logo.vue'
import { useTheme } from '@/composables/useTheme'

const { t, locale } = useI18n()
const { isDark, toggleTheme } = useTheme()
const open = ref(false)
const navItems = ['about', 'background', 'experience', 'projects', 'contact']

const toggleLocale = () => {
  locale.value = locale.value === 'en' ? 'it' : 'en'
  open.value = false
}
</script>
