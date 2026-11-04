import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
<footer className="site-footer">
    <div className="container footer-grid">
        <div className="footer-brand">
            <Link to="/" className="brand"><span className="brand-mark"><svg className="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg></span><span><strong>Support</strong> Facility</span></Link>
            <p>Technical support, server operations, cloud assistance and white-label development for businesses that need capable people on call.</p>
            <a className="human-link" href="https://wa.me/919823103626" target="_blank" rel="noreferrer"><svg className="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.7-5A7 7 0 1 1 21 15z" /></svg> Talk to a human</a>
            <div className="footer-socials"><a href="https://www.linkedin.com/company/supportfacility-com/" target="_blank" rel="noreferrer"><svg className="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M10 14 21 3M18 13v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h7" /></svg> Company LinkedIn</a><a href="https://www.linkedin.com/in/subodhmahant/" target="_blank" rel="noreferrer"><svg className="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M10 14 21 3M18 13v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h7" /></svg> Subodh Mahant</a></div>
        </div>
        <div><strong>Solutions</strong><Link to="/solutions/technical-support">Technical support</Link><Link to="/solutions/cloud-solutions">Cloud solutions</Link><Link to="/solutions/devops">DevOps</Link><Link to="/solutions/kubernetes-solutions">Kubernetes</Link></div>
        <div><strong>Cybersecurity</strong><Link to="/cybersecurity/assessment">Security assessments</Link><Link to="/cybersecurity/incident-response">Incident response</Link><Link to="/cybersecurity/compliance">Compliance</Link><Link to="/cybersecurity/security-operations">Security operations</Link></div>
        <div><strong>Company</strong><Link to="/about">About</Link><Link to="/blog">Blog</Link><Link to="/resources">Knowledge centre</Link><Link to="/contact">Contact</Link><Link to="/free-trial">Free trial</Link></div>
    </div>
    <div className="container footer-bottom"><span>© 2026 Support Facility. All rights reserved.</span><div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div></div>
</footer><a className="whatsapp-float" href="https://wa.me/919823103626" target="_blank" rel="noreferrer" aria-label="Talk to Support Facility on WhatsApp"><svg className="" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.7-5A7 7 0 1 1 21 15z" /></svg><span>Talk to a human</span></a>
    </>
  )
}
