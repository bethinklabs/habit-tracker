/**
 * anime.js (v4) animation helpers.
 *
 * These are progressive enhancement: every helper is wrapped so a failure never
 * breaks the UI or the app's behavior. Durations are short to keep the app
 * responsive and the tests stable.
 */
import { animate, stagger } from 'animejs'

/** Staggered fade-and-slide for a set of list rows (used on first load). */
export function animateListIn(items: HTMLElement[]): void {
  if (!items.length) return
  try {
    animate(items, {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 380,
      delay: stagger(45),
      ease: 'out(3)',
    })
  } catch {
    items.forEach((el) => (el.style.opacity = '1'))
  }
}

/** Fade-and-slide a single newly added row into place. */
export function animateRowIn(el: HTMLElement): void {
  try {
    animate(el, {
      opacity: [0, 1],
      translateY: [-8, 0],
      scale: [0.98, 1],
      duration: 320,
      ease: 'out(3)',
    })
  } catch {
    el.style.opacity = '1'
  }
}

/** Fade-and-slide a row out. Resolves when done (with a fallback timer). */
export function animateRowOut(el: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    let settled = false
    const done = () => {
      if (settled) return
      settled = true
      resolve()
    }
    const fallback = setTimeout(done, 400)
    try {
      animate(el, {
        opacity: [1, 0],
        translateX: [0, 16],
        scale: [1, 0.97],
        duration: 240,
        ease: 'in(2)',
        onComplete: () => {
          clearTimeout(fallback)
          done()
        },
      })
    } catch {
      clearTimeout(fallback)
      done()
    }
  })
}

/** A small horizontal shake to draw attention to a validation error. */
export function animateShake(el: HTMLElement): void {
  try {
    animate(el, {
      translateX: [0, -6, 6, -4, 4, 0],
      duration: 360,
      ease: 'inOut(2)',
    })
  } catch {
    /* no-op */
  }
}

/** Scale-and-fade a dialog panel and its overlay in. */
export function animateDialogIn(overlay: HTMLElement, panel: HTMLElement): void {
  try {
    animate(overlay, { opacity: [0, 1], duration: 160, ease: 'out(2)' })
    animate(panel, {
      opacity: [0, 1],
      scale: [0.94, 1],
      translateY: [8, 0],
      duration: 240,
      ease: 'out(3)',
    })
  } catch {
    overlay.style.opacity = '1'
    panel.style.opacity = '1'
  }
}
