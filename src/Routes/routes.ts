export const routes = {
  company: {
    root: '/findtalent',
    login: '/findtalent/login',
    signup: '/findtalent/signup',
    profile: '/findtalent/profile',
    contacts: {
      base: '/findtalent/contacts',
      new: '/findtalent/contacts/new'
    },
    settings: '/findtalent/settings',
    jobs: {
      base: '/findtalent/jobs',
      create: {
        base: `/findtalent/jobs/create`,
        suffixes: {
          step3: '/step-3',
          step4: '/step-4',
          step5: '/step-5',
          step6Freelance: '/step-6/freelance',
          step6Permanent: '/step-6/permanent',
          step6FreelanceAndPermanent: '/step-6/freelance-and-permanent',
          step7: '/step-7'
        },
        step3: (jobId: string) => `/findtalent/jobs/create/${jobId}/step-3`,
        step4: (jobId: string) => `/findtalent/jobs/create/${jobId}/step-4`,
        step5: (jobId: string) => `/findtalent/jobs/create/${jobId}/step-5`,
        step6Freelance: (jobId: string) =>
          `/findtalent/jobs/create/${jobId}/step-6/freelance`,
        step6Permanent: (jobId: string) =>
          `/findtalent/jobs/create/${jobId}/step-6/permanent`,
        step6FreelanceAndPermanent: (jobId: string) =>
          `/findtalent/jobs/create/${jobId}/step-6/freelance-and-permanent`,
        step7: (jobId: string) => `/findtalent/jobs/create/${jobId}/step-7`
      },
      active: '/findtalent/jobs/active',
      pending: '/findtalent/jobs/pending'
    },
    registration: {
      step1: '/findtalent/registration/step1',
      step2: '/findtalent/registration/step2'
    },
    shortlist: {
      base: '/findtalent/presentation/shortlist'
    },
    verification:
      '/findtalent/:companyId/:userId/verification/:verificationKey',
    confirmation: '/findtalent/confirmation-email'
  }
}
