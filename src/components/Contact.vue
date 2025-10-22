<template>
  <section id="contact" class="relative py-32 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/5"></div>
    
    <!-- Elementi decorativi -->
    <div class="absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
    
    <div class="container mx-auto px-4 relative z-10">
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4 text-primary">
            {{ t('contact.title') }}
          </h2>
          <div class="h-1 w-24 mx-auto bg-gradient-to-r from-primary via-secondary to-accent rounded-full mb-4"></div>
          <p class="text-lg text-foreground/70 dark:text-muted-foreground">{{ t('contact.subtitle') }}</p>
        </div>
        
        <form 
          @submit.prevent="handleSubmit" 
          class="space-y-6 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 md:p-10 shadow-2xl"
        >
          <div class="space-y-2">
            <label for="name" class="block text-sm font-semibold text-foreground">
              {{ t('contact.name') }}
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 border border-border/50 rounded-xl bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              placeholder="Mario Rossi"
            />
          </div>
          
          <div class="space-y-2">
            <label for="email" class="block text-sm font-semibold text-foreground">
              {{ t('contact.email') }}
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-border/50 rounded-xl bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              placeholder="mario@example.com"
            />
          </div>
          
          <div class="space-y-2">
            <label for="message" class="block text-sm font-semibold text-foreground">
              {{ t('contact.message') }}
            </label>
            <textarea
              id="message"
              v-model="form.message"
              rows="5"
              required
              class="w-full px-4 py-3 border border-border/50 rounded-xl bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-300"
              :placeholder="t('contact.message') + '...'"
            ></textarea>
          </div>
          
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-xl font-semibold hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {{ isSubmitting ? t('contact.sending') : t('contact.send') }}
          </button>
          
          <div v-if="submitStatus" class="text-center pt-4">
            <p 
              :class="submitStatus === 'success' ? 'text-accent' : 'text-destructive'"
              class="text-sm font-semibold flex items-center justify-center gap-2"
            >
              <span v-if="submitStatus === 'success'">✓</span>
              <span v-else>✗</span>
              {{ submitStatus === 'success' ? t('contact.success') : t('contact.error') }}
            </p>
          </div>
        </form>
        
        <!-- Social Links -->
        <div class="mt-16">
          <p class="text-center text-sm text-foreground/60 dark:text-muted-foreground mb-6">O contattami tramite</p>
          <div class="flex justify-center gap-6">
            <a 
              href="https://github.com/fabriGinseng" 
              target="_blank"
              rel="noopener noreferrer"
              class="group p-5 rounded-2xl bg-card border border-primary/20 hover:border-primary hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github :size="28" class="text-primary group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href="https://www.linkedin.com/in/antonio-fabrizio-fiume-13345a160/"
              target="_blank"
              rel="noopener noreferrer"
              class="group p-5 rounded-2xl bg-card border border-secondary/20 hover:border-secondary hover:shadow-2xl hover:shadow-secondary/30 transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin :size="28" class="text-secondary group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href="mailto:antoniofabriziofiume95@gmail.com"
              class="group p-5 rounded-2xl bg-card border border-accent/20 hover:border-accent hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 hover:scale-110"
              aria-label="Email"
            >
              <Mail :size="28" class="text-accent group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Github, Linkedin, Mail } from 'lucide-vue-next'
import emailjs from '@emailjs/browser'

const { t } = useI18n()

// EmailJS Configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = 'j0rV1ZX_mZHFsiS7V'

// Initialize EmailJS
onMounted(() => {
  emailjs.init(EMAILJS_PUBLIC_KEY)
})

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref<'success' | 'error' | null>(null)

const handleSubmit = async () => {
  isSubmitting.value = true
  submitStatus.value = null
  
  try {
    // Prepare template parameters for EmailJS
    const templateParams = {
      to_email: form.email, // Your email (where you receive)
      to_name: form.name,
      from_name: 'Antonio Fabrizio Fiume',                          // Sender's name
      from_email: 'antoniofabriziofiume95@gmail.com',                        // Sender's email
      message: form.message,
      reply_to: form.email
    }

    console.log('Sending email with params:', templateParams)
    console.log('Service ID:', EMAILJS_SERVICE_ID)
    console.log('Template ID:', EMAILJS_TEMPLATE_ID)

    // Send email using EmailJS with proper structure
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    )
    
    console.log('EmailJS Response:', response)
    submitStatus.value = 'success'
    
    // Reset form
    form.name = ''
    form.email = ''
    form.message = ''
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      submitStatus.value = null
    }, 5000)
  } catch (error) {
    console.error('EmailJS Error:', error)
    submitStatus.value = 'error'
    
    // Hide error message after 5 seconds
    setTimeout(() => {
      submitStatus.value = null
    }, 5000)
  } finally {
    isSubmitting.value = false
  }
}
</script>
