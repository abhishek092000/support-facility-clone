import { Link } from 'react-router-dom'
import { PageStyles } from '../components/PageStyles'
import { useLeadForm } from '../components/useLeadForm'
import css from '../pagecss/css_1f4125465b.js'

export default function PageContact() {
  const { status, error, fieldErrors, handleSubmit } = useLeadForm({
    formType: 'Website Contact Request',
  })

  return (
    <>
      <PageStyles css={css} />
      <main><section className="inner-hero"><div className="container contact-layout"><div>    <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Contact</span></div>
    <span className="kicker">Talk to a human</span><h1>Bring us the bottleneck.</h1><p>Tell us what you support, where the pressure is and the coverage you need. We’ll help you identify a practical starting point.</p><div className="contact-options"><a href="https://wa.me/919823103626" target="_blank" rel="noreferrer"><svg className="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.7-5A7 7 0 1 1 21 15z" /></svg><div><small>WhatsApp</small><strong>+91 98231 03626</strong></div></a><div><svg className="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg><div><small>Coverage</small><strong>Available 24/7</strong></div></div><a href="https://www.linkedin.com/company/supportfacility-com/" target="_blank" rel="noreferrer"><svg className="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M10 14 21 3M18 13v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h7" /></svg><div><small>LinkedIn</small><strong>Support Facility</strong></div></a><a href="https://www.linkedin.com/in/subodhmahant/" target="_blank" rel="noreferrer"><svg className="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M10 14 21 3M18 13v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h7" /></svg><div><small>LinkedIn</small><strong>Subodh Mahant</strong></div></a></div></div><div className="form-card"><h2>Start the conversation</h2><p>Short form. No unnecessary qualification maze.</p><form className="lead-form" onSubmit={handleSubmit} noValidate>
    <input type="hidden" name="form_type" value="Website Contact Request" />
    <div className="form-honeypot" aria-hidden="true"><label htmlFor="website-contact">Leave this field empty</label><input id="website-contact" name="_honey" tabIndex="-1" autoComplete="off" /></div>
    <div className="form-row">
        <div><label htmlFor="name-contact">Name</label><input id="name-contact" name="name" autoComplete="name" required placeholder="Your name" aria-invalid={fieldErrors.name ? 'true' : undefined} />{fieldErrors.name && <small className="form-field-error">{fieldErrors.name}</small>}</div>
        <div><label htmlFor="email-contact">Business email</label><input id="email-contact" name="email" type="email" autoComplete="email" required placeholder="you@company.com" aria-invalid={fieldErrors.email ? 'true' : undefined} />{fieldErrors.email && <small className="form-field-error">{fieldErrors.email}</small>}</div>
    </div>
    <div className="form-row">
        <div><label htmlFor="company-contact">Company</label><input id="company-contact" name="company" autoComplete="organization" required placeholder="Company name" aria-invalid={fieldErrors.company ? 'true' : undefined} />{fieldErrors.company && <small className="form-field-error">{fieldErrors.company}</small>}</div>
        <div><label htmlFor="phone-contact">Phone / WhatsApp</label><input id="phone-contact" name="phone" type="tel" autoComplete="tel" placeholder="Country code + number" aria-invalid={fieldErrors.phone ? 'true' : undefined} />{fieldErrors.phone && <small className="form-field-error">{fieldErrors.phone}</small>}</div>
    </div>
    <div><label htmlFor="service-contact">What do you need help with?</label><select id="service-contact" name="service" required className="form-select" aria-invalid={fieldErrors.service ? 'true' : undefined}><option value="" disabled>Select a service</option><option>Support</option><option>Cybersecurity</option><option>Website / White-Label Development</option><option>Technical Support</option><option>Dedicated Team</option><option>Server Management</option><option>Cloud</option><option>WordPress Development</option><option>Website Support</option><option>Migration</option><option>Others</option></select>{fieldErrors.service && <small className="form-field-error">{fieldErrors.service}</small>}</div>
    <div><label htmlFor="message-contact">A little context</label><textarea id="message-contact" name="message" rows="4" placeholder="What are you trying to solve, and what coverage do you need?"></textarea></div>
    <p className="form-consent">By submitting, you agree that Support Facility may contact you about this request. Do not include passwords or sensitive credentials.</p>
    {error && <p className="form-status form-status-error" role="alert">{error}</p>}
    <button type="submit" className="button button-primary form-submit" disabled={status === 'submitting'}>{status === 'submitting' ? 'Sending...' : 'Talk to an expert'} <svg className="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></button>
    <p className="form-security-note">Protected by Google reCAPTCHA and automated spam filtering.</p>
</form>
</div></div></section><section className="section pale-section"><div className="container"><div className="section-heading"><span className="kicker">Our offices</span><h2>Local teams in Nashik and Pune.</h2><p>Connect with Support Facility through either Maharashtra office.</p></div><div className="office-grid"><article><svg className="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z" /><circle cx="12" cy="10" r="2" /></svg><div><span>Nashik</span><h3>Chintamani Tower</h3><p>Gangapur Road, Nashik, Maharashtra</p></div></article><article><svg className="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z" /><circle cx="12" cy="10" r="2" /></svg><div><span>Pune</span><h3>Lunawat Realty</h3><p>Near Vanaz Metro Station, Kothrud, Pune</p></div></article></div></div></section></main>
    </>
  )
}
