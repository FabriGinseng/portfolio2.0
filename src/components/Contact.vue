<template>
  <section id="contact" class="border-t border-line py-24 md:py-32">
    <div class="mx-auto grid max-w-6xl gap-16 px-5 md:grid-cols-2 md:px-8">
      <div>
        <h2 class="font-display text-4xl font-semibold tracking-tight md:text-6xl">{{ t('contact.title') }}</h2>
        <p class="mt-4 max-w-[40ch] text-lg text-muted">{{ t('contact.subtitle') }}</p>
        <a
          href="mailto:antoniofabriziofiume95@gmail.com"
          class="mt-8 inline-block break-all font-display text-xl font-semibold text-accent underline decoration-1 underline-offset-4 md:text-2xl"
        >
          antoniofabriziofiume95@gmail.com
        </a>
        <ul class="mt-8 flex gap-6">
          <li>
            <a href="https://github.com/fabriGinseng" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-muted hover:text-ink">
              <Github :size="18" /> GitHub
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/antonio-fabrizio-fiume-13345a160/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-muted hover:text-ink">
              <Linkedin :size="18" /> LinkedIn
            </a>
          </li>
        </ul>
      </div>

      <form ref="contactForm" @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-2">
          <label for="name" class="block text-sm font-medium">{{ t('contact.name') }}</label>
          <input id="name" v-model="form.name" name="from_name" type="text" required autocomplete="name" class="w-full rounded-md border border-field bg-transparent px-4 py-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent" />
        </div>
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium">{{ t('contact.email') }}</label>
          <input id="email" v-model="form.email" name="reply_to" type="email" required autocomplete="email" class="w-full rounded-md border border-field bg-transparent px-4 py-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent" />
        </div>
        <div class="space-y-2">
          <label for="message" class="block text-sm font-medium">{{ t('contact.message') }}</label>
          <textarea id="message" v-model="form.message" name="message" rows="5" required class="w-full rounded-md border border-field bg-transparent px-4 py-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent resize-none"></textarea>
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full whitespace-nowrap rounded-md bg-accent px-6 py-3.5 font-medium text-on-accent transition-transform active:scale-[0.98] disabled:opacity-50 md:w-auto"
        >
          {{ isSubmitting ? t('contact.sending') : t('contact.send') }}
        </button>

        <p v-if="submitStatus" role="status" class="text-sm font-medium" :class="submitStatus === 'success' ? 'text-ink' : 'text-danger'">
          {{ submitStatus === 'success' ? t('contact.success') : t('contact.error') }}
        </p>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Github, Linkedin } from 'lucide-vue-next'
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

const contactForm = ref<HTMLFormElement | null>(null)

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref<'success' | 'error' | null>(null)

const handleSubmit = async () => {
  if (!contactForm.value) return
  
  isSubmitting.value = true
  submitStatus.value = null
  
  try {
    // Send email using EmailJS sendForm with the form element
    await emailjs.sendForm(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      contactForm.value,
      {
        publicKey: EMAILJS_PUBLIC_KEY
      }
    )
    
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
