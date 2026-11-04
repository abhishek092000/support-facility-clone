import { Link } from 'react-router-dom'
import { PageStyles } from '../components/PageStyles'
import css from '../pagecss/privacy.js'

export default function PagePrivacy() {
  return (
    <>
      <PageStyles css={css} />
      <main><section className="inner-hero compact-hero"><div className="container">    <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Privacy</span></div>
    <span className="kicker">Last updated August 31, 2026</span><h1>Privacy notice</h1><p>How information submitted through this website is used and protected.</p></div></section><section className="section"><div className="container legal-content"><section><h2>Information you provide</h2><p>When you contact Support Facility, request a call or ask about a trial, you may provide your name, business contact information, company and details about the service you need. Do not submit passwords, access keys or other sensitive credentials through a website form.</p></section><section><h2>How information is used</h2><p>Information you submit may be used to respond to your request, assess service fit, prepare a proposal and continue a business conversation you have initiated.</p></section><section><h2>Service providers and retention</h2><p>Website, communications and business-service providers may process information where needed to operate the website and respond to requests. Information should be retained only as long as reasonably required for those purposes or applicable obligations.</p></section><section><h2>Your choices</h2><p>You may ask Support Facility to correct or delete contact information, subject to legitimate business and legal requirements. Contact the company through the contact page or WhatsApp number shown on this website.</p></section><div className="legal-contact"><svg className="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.7-5A7 7 0 1 1 21 15z" /></svg><div><strong>Questions about this page?</strong><p>Contact Support Facility and a human will respond.</p></div><Link to="/contact">Contact us <svg className="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></Link></div></div></section></main>
    </>
  )
}
