// All pages and their shared CSS modules are imported statically so the router
// never renders a partially-loaded tree (header/footer with an empty main).
import PageAbout from '../pages/about.jsx'
import PageAiDecisionModelsTheNextStepInWebHostingAutomation from '../pages/ai-decision-models-the-next-step-in-web-hosting-automation.jsx'
import PageAuthorTony from '../pages/author__tony.jsx'
import PageBlog from '../pages/blog.jsx'
import PageCategoryBlog from '../pages/category__blog.jsx'
import PageCategoryCybersecurityPlanning from '../pages/category__cybersecurity-planning.jsx'
import PageCategorySupportOperations from '../pages/category__support-operations.jsx'
import PageCategoryWordpressAgencies from '../pages/category__wordpress-agencies.jsx'
import PageCloud from '../pages/cloud.jsx'
import PageContact from '../pages/contact.jsx'
import PageCybersecurity from '../pages/cybersecurity.jsx'
import PageCybersecurityAssessment from '../pages/cybersecurity__assessment.jsx'
import PageCybersecurityAssessmentApi from '../pages/cybersecurity__assessment__api.jsx'
import PageCybersecurityAssessmentCloud from '../pages/cybersecurity__assessment__cloud.jsx'
import PageCybersecurityAssessmentDatabase from '../pages/cybersecurity__assessment__database.jsx'
import PageCybersecurityAssessmentMobileApplication from '../pages/cybersecurity__assessment__mobile-application.jsx'
import PageCybersecurityAssessmentNetwork from '../pages/cybersecurity__assessment__network.jsx'
import PageCybersecurityAssessmentScadaIcs from '../pages/cybersecurity__assessment__scada-ics.jsx'
import PageCybersecurityAssessmentVapt from '../pages/cybersecurity__assessment__vapt.jsx'
import PageCybersecurityAssessmentWebApplication from '../pages/cybersecurity__assessment__web-application.jsx'
import PageCybersecurityCompliance from '../pages/cybersecurity__compliance.jsx'
import PageCybersecurityComplianceIso from '../pages/cybersecurity__compliance__iso.jsx'
import PageCybersecurityComplianceSoc2 from '../pages/cybersecurity__compliance__soc-2.jsx'
import PageCybersecurityComplianceThirdPartyRisk from '../pages/cybersecurity__compliance__third-party-risk.jsx'
import PageCybersecurityIncidentResponse from '../pages/cybersecurity__incident-response.jsx'
import PageCybersecurityIncidentResponseDetectionInvestigation from '../pages/cybersecurity__incident-response__detection-investigation.jsx'
import PageCybersecurityIncidentResponseMalwareAnalysis from '../pages/cybersecurity__incident-response__malware-analysis.jsx'
import PageCybersecurityIncidentResponsePostIncident from '../pages/cybersecurity__incident-response__post-incident.jsx'
import PageCybersecuritySecurityOperations from '../pages/cybersecurity__security-operations.jsx'
import PageCybersecuritySecurityOperationsSiem from '../pages/cybersecurity__security-operations__siem.jsx'
import PageCybersecuritySecurityOperationsThreatIntelligence from '../pages/cybersecurity__security-operations__threat-intelligence.jsx'
import PageCybersecuritySecurityOperationsThreatMonitoring from '../pages/cybersecurity__security-operations__threat-monitoring.jsx'
import PageFreeTrial from '../pages/free-trial.jsx'
import PageHome from '../pages/home.jsx'
import PagePlanningOutOfHoursSupportHandover from '../pages/planning-out-of-hours-support-handover.jsx'
import PagePlanningWhiteLabelWordpressDelivery from '../pages/planning-white-label-wordpress-delivery.jsx'
import PagePlans from '../pages/plans.jsx'
import PagePrivacy from '../pages/privacy.jsx'
import PageResources from '../pages/resources.jsx'
import PageResourcesCloudMigrationReadiness from '../pages/resources__cloud-migration-readiness.jsx'
import PageResourcesHostingSupportEscalationMatrix from '../pages/resources__hosting-support-escalation-matrix.jsx'
import PageResourcesSaferThirdPartyTechnicalAccess from '../pages/resources__safer-third-party-technical-access.jsx'
import PageResourcesServerOperationsHandover from '../pages/resources__server-operations-handover.jsx'
import PageResourcesSharedSupportVsDedicatedTeam from '../pages/resources__shared-support-vs-dedicated-team.jsx'
import PageResourcesWhiteLabelDevelopmentQueue from '../pages/resources__white-label-development-queue.jsx'
import PageSecurity from '../pages/security.jsx'
import PageServerManagement from '../pages/server-management.jsx'
import PageSolutions from '../pages/solutions.jsx'
import PageSolutionsCloudExperts from '../pages/solutions__cloud-experts.jsx'
import PageSolutionsCloudExpertsAws from '../pages/solutions__cloud-experts__aws.jsx'
import PageSolutionsCloudExpertsAzure from '../pages/solutions__cloud-experts__azure.jsx'
import PageSolutionsCloudExpertsDevops from '../pages/solutions__cloud-experts__devops.jsx'
import PageSolutionsCloudExpertsKubernetes from '../pages/solutions__cloud-experts__kubernetes.jsx'
import PageSolutionsCloudExpertsLinux from '../pages/solutions__cloud-experts__linux.jsx'
import PageSolutionsCloudExpertsPython from '../pages/solutions__cloud-experts__python.jsx'
import PageSolutionsCloudExpertsSecurity from '../pages/solutions__cloud-experts__security.jsx'
import PageSolutionsCloudSolutions from '../pages/solutions__cloud-solutions.jsx'
import PageSolutionsDedicatedTeam from '../pages/solutions__dedicated-team.jsx'
import PageSolutionsDevops from '../pages/solutions__devops.jsx'
import PageSolutionsHelpDesk from '../pages/solutions__help-desk.jsx'
import PageSolutionsInfrastructureSolutions from '../pages/solutions__infrastructure-solutions.jsx'
import PageSolutionsKubernetesSolutions from '../pages/solutions__kubernetes-solutions.jsx'
import PageSolutionsTechnicalSupport from '../pages/solutions__technical-support.jsx'
import PageTerms from '../pages/terms.jsx'
import PageThankYou from '../pages/thank-you.jsx'
import PageWebsiteServices from '../pages/website-services.jsx'
import PageWritingACybersecurityAssessmentBrief from '../pages/writing-a-cybersecurity-assessment-brief.jsx'

