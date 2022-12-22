import { TCandidate } from "API/Types/Candidate/candidateGet";
import { TRecommendedJobsRequest } from "API/Types/recommendedJobs";

export const getRecommendedJobsRequest = (candidate: TCandidate): TRecommendedJobsRequest => {
  const workExperienceSkills = candidate.candidateWorkExperiences
    .filter(x => !x.skills)
    .map(x => x.skills!)
    .flat()
    .map(x => x.code)
  const candidateSkills = candidate.skills.map(x => x.code)
  const fullSkills = workExperienceSkills.concat(candidateSkills);

  return {
    position: candidate.currentPosition?.code,
    location: candidate.address?.location,
    skills: fullSkills,
    workTypes: candidate.workTypes,
    workingHourTypes: candidate.workingHourTypes,
    workingFormats: candidate.formats,
    industries: candidate.industries.map(x => x.code),
    languages: candidate.languages?.map(x => x.code)
  }
}
