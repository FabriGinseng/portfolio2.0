# 🚀 Portfolio - Antonio Fabrizio Fiume

Modern and responsive personal portfolio built with Vue 3, TypeScript, and TailwindCSS.

![Vue 3](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Features

- 🎨 **Modern Design**: Clean minimalist interface with smooth animations
- 🌗 **Light/Dark Mode**: Theme toggle with saved preferences  
- 🌍 **Multilingual**: Full Italian and English support (vue-i18n)
- 📱 **Responsive**: Optimized for all devices
- ⚡ **Performance**: Fast loading with code splitting
- 🎭 **Animations**: Parallax effects and smooth transitions
- ♿ **Accessible**: WCAG compliant components
- 📧 **Contact Form**: Functional email form with EmailJS

## 🛠️ Tech Stack

**Core:** Vue 3, TypeScript, Vite, Vue Router  
**Styling:** TailwindCSS v4, CSS Custom Properties  
**UI:** Radix Vue, Lucide Icons  
**i18n:** Vue I18n (IT/EN)  
**Email:** EmailJS  
**Utils:** VueUse, class-variance-authority

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## 📧 EmailJS Setup

1. Create account at [emailjs.com](https://www.emailjs.com/)
2. Add email service and get Service ID
3. Create template and get Template ID  
4. Update `.env` file:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
```

**Template variables:** `to_email`, `to_name`, `from_name`, `from_email`, `message`, `reply_to`

## ⚙️ Configuration

### Colors

Edit `src/style.css`:

```css
:root {
  --color-primary: 210 100% 45%;    /* Blue */
  --color-secondary: 282 83% 55%;   /* Purple */
  --color-accent: 142 76% 36%;      /* Green */
}
```

### Content

- **Education**: `src/components/Background.vue`
- **Experience**: `src/components/Experience.vue`  
- **Projects**: `src/components/Projects.vue`
- **Translations**: `src/i18n/locales/en.json` and `it.json`

### Default Language

Edit `src/i18n/index.ts`:

```typescript
locale: 'it', // Change to 'en' for English
```

## 📁 Project Structure

```
src/
├── components/      # Vue components
├── composables/     # Vue composables (useTheme)
├── i18n/           # Internationalization
├── router/         # Vue Router config
├── views/          # Page views
└── style.css       # Global styles
```

## 🎨 Sections

- **Hero**: Landing with parallax effects
- **About**: Personal intro with stats
- **Background**: Education timeline
- **Experience**: Work history with tech badges
- **Projects**: Portfolio showcase
- **Contact**: Email form + social links
- **Footer**: Site info and links

## 🔧 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 🌐 Deploy

```bash
npm run build
# Deploy 'dist' folder to:
# - Vercel (recommended)
# - Netlify
# - GitHub Pages
# - Cloudflare Pages
```

## 👤 Author

**Antonio Fabrizio Fiume**

- GitHub: [@fabriGinseng](https://github.com/fabriGinseng)
- LinkedIn: [Antonio Fabrizio Fiume](https://www.linkedin.com/in/antonio-fabrizio-fiume-13345a160/)
- Email: antoniofabriziofiume95@gmail.com

## 📄 License

MIT License - Feel free to use this template for your own portfolio!

---

Made with ❤️ using Vue 3 + TypeScript + TailwindCSS
