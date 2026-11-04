import { Link } from 'react-router-dom'
import { PageStyles } from '../components/PageStyles'
import css from '../pagecss/free-trial.js'

export default function PageFreeTrial() {
  return (
    <>
      <PageStyles css={css} />
      <main><section className="inner-hero trial-hero"><div className="container trial-layout"><div>    <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Free trial</span></div>
    <span className="kicker">Try one basic issue</span><h1>A practical way to see how we work.</h1><p>Use the trial request to describe one basic issue. The team will confirm eligibility, required access and what happens after the trial before work starts.</p><div className="trial-points"><span><svg className="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></svg> One defined basic issue</span><span><svg className="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></svg> Scope confirmed first</span><span><svg className="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></svg> No credentials in this form</span></div></div><div className="form-card"><h2>Request your trial</h2><p>Tell us what you need. A human will review the fit.</p><form className="lead-form" action="https://formsubmit.co/sales@supportfacility.com" method="post">
    <input type="hidden" name="_subject" value="Support Facility — Free Trial Request" />
    <input type="hidden" name="_next" value="https://www.supportfacility.com/thank-you/" />
    <input type="hidden" name="_template" value="table" />
    <input type="hidden" name="_url" value="https://www.supportfacility.com/free-trial/" />
    <input type="hidden" name="form_type" value="Free Trial Request" />
    <div className="form-honeypot" aria-hidden="true"><label htmlFor="website-trial">Leave this field empty</label><input id="website-trial" name="_honey" tabIndex="-1" autoComplete="off" /></div>
    <div className="form-row">
        <div><label htmlFor="name-trial">Name</label><input id="name-trial" name="name" autoComplete="name" required placeholder="Your name" /></div>
        <div><label htmlFor="email-trial">Business email</label><input id="email-trial" name="email" type="email" autoComplete="email" required placeholder="you@company.com" /></div>
    </div>
    <div className="form-row">
        <div><label htmlFor="company-trial">Company</label><input id="company-trial" name="company" autoComplete="organization" required placeholder="Company name" /></div>
        <div><label htmlFor="phone-trial">Phone / WhatsApp</label><input id="phone-trial" name="phone" type="tel" autoComplete="tel" placeholder="Country code + number" /></div>
    </div>
    <div><label htmlFor="service-trial">What do you need help with?</label><select id="service-trial" name="service" required className="form-select"><option value="" disabled>Select a service</option><option>Support</option><option>Cybersecurity</option><option>Website / White-Label Development</option><option>Technical Support</option><option>Dedicated Team</option><option>Server Management</option><option>Cloud</option><option>WordPress Development</option><option>Website Support</option><option>Migration</option><option>Others</option></select></div>
    <div><label htmlFor="message-trial">A little context</label><textarea id="message-trial" name="message" rows="4" placeholder="Tell us the issue or service you would like to trial."></textarea></div>
    <p className="form-consent">By submitting, you agree that Support Facility may contact you about this request. Do not include passwords or sensitive credentials.</p>
    <button type="submit" className="button button-primary form-submit">Request my trial <svg className="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></button>
    <p className="form-security-note">Protected by Google reCAPTCHA and automated spam filtering.</p>
</form>
</div></div></section><section className="section"><div className="container mini-process"><article><svg className="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg><h3>1. Describe</h3><p>Explain the issue and environment.</p></article><article><svg className="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6m-12 7 2 2 4-4" /></svg><h3>2. Qualify</h3><p>We confirm whether it fits the trial.</p></article><article><svg className="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="15" r="4" /><path d="m11 12 9-9m-3 3 3 3m-6 0 3 3" /></svg><h3>3. Connect</h3><p>Agree a safe method for required access.</p></article><article><svg className="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></svg><h3>4. Resolve</h3><p>Work is documented and next steps are clear.</p></article></div></section></main>
    </>
  )
}
