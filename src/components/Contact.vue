<template>
  <section id="contact" class="frame mx-auto max-w-[110rem] py-24 md:py-32">
    <div class="grid gap-14 md:grid-cols-2 md:gap-20">
      <div data-reveal>
        <p class="font-display text-2xl font-semibold text-muted">{{ t('contact.prompt1') }}</p>
        <h2 class="text-head mt-3 font-display font-bold leading-[1] tracking-[-0.035em]">{{ t('contact.prompt2') }}</h2>
        <dl class="mt-12 space-y-5">
          <div>
            <dt class="text-muted">{{ t('contact.email') }}</dt>
            <dd><a href="mailto:antoniofabriziofiume95@gmail.com" class="break-all font-display text-2xl font-semibold text-accent underline underline-offset-4">antoniofabriziofiume95@gmail.com</a></dd>
          </div>
          <div>
            <dt class="text-muted">GitHub</dt>
            <dd><a href="https://github.com/fabriGinseng" target="_blank" rel="noopener noreferrer" class="font-medium underline underline-offset-4 hover:text-accent">github.com/fabriGinseng</a></dd>
          </div>
          <div>
            <dt class="text-muted">LinkedIn</dt>
            <dd><a href="https://www.linkedin.com/in/antonio-fabrizio-fiume-13345a160/" target="_blank" rel="noopener noreferrer" class="font-medium underline underline-offset-4 hover:text-accent">Antonio Fabrizio Fiume</a></dd>
          </div>
        </dl>
        <img src="/img/naples-harbour.jpg" :alt="t('contact.harbourAlt')" width="1200" height="743" loading="lazy" class="mt-12 block w-full" />
      </div>

      <form ref="contactForm" @submit.prevent="handleSubmit" class="space-y-5" data-reveal style="--d: 120ms">
        <div class="space-y-2">
          <label for="name" class="block font-medium">{{ t('contact.name') }}</label>
          <input id="name" v-model="form.name" name="from_name" type="text" required autocomplete="name" class="h-14 w-full bg-surface px-5 text-ink focus:outline-none focus:ring-2 focus:ring-accent" />
        </div>
        <div class="space-y-2">
          <label for="email" class="block font-medium">{{ t('contact.email') }}</label>
          <input id="email" v-model="form.email" name="reply_to" type="email" required autocomplete="email" class="h-14 w-full bg-surface px-5 text-ink focus:outline-none focus:ring-2 focus:ring-accent" />
        </div>
        <div class="space-y-2">
          <label for="message" class="block font-medium">{{ t('contact.message') }}</label>
          <textarea id="message" v-model="form.message" name="message" rows="5" required class="w-full resize-none bg-surface px-5 py-4 text-ink focus:outline-none focus:ring-2 focus:ring-accent"></textarea>
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="inline-flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap bg-accent px-7 py-3 font-medium text-on-accent transition-transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 md:w-auto"
        >
          {{ isSubmitting ? t('contact.sending') : t('contact.send') }}
          <ArrowRight :size="18" />
        </button>

        <p v-if="submitStatus" role="status" class="font-medium" :class="submitStatus === 'success' ? 'text-ink' : 'text-danger'">
          {{ submitStatus === 'success' ? t('contact.success') : t('contact.error') }}
        </p>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowRight } from 'lucide-vue-next'
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
