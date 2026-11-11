<template>
  <div class="chapters">
    <Header />
    <main>
      <Hero />
      <About />
      <Projects />
      <Experience />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Header from '../components/Header.vue'
import Hero from '../components/Hero.vue'
import About from '../components/About.vue'
import Experience from '../components/Experience.vue'
import Projects from '../components/Projects.vue'
import Footer from '../components/Footer.vue'
import { useReveal } from '../composables/useReveal'

onMounted(useReveal)
</script>
