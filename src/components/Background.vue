<template>
  <section id="background" class="relative py-32 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background"></div>
    
    <div class="container mx-auto px-4 relative z-10">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4 text-accent">
            {{ t('background.title') }}
          </h2>
          <div class="h-1 w-24 mx-auto bg-gradient-to-r from-accent via-primary to-secondary rounded-full"></div>
        </div>
        
        <div class="space-y-8">
          <div 
            v-for="(_, index) in education" 
            :key="index"
            class="group transform transition-all duration-700 hover:scale-[1.02]"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'"
            :style="{ transitionDelay: `${index * 150}ms` }"
          >
            <div class="bg-card/80 backdrop-blur-sm border border-accent/20 rounded-2xl p-6 md:p-8 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 hover:border-accent/50">
              <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div class="flex-1">
                  <div class="flex items-start gap-4">
                    <div class="p-3 bg-accent rounded-xl shadow-lg">
                      <GraduationCap :size="24" class="text-primary" />
                    </div>
                    <div class="flex-1">
                      <h3 class="text-2xl font-bold mb-2 text-foreground group-hover:text-accent transition-colors">
                        {{ t(`background.education.${index}.degree`) }}
                      </h3>
                      <p class="text-lg font-semibold text-primary mb-3">
                        {{ t(`background.education.${index}.institution`) }}
                      </p>
                      <p class="text-foreground/80 dark:text-muted-foreground leading-relaxed">
                        {{ t(`background.education.${index}.description`) }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="text-sm font-medium px-4 py-2 bg-muted/30 rounded-lg border border-border/50 md:text-right whitespace-nowrap">
                  {{ t(`background.education.${index}.period`) }}
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
import { GraduationCap } from 'lucide-vue-next'

const { t } = useI18n()
const isVisible = ref(false)

const checkVisibility = () => {
  const element = document.getElementById('background')
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

// Education data length - used for v-for
const education = [0, 1] // Array indices for i18n

</script>
