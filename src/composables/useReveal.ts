// Fa comparire ogni [data-reveal] quando entra nello schermo; senza IntersectionObserver restano visibili.
export function useReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'))
    return
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in')
          io.unobserve(e.target)
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  )
  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el))
}
