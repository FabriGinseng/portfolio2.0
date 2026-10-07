<template>
  <div>
    <Header />
    <main>
      <Hero />
      <About />
      <Background />
      <Experience />
      <Projects />
      <Contact />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue'
import Hero from '../components/Hero.vue'
import About from '../components/About.vue'
import Background from '../components/Background.vue'
import Experience from '../components/Experience.vue'
import Projects from '../components/Projects.vue'
import Contact from '../components/Contact.vue'
import Footer from '../components/Footer.vue'
</script>
