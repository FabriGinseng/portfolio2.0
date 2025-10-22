<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Sfondo animato con gradiente -->
    <div class="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10"></div>
    
    <!-- Elementi decorativi con parallasse -->
    <div 
      class="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"
      :style="{ transform: `translateY(${scrollY * 0.3}px)` }"
    ></div>
    <div 
      class="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse"
      :style="{ transform: `translateY(${scrollY * -0.2}px)` }"
    ></div>
    <div 
      class="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
      :style="{ transform: `translate(-50%, -50%) translateY(${scrollY * 0.15}px)` }"
    ></div>

    <div class="container mx-auto px-4 py-20 text-center relative z-10">
      <div class="max-w-4xl mx-auto space-y-8">
        <p class="text-xl text-primary font-semibold animate-fade-in">
          {{ t('hero.greeting') }}
        </p>
        <h1 
          class="text-6xl md:text-8xl font-bold tracking-tight animate-fade-in-up text-primary"
          :style="{ transform: `translateY(${scrollY * -0.1}px)` }"
        >
          {{ t('hero.name') }}
        </h1>
        <p class="text-3xl md:text-4xl font-bold animate-fade-in-up animation-delay-100 text-secondary">
          {{ t('hero.title') }}
        </p>
        <p class="text-lg md:text-xl text-foreground/80 dark:text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
          {{ t('hero.description') }}
        </p>
        <div class="pt-8 animate-fade-in-up animation-delay-300 flex flex-wrap gap-4 justify-center">
          <a 
            href="#projects"
            class="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 group"
          >
            {{ t('hero.cta') }}
            <ArrowDown :size="20" class="group-hover:translate-y-1 transition-transform" />
          </a>
          <a 
            href="#contact"
            class="inline-flex items-center gap-2 px-8 py-4 bg-card border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary/10 hover:border-primary transition-all duration-300 hover:scale-105"
          >
            {{ t('contact.title') }}
          </a>
        </div>
        
        <!-- Social Links rapidi -->
        <div class="pt-12 flex gap-6 justify-center animate-fade-in-up animation-delay-400">
          <a 
            href="https://github.com/yourusername" 
            target="_blank"
            class="p-4 rounded-full bg-card border-2 border-primary/30 hover:border-primary hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-110"
          >
            <Github :size="24" class="text-primary" @click="openLink('https://github.com/fabriGinseng')" />
          </a>
          <a 
            href="https://linkedin.com/in/yourusername" 
            target="_blank"
            class="p-4 rounded-full bg-card border-2 border-secondary/30 hover:border-secondary hover:bg-secondary/10 hover:shadow-lg hover:shadow-secondary/30 transition-all duration-300 hover:scale-110"
          >
            <Linkedin :size="24" class="text-secondary" @click="openLink('https://www.linkedin.com/in/antonio-fabrizio-fiume-13345a160/')" />
          </a>
          <a 
            href="mailto:your.email@example.com"
            class="p-4 rounded-full bg-card border-2 border-accent/30 hover:border-accent hover:bg-accent/10 hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 hover:scale-110"
          >
            <Mail :size="24" class="text-accent" @click="openLink('mailto:antoniofabriziofiume95@gmail.com')" />
          </a>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div class="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
        <div class="w-1.5 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-vue-next'

const { t } = useI18n()
const scrollY = ref(0)

const handleScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Method to open links
const openLink = (url: string) => {
  window.open(url, '_blank')
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-in-up {
  from { 
    opacity: 0;
    transform: translateY(30px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out;
}

.animation-delay-100 {
  animation-delay: 0.2s;
  opacity: 0;
  animation-fill-mode: forwards;
}

.animation-delay-200 {
  animation-delay: 0.4s;
  opacity: 0;
  animation-fill-mode: forwards;
}

.animation-delay-300 {
  animation-delay: 0.6s;
  opacity: 0;
  animation-fill-mode: forwards;
}

.animation-delay-400 {
  animation-delay: 0.8s;
  opacity: 0;
  animation-fill-mode: forwards;
}
</style>
