import { Link } from 'react-router-dom'
import { PageStyles } from '../components/PageStyles'
import css from '../pagecss/planning-white-label-wordpress-delivery.js'

export default function PagePlanningWhiteLabelWordpressDelivery() {
  return (
    <>
      <PageStyles css={css} />
      <main><article><section className="inner-hero compact-hero"><div className="container article-hero"><div className="breadcrumb"><Link to="/blog">Blog</Link><span>/</span><span>WordPress agencies</span></div><span className="kicker">WordPress agencies</span><h1>What to agree before outsourcing WordPress delivery</h1><p>A practical starting point for agencies adding development capacity without handing over the client relationship.</p><div className="article-meta">Support Facility editorial team</div></div></section><section className="section"><div className="container article-hero article-body sf-editor-content"><h2 className="wp-block-heading">Define what stays with your agency</h2><p className="wp-block-paragraph">Decide who owns discovery, design approval and client communication. A delivery partner needs to know whether it is implementing an approved brief or helping shape one. Record that boundary so technical questions reach the right person without creating a second client-facing process.</p><h2 className="wp-block-heading">Write acceptance criteria before work starts</h2><p className="wp-block-paragraph">List the required pages, content responsibilities, integrations and review conditions. Include the devices and user journeys that matter to the client. Agree how additional requests will be estimated and approved, especially when they arrive after a design has been signed off.</p><h2 className="wp-block-heading">Make review and handover part of the scope</h2><p className="wp-block-paragraph">Agree where work will be reviewed, who approves release and what documentation is needed afterward. A handover should identify the delivered work, unresolved items and the owner of ongoing maintenance. Keep passwords and access keys out of ordinary project briefs and enquiry forms.</p><Link className="text-arrow" to="/blog">Back to all articles</Link></div></section></article></main>
    </>
  )
}
