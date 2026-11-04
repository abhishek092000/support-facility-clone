import { useInsertionEffect } from 'react'

// The theme stylesheets are render-blocking <link>s in index.html, so the very
// first paint is already styled. Only the per-page Astra inline overrides need
// injecting, and they must land in the same slot in the original cascade.
export function PageStyles({ css }) {
  useInsertionEffect(() => {
    const node = document.getElementById('page-inline-css')
    if (!node) return
    node.textContent = css
  }, [css])

  return null
}
