import { TAddSkillResponse, TSkillsResponse } from 'API/Types/skills'
import { HttpClient } from 'Services/HttpClient'
import { useQuery } from 'react-query'

export enum SkillsQueryKeys {
  skills = 'skills',
  recommendedSkills = 'recommended-skills'
}

export const addSkill = async (skill: string): Promise<TAddSkillResponse> =>
  HttpClient.post('/api/v1/skills/', { code: skill })

const fetchSkills = async (search?: string): Promise<TSkillsResponse> => {
  const searchQuery = search ? `&search=${search}` : ''
  return HttpClient.get(`/api/v1/skills?pageSize=10${searchQuery}`)
}

const fetchRecommendedSkills = async (
  jobPosition: string
): Promise<TSkillsResponse> =>
  HttpClient.get(
    `/api/v1/skills/recommended?jobPosition=${jobPosition}&pageSize=10`
  )

export const useSkills = (search?: string) =>
  useQuery(`${SkillsQueryKeys.skills}.${search}`, () => fetchSkills(search), {
    enabled: false
  })

export const useRecommendedSkills = (jobPosition?: string) =>
  useQuery(
    [SkillsQueryKeys.recommendedSkills, jobPosition],
    () => fetchRecommendedSkills(jobPosition!),
    { enabled: !!jobPosition }
  )
