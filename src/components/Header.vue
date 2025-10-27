<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-background/95 backdrop-blur-xl' : 'bg-transparent'"
  >
    <nav class="container mx-auto px-4 h-20 flex items-center justify-between">
      <!-- Logo -->
      <a href="#" class="flex items-center group">
        <Logo class="transition-transform duration-300 group-hover:scale-110" />
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-8">
        <a 
          v-for="item in navItems" 
          :key="item.id"
          :href="`#${item.id}`"
          class="relative text-sm font-medium text-foreground/70 hover:text-primary transition-all duration-300 group"
        >
          {{ t(`nav.${item.id}`) }}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></span>
        </a>
        
        <!-- Theme Toggle -->
        <button
          @click="toggleTheme"
          class="p-2 rounded-lg hover:bg-primary/10 transition-all duration-300"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <Sun v-if="isDark" :size="20" class="text-primary" />
          <Moon v-else :size="20" class="text-primary" />
        </button>
        
        <!-- Language Switcher -->
        <button
          @click="toggleLocale"
          class="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
        >
          {{ locale === 'en' ? '🇮🇹 IT' : '🇬🇧 EN' }}
        </button>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-all duration-300"
        :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
      >
        <Menu v-if="!mobileMenuOpen" :size="24" class="text-primary" />
        <X v-else :size="24" class="text-primary" />
      </button>
    </nav>

    <!-- Mobile Navigation -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div 
        v-if="mobileMenuOpen"
        class="md:hidden border-t border-primary/20 bg-background/98 backdrop-blur-xl"
      >
        <div class="container mx-auto px-4 py-6 flex flex-col gap-4">
          <a 
            v-for="item in navItems" 
            :key="item.id"
            :href="`#${item.id}`"
            @click="mobileMenuOpen = false"
            class="text-sm font-medium text-foreground/70 hover:text-primary transition-colors py-3 border-b border-border/50 hover:border-primary/50"
          >
            {{ t(`nav.${item.id}`) }}
          </a>
          
          <button
            @click="toggleTheme"
            class="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary/10 transition-all text-left border-b border-border/50"
          >
            <Sun v-if="isDark" :size="20" class="text-primary" />
            <Moon v-else :size="20" class="text-primary" />
            <span>{{ isDark ? 'Light Mode' : 'Dark Mode' }}</span>
          </button>
          
          <button
            @click="toggleLocale"
            class="mt-2 px-4 py-3 text-sm font-medium rounded-lg bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all text-left"
          >
            {{ locale === 'en' ? '🇮🇹 Italiano' : '🇬🇧 English' }}
          </button>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Menu, X, Sun, Moon } from 'lucide-vue-next'
import Logo from './Logo.vue'
import { useTheme } from '@/composables/useTheme'

const { t, locale } = useI18n()
const { isDark, toggleTheme } = useTheme()
const mobileMenuOpen = ref(false)
const scrolled = ref(false)

const navItems = [
  { id: 'about' },
  { id: 'background' },
  { id: 'experience' },
  { id: 'projects' },
  { id: 'contact' }
]

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const toggleLocale = () => {
  locale.value = locale.value === 'en' ? 'it' : 'en'
  mobileMenuOpen.value = false
}
</script>
