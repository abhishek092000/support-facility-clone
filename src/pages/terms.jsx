import { Link } from 'react-router-dom'
import { PageStyles } from '../components/PageStyles'
import css from '../pagecss/css_1f4125465b.js'

export default function PageTerms() {
  return (
    <>
      <PageStyles css={css} />
      <main><section className="inner-hero compact-hero"><div className="container">    <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Terms</span></div>
    <span className="kicker">Last updated August 31, 2026</span><h1>Website terms</h1><p>The basic terms that apply when you browse and use this website.</p></div></section><section className="section"><div className="container legal-content"><section><h2>Website information</h2><p>This website provides general information about Support Facility’s technical services. It is not a binding service offer, guarantee or service-level agreement.</p></section><section><h2>Service engagements</h2><p>Work begins only after scope, responsibilities, access, pricing and applicable service expectations are confirmed in a written proposal or agreement.</p></section><section><h2>Acceptable use</h2><p>You may not misuse this website, interfere with its operation, attempt unauthorized access or submit malicious or unlawful content through its forms.</p></section><section><h2>Third-party services</h2><p>Links to third-party services, including WhatsApp, are provided for convenience. Those services operate under their own terms and privacy practices.</p></section><div className="legal-contact"><svg className="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.7-5A7 7 0 1 1 21 15z" /></svg><div><strong>Questions about this page?</strong><p>Contact Support Facility and a human will respond.</p></div><Link to="/contact">Contact us <svg className="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></Link></div></div></section></main>
    </>
  )
}
