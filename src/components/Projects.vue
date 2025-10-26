<template>
  <section id="projects" class="relative py-32 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background"></div>
    
    <div class="container mx-auto px-4 relative z-10">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4 text-accent">
            {{ t('projects.title') }}
          </h2>
          <div class="h-1 w-24 mx-auto bg-gradient-to-r from-accent via-primary to-secondary rounded-full"></div>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(project, index) in projects" 
            :key="index"
            class="group transform transition-all duration-700 hover:scale-105"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'"
            :style="{ transitionDelay: `${index * 100}ms` }"
          >
            <div class="bg-card/80 backdrop-blur-sm border border-accent/20 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500 h-full flex flex-col">
              <!-- Project Icon/Image -->
              <div class="relative h-56 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 dark:from-primary/20 dark:via-secondary/20 dark:to-accent/20 flex items-center justify-center overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent group-hover:scale-110 transition-transform duration-500"></div>
                <div class="text-7xl z-10 group-hover:scale-125 transition-transform duration-500">
                  <img :src="project.icon" alt="" />
                </div>
                <!-- Overlay al hover -->
                <div class="absolute inset-0 bg-gradient-to-t from-background/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <div class="flex gap-3">
                    <a 
                      v-if="project.liveUrl"
                      :href="project.liveUrl"
                      target="_blank"
                      class="p-3 bg-primary text-white rounded-full hover:scale-110 transition-transform"
                    >
                      <ExternalLink :size="20" class="text-white" />
                    </a>
                    <a 
                      v-if="project.githubUrl"
                      :href="project.githubUrl"
                      target="_blank"
                      class="p-3 bg-secondary text-white rounded-full hover:scale-110 transition-transform"
                    >
                      <Github :size="20" class="text-white" />
                      <Github :size="20" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div class="p-6 flex-1 flex flex-col">
                <h3 class="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {{ t(`projects.items.${index}.title`) }}
                </h3>
                <p class="text-foreground/70 dark:text-muted-foreground text-sm mb-4 flex-1">
                  {{ t(`projects.items.${index}.description`) }}
                </p>
                
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="(tech, techIndex) in project.technologies"
                    :key="tech"
                    class="px-3 py-1 text-xs rounded-full font-medium border transition-all duration-300 hover:scale-105"
                    :class="[
                      techIndex % 3 === 0 ? 'bg-primary/10 border-primary/30 text-primary' : '',
                      techIndex % 3 === 1 ? 'bg-secondary/10 border-secondary/30 text-secondary' : '',
                      techIndex % 3 === 2 ? 'bg-accent/10 border-accent/30 text-accent' : ''
                    ]"
                  >
                    {{ tech }}
                  </span>
                </div>
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
import { ExternalLink, Github } from 'lucide-vue-next'

const { t } = useI18n()
const isVisible = ref(false)

const checkVisibility = () => {
  const element = document.getElementById('projects')
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

// Replace with your actual projects
const projects = [
  {
    title: 'Campania In Salute App',
    description: 'Full-featured health app for managing health data and appointments, with a user-friendly interface, secure data handling, and seamless integration with healthcare providers.',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/e1/81/53/e1815395-abd6-1281-c010-0bf256dba807/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/460x0w.webp',
    technologies: ['Xamarin Forms', 'C#', 'Node.js'],
    liveUrl: 'https://apps.apple.com/it/app/campania-in-salute/id1526791777',
    githubUrl: '#'
  },
  {
    title: 'ARPA',
    description: 'ARPA has transformed the procurement process for a global technology company, making it more efficient and traceable.',
    icon: '/img/arpa.png',
    technologies: ['Vue js', 'Javascript', 'Vuetify', 'Pinia'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'REFIT- REST METHODS NUGET PACKAGE',
    description: 'A .NET library that simplifies HTTP requests by providing a declarative way to define REST API clients using interfaces and attributes.',
    icon: 'https://api.nuget.org/v3-flatcontainer/refitrestmethodspackage/1.1.6/icon',
    technologies: ['C#', '.NET', 'NuGet', 'Visual Studio App Center'],
    liveUrl: 'https://www.nuget.org/packages/RefitRestMethodsPackage',
    githubUrl: '#'
  },
  {
    title: 'Entropia didattica: una nuova misura per la similarità tra mappe concettuali',
    description: 'The thesis work carried out with supervisor prof. Filippo Sciarrone. The project set out to find and describe, through a web platform, a new measure of similarity between concept maps.',
    icon: '/img/hcm.png',
    technologies: ['Vue.js', 'Chart.js', 'JavaScript', 'TypeScript'],
    liveUrl: 'https://entropy-henna.vercel.app/',
    githubUrl: '#'
  },
  {
    title: 'Old Portfolio Website',
    description: 'My previous portfolio website showcasing my projects and skills before the current version.',
    icon: 'https://avatars.githubusercontent.com/u/28861456?v=4',
    technologies: ['Vuejs', 'CSS', 'ElementUI'],
    liveUrl: 'https://portfolio-e6pdxlbb7-fabriginseng.vercel.app/',
    githubUrl: '#'
  },
  {
    title: 'QuickQueueSystem',
    description: 'A system for managing and optimizing queues in various environments, enhancing customer experience and operational efficiency.',
    icon: 'https://kinsta.com/wp-content/uploads/2022/03/what-is-vue-3.png',
    technologies: ['VueJs', 'Ionic', 'Node.js', 'PostgreSQL', 'Fastify'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'E-commerce template',
    description: 'Modern e-commerce platform with product management',
    icon: 'https://kinsta.com/wp-content/uploads/2022/03/what-is-vue-3.png',
    technologies: ['Vue.js', 'Pinia', 'JavaScript'],
    liveUrl: 'https://github.com/FabriGinseng/ecommerce',
    githubUrl: '#'
  }
]
</script>
