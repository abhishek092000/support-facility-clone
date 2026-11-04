import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const revealSelectors = [
  '.section-heading > *', '.service-card', '.level-card', '.audience-list article',
  '.process-grid li', '.comparison-copy > *', '.comparison-table', '.trial-banner > *',
  '.faq-layout > *', '.problem-grid > *', '.check-grid > *', '.tech-grid > *',
  '.two-col-list > *', '.mini-process article', '.plan-card', '.owner-note',
  '.values-grid article', '.security-grid article', '.resource-grid article',
  '.article-body section', '.article-checklist', '.legal-content > section',
  '.legal-contact', '.legal-placeholder', '.form-card', '.contact-options > *',
  '.final-cta-inner > *',
].join(',')

function initMotion() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.documentElement.classList.toggle('motion-disabled', reduceMotion)

  const intros = Array.from(
    document.querySelectorAll(
      '.hero-copy > *, .inner-hero .breadcrumb, .inner-hero .kicker, .inner-hero h1, .inner-hero p, .inner-hero .hero-actions, .hero-service-mark, .trial-points'
    )
  )
  intros.forEach((element, index) => {
    element.classList.add('page-intro')
    element.style.setProperty('--intro-delay', `${Math.min(index * 75, 500)}ms`)
  })

  const reveals = Array.from(document.querySelectorAll(revealSelectors))
  reveals.forEach((element, index) => {
    element.classList.add('reveal-item')
    element.style.setProperty('--reveal-delay', `${(index % 4) * 70}ms`)
  })

  let observer = null
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((element) => element.classList.add('is-visible'))
  } else {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -7% 0px' }
    )
    reveals.forEach((element) => observer.observe(element))
  }

  document.documentElement.classList.add('motion-ready')
  return () => {
    if (observer) observer.disconnect()
    intros.forEach((element) => {
      element.classList.remove('page-intro')
      element.style.removeProperty('--intro-delay')
    })
    reveals.forEach((element) => {
      element.classList.remove('reveal-item', 'is-visible')
      element.style.removeProperty('--reveal-delay')
    })
    document.documentElement.classList.remove('motion-ready')
  }
}

function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress span')
  const update = () => {
    const distance = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    if (bar) bar.style.transform = `scaleX(${Math.min(1, window.scrollY / distance)})`
    document.body.classList.toggle('has-scrolled', window.scrollY > 16)
  }
  update()
  window.addEventListener('scroll', update, { passive: true })
  return () => window.removeEventListener('scroll', update)
}

function initDrawer() {
  const drawer = document.querySelector('#mobile-drawer')
  const backdrop = document.querySelector('.mobile-drawer-backdrop')
  const openButton = document.querySelector('.mobile-menu-button')
  const closeButton = document.querySelector('.mobile-menu-close')
  if (!drawer || !backdrop || !openButton) return () => {}

  const setOpen = (open) => {
    drawer.classList.toggle('is-open', open)
    backdrop.classList.toggle('is-open', open)
    backdrop.hidden = !open
    drawer.setAttribute('aria-hidden', String(!open))
    openButton.setAttribute('aria-expanded', String(open))
    document.body.classList.toggle('mobile-nav-open', open)
    if (open) closeButton?.focus()
    else openButton.focus()
  }

  const onClickOpen = () => setOpen(true)
  const onClickClose = () => setOpen(false)
  const onBackdrop = () => setOpen(false)
  const onKeydown = (event) => {
    if (event.key === 'Escape' && drawer.classList.contains('is-open')) setOpen(false)
  }
  const linkHandlers = []
  drawer.querySelectorAll('a').forEach((link) => {
    const handler = () => setOpen(false)
    linkHandlers.push([link, handler])
    link.addEventListener('click', handler)
  })

  openButton.addEventListener('click', onClickOpen)
  closeButton?.addEventListener('click', onClickClose)
  backdrop.addEventListener('click', onBackdrop)
  document.addEventListener('keydown', onKeydown)

  return () => {
    openButton.removeEventListener('click', onClickOpen)
    closeButton?.removeEventListener('click', onClickClose)
    backdrop.removeEventListener('click', onBackdrop)
    document.removeEventListener('keydown', onKeydown)
    linkHandlers.forEach(([link, handler]) => link.removeEventListener('click', handler))
  }
}

function initNavGroups() {
  const cleanups = []
  document.querySelectorAll('.nav-group').forEach((group) => {
    const trigger = group.querySelector('.nav-trigger')
    const menu = group.querySelector('.mega-menu')
    if (!trigger || !menu) return
    const setExpanded = (expanded) => trigger.setAttribute('aria-expanded', String(expanded))
    const onEnter = () => setExpanded(true)
    const onLeave = () => setExpanded(false)
    const onFocusIn = () => setExpanded(true)
    const onFocusOut = (event) => {
      if (!group.contains(event.relatedTarget)) setExpanded(false)
    }
    group.addEventListener('mouseenter', onEnter)
    group.addEventListener('mouseleave', onLeave)
    group.addEventListener('focusin', onFocusIn)
    group.addEventListener('focusout', onFocusOut)
    cleanups.push(() => {
      group.removeEventListener('mouseenter', onEnter)
      group.removeEventListener('mouseleave', onLeave)
      group.removeEventListener('focusin', onFocusIn)
      group.removeEventListener('focusout', onFocusOut)
    })
  })
  return () => cleanups.forEach((fn) => fn())
}

export function useRevealEffects() {
  const { pathname } = useLocation()

  useEffect(() => {
    const cleanups = [initMotion(), initDrawer(), initNavGroups()]
    const progress = initScrollProgress()
    return () => {
      cleanups.forEach((fn) => fn && fn())
      progress()
    }
  }, [pathname])
}
