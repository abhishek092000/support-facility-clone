import { Link } from 'react-router-dom'
import { PageStyles } from '../components/PageStyles'
import css from '../pagecss/thank-you.js'

export default function PageThankYou() {
  return (
    <>
      <PageStyles css={css} />
      <main><section className="inner-hero"><div className="container legal-placeholder"><svg className="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></svg><span className="kicker">Enquiry received</span><h1>Thank you. A human will review your request.</h1><p>Your enquiry has been sent to the Support Facility sales team. They will use the details provided to discuss fit, scope and next steps.</p><div className="hero-actions"><Link className="button button-primary" to="/">Return to the homepage</Link><a className="button button-ghost" href="https://wa.me/919823103626" target="_blank" rel="noreferrer"><svg className="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.7-5A7 7 0 1 1 21 15z" /></svg> WhatsApp us</a></div></div></section></main>
    </>
  )
}
