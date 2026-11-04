import { Link } from 'react-router-dom'
import { PageStyles } from '../components/PageStyles'
import css from '../pagecss/css_1f4125465b.js'

export default function PageSolutions() {
  return (
    <>
      <PageStyles css={css} />
      <main><section className="inner-hero compact-hero"><div className="container">    <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Solutions</span></div>
    <span className="kicker">Support Facility</span><h1>Solutions</h1></div></section><section className="section"><div className="container legal-content sf-editor-content"></div></section></main>
    </>
  )
}
