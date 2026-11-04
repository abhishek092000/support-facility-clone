import { useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Header from './generated/Header'
import Footer from './generated/Footer'
import { pageRoutes } from './generated/routes'
import { useRevealEffects } from './siteEffects'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function PageMeta() {
  const { pathname } = useLocation()
  const route = pageRoutes.find((entry) => entry.path === pathname) || pageRoutes.find((entry) => entry.path === '/')

  useEffect(() => {
    if (!route) return
    document.title = route.title
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = route.description
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = route.canonical
    document.body.className = route.bodyClass
  }, [route])

  return null
}

function NotFound() {
  return (
    <main>
      <section className="inner-hero">
        <div className="container">
          <span className="kicker">404</span>
          <h1>Page not found.</h1>
          <div className="hero-actions">
            <Link className="button button-primary" to="/">Return to the homepage</Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export function SiteApp() {
  useRevealEffects()

  return (
    <>
      <ScrollToTop />
      <PageMeta />
      <Header key="header" />
      <Routes>
        {pageRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer key="footer" />
    </>
  )
}

export default SiteApp
