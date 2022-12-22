import { TCandidateResponse } from 'API/Types/Candidate/candidateGet'
import {
  TAddCandidateCourseRequest,
  TUpdateCandidateCourseRequest
} from 'API/Types/Candidate/Common/candidateCourse'
import { HttpClient } from 'Services/HttpClient'

export const createCourse = async (
  candidateId: string,
  data: TAddCandidateCourseRequest
): Promise<TCandidateResponse> =>
  HttpClient.post(`/api/v1/candidates/${candidateId}/courses`, data)

export const updateCourse = async (
  candidateId: string,
  courseId: string,
  data: TUpdateCandidateCourseRequest
): Promise<TCandidateResponse> =>
  HttpClient.put(`/api/v1/candidates/${candidateId}/courses/${courseId}`, data)

export const deleteCourse = async (
  candidateId: string,
  courseId: string
): Promise<TCandidateResponse> =>
  HttpClient.delete(`/api/v1/candidates/${candidateId}/courses/${courseId}`)
