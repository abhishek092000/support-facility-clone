import astraCss from './original/astra.css?raw'
import siteCss from './original/site.css?raw'

// Original cascade order: Astra theme CSS, then the page's inline Astra
// overrides, then the child theme stylesheet that overrides both.
export function buildPageCss(inlineCss) {
  return `${astraCss}\n${inlineCss}\n${siteCss}`
}
