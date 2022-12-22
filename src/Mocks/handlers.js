import { rest } from 'msw'

export const handlers = [
  rest.get(
    import.meta.env.VITE_FRONTOFFICE_API + '/api/v1/candidates/self',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          activityStatus: null,
          address: null,
          bio: null,
          birthDate: null,
          candidateCourses: [],
          candidateEducations: [],
          candidateWorkExperiences: [],
          currency: null,
          currentPosition: null,
          curriculumVitae: null,
          desiredSkills: [],
          email: 'marcin.skowronek@softeta.com',
          endDate: null,
          firstName: null,
          formats: [],
          freelance: null,
          fullName: null,
          hobbies: null,
          id: '804703be-ab48-4671-8d0a-1a79f8e00611',
          industries: [],
          isEmailVerified: true,
          isShortlisted: false,
          languages: [],
          lastName: null,
          linkedInUrl: null,
          marketingAcknowledgement: {
            agreed: true,
            modifiedAt: '2022-07-27T09:37:43.130965+00:00'
          },
          openForOpportunities: false,
          permanent: null,
          personalWebsiteUrl: null,
          phone: null,
          picture: null,
          skills: [],
          startDate: null,
          status: 'Registered',
          systemLanguage: null,
          termsAndConditions: {
            agreed: true,
            modifiedAt: '2022-07-27T09:37:43.1309647+00:00'
          },
          video: null,
          weeklyWorkHours: null,
          workTypes: [],
          workingHourTypes: [],
          yearsOfExperience: null
        })
      )
    }
  )
]
