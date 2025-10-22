<template>
  <div :class="cn('flex items-center gap-3', props.class)">
    <svg 
      :width="size" 
      :height="size" 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      class="transition-all duration-300"
    >
      <!-- Sfondo gradiente -->
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:hsl(210, 100%, 50%);stop-opacity:1" />
          <stop offset="50%" style="stop-color:hsl(282, 83%, 58%);stop-opacity:1" />
          <stop offset="100%" style="stop-color:hsl(142, 76%, 36%);stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- F (Fiume) -->
      <path d="M20 25 L40 25 M20 25 L20 55 M20 40 L35 40" 
            stroke="url(#logoGradient)" 
            stroke-width="4" 
            stroke-linecap="round" 
            stroke-linejoin="round"/>
      
      <!-- A (Antonio) -->
      <path d="M50 55 L50 25 L65 55 M52 45 L63 45" 
            stroke="url(#logoGradient)" 
            stroke-width="4" 
            stroke-linecap="round" 
            stroke-linejoin="round"/>
      
      <!-- F (Fabrizio) -->
      <path d="M70 25 L85 25 M70 25 L70 55 M70 40 L82 40" 
            stroke="url(#logoGradient)" 
            stroke-width="4" 
            stroke-linecap="round" 
            stroke-linejoin="round"/>
      
      <!-- Decorative circle con gradiente -->
      <circle cx="50" cy="70" r="8" 
              stroke="url(#logoGradient)" 
              stroke-width="2.5" 
              fill="none"/>
    </svg>
        <span v-if="showText" :class="cn('font-bold text-xl tracking-tight text-primary', textClass)">
      F.A.F
    </span>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  size?: number
  showText?: boolean
  text?: string
  class?: string
  textClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 45,
  showText: true,
  text: 'FAF',
  class: '',
  textClass: ''
})
</script>
