<template>
  <section id="about" class="relative py-32 overflow-hidden">
    <!-- Sfondo con gradiente -->
    <div class="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background"></div>
    
    <!-- Elementi decorativi -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
    
    <div class="container mx-auto px-4 relative z-10">
      <div 
        class="max-w-4xl mx-auto transition-all duration-700"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'"
      >
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4 text-primary">
            {{ t('about.title') }}
          </h2>
          <div class="h-1 w-24 mx-auto bg-gradient-to-r from-primary via-secondary to-accent rounded-full"></div>
        </div>
        
        <div class="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 md:p-12 shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02]">
          <p class="text-lg leading-relaxed text-foreground/80 dark:text-muted-foreground mb-8">
            {{ t('about.description') }}
          </p>
          
          <!-- Stats con animazione -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div class="text-center group">
              <div class="text-4xl font-bold text-primary group-hover:scale-110 transition-transform">
                {{ new Date().getFullYear() - 2017 }}+
              </div>
              <div class="text-sm text-foreground/60 dark:text-muted-foreground mt-2">Years Exp.</div>
            </div>
            <div class="text-center group">
              <div class="text-4xl font-bold text-secondary group-hover:scale-110 transition-transform">
                10+
              </div>
              <div class="text-sm text-foreground/60 dark:text-muted-foreground mt-2">Projects</div>
            </div>
            <div class="text-center group">
              <div class="text-4xl font-bold text-primary group-hover:scale-110 transition-transform">
                ∞
              </div>
              <div class="text-sm text-foreground/60 dark:text-muted-foreground mt-2">Coffee & Monster</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const isVisible = ref(false)

const checkVisibility = () => {
  const element = document.getElementById('about')
  if (element) {
    const rect = element.getBoundingClientRect()
    isVisible.value = rect.top < window.innerHeight * 0.75
  }
}

onMounted(() => {
  window.addEventListener('scroll', checkVisibility)
  checkVisibility()
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkVisibility)
})
</script>