const components = {
  PageAbout,
  PageAiDecisionModelsTheNextStepInWebHostingAutomation,
  PageAuthorTony,
  PageBlog,
  PageCategoryBlog,
  PageCategoryCybersecurityPlanning,
  PageCategorySupportOperations,
  PageCategoryWordpressAgencies,
  PageCloud,
  PageContact,
  PageCybersecurity,
  PageCybersecurityAssessment,
  PageCybersecurityAssessmentApi,
  PageCybersecurityAssessmentCloud,
  PageCybersecurityAssessmentDatabase,
  PageCybersecurityAssessmentMobileApplication,
  PageCybersecurityAssessmentNetwork,
  PageCybersecurityAssessmentScadaIcs,
  PageCybersecurityAssessmentVapt,
  PageCybersecurityAssessmentWebApplication,
  PageCybersecurityCompliance,
  PageCybersecurityComplianceIso,
  PageCybersecurityComplianceSoc2,
  PageCybersecurityComplianceThirdPartyRisk,
  PageCybersecurityIncidentResponse,
  PageCybersecurityIncidentResponseDetectionInvestigation,
  PageCybersecurityIncidentResponseMalwareAnalysis,
  PageCybersecurityIncidentResponsePostIncident,
  PageCybersecuritySecurityOperations,
  PageCybersecuritySecurityOperationsSiem,
  PageCybersecuritySecurityOperationsThreatIntelligence,
  PageCybersecuritySecurityOperationsThreatMonitoring,
  PageFreeTrial,
  PageHome,
  PagePlanningOutOfHoursSupportHandover,
  PagePlanningWhiteLabelWordpressDelivery,
  PagePlans,
  PagePrivacy,
  PageResources,
  PageResourcesCloudMigrationReadiness,
  PageResourcesHostingSupportEscalationMatrix,
  PageResourcesSaferThirdPartyTechnicalAccess,
  PageResourcesServerOperationsHandover,
  PageResourcesSharedSupportVsDedicatedTeam,
  PageResourcesWhiteLabelDevelopmentQueue,
  PageSecurity,
  PageServerManagement,
  PageSolutions,
  PageSolutionsCloudExperts,
  PageSolutionsCloudExpertsAws,
  PageSolutionsCloudExpertsAzure,
  PageSolutionsCloudExpertsDevops,
  PageSolutionsCloudExpertsKubernetes,
  PageSolutionsCloudExpertsLinux,
  PageSolutionsCloudExpertsPython,
  PageSolutionsCloudExpertsSecurity,
  PageSolutionsCloudSolutions,
  PageSolutionsDedicatedTeam,
  PageSolutionsDevops,
  PageSolutionsHelpDesk,
  PageSolutionsInfrastructureSolutions,
  PageSolutionsKubernetesSolutions,
  PageSolutionsTechnicalSupport,
  PageTerms,
  PageThankYou,
  PageWebsiteServices,
  PageWritingACybersecurityAssessmentBrief,
}

export { components }
