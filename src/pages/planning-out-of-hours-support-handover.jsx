import { Link } from 'react-router-dom'
import { PageStyles } from '../components/PageStyles'
import css from '../pagecss/css_86d0b4d576.js'

export default function PagePlanningOutOfHoursSupportHandover() {
  return (
    <>
      <PageStyles css={css} />
      <main><article><section className="inner-hero compact-hero"><div className="container article-hero"><div className="breadcrumb"><Link to="/blog">Blog</Link><span>/</span><span>Support operations</span></div><span className="kicker">Support operations</span><h1>A clearer handover for out-of-hours support</h1><p>Give the next shift enough context to continue the work without making customers start again.</p><div className="article-meta">Support Facility editorial team</div></div></section><section className="section"><div className="container article-hero article-body sf-editor-content"><h2 className="wp-block-heading">Record the current state, not just the history</h2><p className="wp-block-paragraph">A long ticket thread does not necessarily show what the next person should do. Summarize the reported issue, the checks already completed, the current customer impact and the next agreed action. Keep observations separate from assumptions that still need investigation.</p><h2 className="wp-block-heading">Make escalation usable</h2><p className="wp-block-paragraph">Document which issues the incoming team can handle and which require another owner. An escalation should include a contact route, the circumstances for using it and the information the recipient needs. Review those details when staffing or service responsibilities change.</p><h2 className="wp-block-heading">Close the loop with the customer</h2><p className="wp-block-paragraph">Agree who sends the next update and when it is due. If the work is waiting on a customer, vendor or internal approval, say so in the handover. Clear ownership of the next communication helps prevent a technical investigation from becoming a silent queue.</p><Link className="text-arrow" to="/blog">Back to all articles</Link></div></section></article></main>
    </>
  )
}
