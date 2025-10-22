<template>
  <footer class="relative bg-card/50 backdrop-blur-sm border-t border-primary/20 py-12">
    <div class="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent"></div>
    
    <div class="container mx-auto px-4 relative z-10">
      <div class="flex flex-col md:flex-row items-center justify-between gap-8">
        <!-- Logo e Copyright -->
        <div class="flex flex-col items-center md:items-start gap-4">
          <a href="#" class="group">
            <Logo :show-text="true" class="hover:scale-105 transition-transform" />
          </a>
          <span class="text-sm text-muted-foreground text-center md:text-left">
            © {{ currentYear }} Antonio Fabrizio Fiume. {{ t('footer.rights') }}
          </span>
        </div>
        
        <!-- Quick Links -->
        <div class="flex flex-wrap justify-center gap-6 text-sm">
          <a 
            href="#about" 
            class="text-muted-foreground hover:text-primary transition-colors"
          >
            {{ t('nav.about') }}
          </a>
          <a 
            href="#experience" 
            class="text-muted-foreground hover:text-secondary transition-colors"
          >
            {{ t('nav.experience') }}
          </a>
          <a 
            href="#projects" 
            class="text-muted-foreground hover:text-accent transition-colors"
          >
            {{ t('nav.projects') }}
          </a>
          <a 
            href="#contact" 
            class="text-muted-foreground hover:text-primary transition-colors"
          >
            {{ t('nav.contact') }}
          </a>
        </div>
        
        <!-- Social Links -->
        <div class="flex gap-4">
          <a 
            href="https://github.com/fabriGinseng" 
            target="_blank"
            rel="noopener noreferrer"
            class="p-3 rounded-xl bg-background/50 border border-primary/20 hover:border-primary hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-110"
          >
            <Github :size="20" class="text-primary" />
          </a>
          <a 
            href="https://www.linkedin.com/in/antonio-fabrizio-fiume-13345a160/"
            target="_blank"
            rel="noopener noreferrer"
            class="p-3 rounded-xl bg-background/50 border border-secondary/20 hover:border-secondary hover:shadow-lg hover:shadow-secondary/30 transition-all duration-300 hover:scale-110"
          >
            <Linkedin :size="20" class="text-secondary" />
          </a>
          <a 
            href="mailto:antoniofabriziofiume95@gmail.com"
            class="p-3 rounded-xl bg-background/50 border border-accent/20 hover:border-accent hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 hover:scale-110"
          >
            <Mail :size="20" class="text-accent" />
          </a>
        </div>
      </div>
      
      <!-- Made with love -->
      <div class="mt-8 pt-8 border-t border-border/30 text-center">
        <p class="text-sm text-muted-foreground">
          Made with <span class="text-red-500 animate-pulse">❤️</span> using 
          <span class="font-semibold text-primary">Vue 3</span> + 
          <span class="font-semibold text-secondary">TypeScript</span> + 
          <span class="font-semibold text-accent">TailwindCSS</span>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Github, Linkedin, Mail } from 'lucide-vue-next'
import Logo from './Logo.vue'

const { t } = useI18n()
const currentYear = computed(() => new Date().getFullYear())
</script>
