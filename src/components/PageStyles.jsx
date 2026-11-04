import { useInsertionEffect, useMemo } from 'react'
import { buildPageCss } from '../originalCss'

const mounted = new Map()

export function PageStyles({ css }) {
  const fullCss = useMemo(() => buildPageCss(css), [css])

  useInsertionEffect(() => {
    let node = mounted.get(fullCss)
    if (!node) {
      node = document.createElement('style')
      node.setAttribute('data-page-style', '')
      node.textContent = fullCss
      document.head.appendChild(node)
      mounted.set(fullCss, node)
    }
    return () => {
      const current = mounted.get(fullCss)
      if (current && current.parentNode) current.parentNode.removeChild(current)
      mounted.delete(fullCss)
    }
  }, [fullCss])

  return null
}
