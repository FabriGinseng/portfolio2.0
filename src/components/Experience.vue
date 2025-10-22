<template>
  <section id="experience" class="relative py-32 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/5"></div>
    
    <div class="container mx-auto px-4 relative z-10">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4 text-secondary">
            {{ t('experience.title') }}
          </h2>
          <div class="h-1 w-24 mx-auto bg-gradient-to-r from-secondary via-primary to-accent rounded-full"></div>
        </div>
        
        <div class="space-y-12">
          <div 
            v-for="(item, index) in experiences" 
            :key="index"
            class="relative pl-10 md:pl-12 transform transition-all duration-700 hover:translate-x-2"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'"
            :style="{ transitionDelay: `${index * 150}ms` }"
          >
            <!-- Timeline line -->
            <div class="absolute left-[19px] md:left-[23px] top-12 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"></div>
            
            <!-- Timeline dot -->
            <div class="absolute left-0 md:left-1 top-2 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/50 border-4 border-background">
              <div class="w-3 h-3 rounded-full text-primary bg-background dark:bg-white"></div>
            </div>
            
            <div class="bg-card/80 backdrop-blur-sm border border-secondary/20 rounded-xl p-6 md:p-8 hover:shadow-2xl hover:shadow-secondary/10 transition-all duration-500 hover:border-secondary/50 group">
              <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                <div>
                  <h3 class="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{{ item.position }}</h3>
                  <p class="text-lg font-semibold text-primary">
                    {{ item.company }}
                  </p>
                </div>
                <div class="text-sm text-foreground/60 dark:text-muted-foreground px-4 py-2 bg-muted/30 rounded-lg border border-border/50">
                  {{ item.period }}
                </div>
              </div>
              
              <p class="text-foreground/80 dark:text-muted-foreground mb-6 leading-relaxed">{{ $t(item.description) }}</p>
              
              <div class="flex flex-wrap gap-3">
                <span 
                  v-for="(tech, techIndex) in item.technologiesWebSites"
                  :key="tech.key"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r rounded-lg text-sm font-medium text-primary shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                  :class="[
                    techIndex % 3 === 0 ? 'from-primary to-primary/80text' : '',
                    techIndex % 3 === 1 ? 'from-secondary to-secondary/80' : '',
                    techIndex % 3 === 2 ? 'from-accent to-accent/80' : ''
                  ]"
                >
                  <img
                    :src="`https://img.logo.dev/${tech.key}?token=pk_Fa1L-6ooTI-mtHMAMofjaA`"
                    :alt="`${tech.value} logo`"
                    class="w-5 h-5 rounded-full object-cover"
                  />
                  {{ tech.value }}
                </span>
              </div>
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
  const element = document.getElementById('experience')
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
// Replace with your actual experience data
const experiences = [
  {
    position: 'Senior Frontend Developer',
    company: 'Sorint .Lab',
    period: '2023 - ' + t('experience.present'),
    description: 'experience.sorint_description',
    technologiesWebSites: [{key: 'vuejs.org', value: 'Vuejs'}, {key: 'javascript.com', value: 'JavaScript'}, {key: 'nodejs.org', value: 'Node.js'}, {key: 'typescriptlang.org', value: 'TypeScript'}, {key: 'docker.com', value: 'Docker'}]
  },
  {
    position: 'Full Stack Developer',
    company: 'Gesan srl',
    period: '2018 - 2023',
    description: 'experience.gesan_description',
    technologiesWebSites: [{key: 'dotnet.microsoft.com', value: '.NET/C#'},  {key: 'nodejs.org', value: 'Node.js'}, {key: 'vuejs.org', value: 'Vuejs'}, {key: 'ionicframework.com', value: 'Ionic'}, {key: 'electronjs.org', value: 'Electron'}, {key: 'python.org', value: 'Python'}, {key: 'javascript.com', value: 'JavaScript'}, {key: 'typescriptlang.org', value: 'TypeScript'}, {key: 'mongodb.com', value: 'MongoDB'}],
  },
  {
    position: 'Junior Software Developer',
    company: 'AK-12 srl',
    period: '2017 - 2018',
    description: 'experience.ak12_description',
    technologiesWebSites: [{key: 'javascript.com', value: 'JavaScript'}, {key: 'developer.android.com', value: 'Android'}, {key: 'dotnet.microsoft.com', value: '.NET/C#'}],
  }
]
</script>
