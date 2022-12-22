import { TUpdateCandidateCourseRequest } from 'API/Types/Candidate/Common/candidateCourse'
import { TUpdateCandidateEducationRequest } from 'API/Types/Candidate/Common/candidateEducation'
import { TFileUpdateRequest } from 'API/Types/fileRequest'
import { TFileResponse } from 'API/Types/fileResponse'

export type TUpdateCandidateEducation = {
  id: string
  request: TUpdateCandidateEducationRequest
}

export type TUpdateCandidateCourse = {
  id: string
  request: TUpdateCandidateCourseRequest
}

export type TUpdateCandidatePicture = {
  picture: TFileResponse
  pictureCache: TFileUpdateRequest
}

export type TUpdateCandidateCurriculumVitae = {
  bio?: string
  curriculumVitae: TFileResponse
  curriculumVitaeCache: TFileUpdateRequest
}
