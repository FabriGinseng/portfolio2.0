<template>
  <header class="fixed inset-x-0 top-0 z-50 bg-bg">
    <div class="frame mx-auto flex h-16 max-w-[110rem] items-center justify-between">
      <a href="#" class="font-display font-bold tracking-tight">Fabrizio Fiume</a>

      <nav class="hidden items-center gap-8 md:flex" :aria-label="t('nav.label')">
        <a v-for="id in navItems" :key="id" :href="`#${id}`" class="py-2 text-muted transition-colors hover:text-ink">
          {{ t(`nav.${id}`) }}
        </a>
        <button @click="toggleTheme" class="p-2 text-muted transition-colors hover:text-ink" :aria-label="isDark ? t('nav.light') : t('nav.dark')">
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
      </nav>

      <!-- Telefono: in alto solo tema e lingua, le sezioni stanno in basso, a portata di pollice. -->
      <div class="flex items-center gap-1 md:hidden">
        <button @click="toggleTheme" class="grid h-11 w-11 place-items-center text-muted" :aria-label="isDark ? t('nav.light') : t('nav.dark')">
          <Sun v-if="isDark" :size="20" />
          <Moon v-else :size="20" />
        </button>
        <button
          @click="toggleLocale"
          class="h-11 min-w-11 bg-surface px-3 font-medium"
          :aria-label="locale === 'en' ? 'Passa all\'italiano' : 'Switch to English'"
        >
          {{ locale === 'en' ? 'IT' : 'EN' }}
        </button>
      </div>
    </div>
  </header>

  <nav
    class="bottom-bar fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 bg-surface pb-[env(safe-area-inset-bottom)] md:hidden"
    :class="{ 'is-hidden': hidden }"
    :aria-label="t('nav.label')"
  >
    <a
      v-for="id in navItems"
      :key="id"
      :href="`#${id}`"
      class="grid h-14 place-items-center text-[0.9375rem] font-medium transition-colors"
      :class="active === id ? 'text-ink' : 'text-muted'"
      :aria-current="active === id ? 'true' : undefined"
    >
      <span :class="active === id ? 'border-b-2 border-accent' : 'border-b-2 border-transparent'" class="py-1">{{ t(`nav.${id}`) }}</span>
    </a>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Sun, Moon } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'

const { t, locale } = useI18n()
const { isDark, toggleTheme } = useTheme()
const navItems = ['about', 'projects', 'experience', 'contact']
const active = ref('')
const hidden = ref(false)

const toggleLocale = () => {
  locale.value = locale.value === 'en' ? 'it' : 'en'
}

// La barra in basso si nasconde scorrendo verso il basso e in fondo alla pagina (dove coprirebbe il nome del footer); torna salendo e in cima.
let lastY = 0
const onScroll = () => {
  const y = window.scrollY
  const atEnd = y + window.innerHeight >= document.documentElement.scrollHeight - 8
  if (atEnd) hidden.value = true
  else if (y < 80 || y < lastY - 6) hidden.value = false
  else if (y > lastY + 6) hidden.value = true
  lastY = y
}

// Segna nella barra in basso la sezione che occupa la fascia centrale dello schermo.
let io: IntersectionObserver | undefined
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  if (!('IntersectionObserver' in window)) return
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) active.value = e.target.id
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  navItems.forEach((id) => {
    const el = document.getElementById(id)
    if (el) io!.observe(el)
  })
})
onUnmounted(() => {
  io?.disconnect()
  window.removeEventListener('scroll', onScroll)
})
</script>
