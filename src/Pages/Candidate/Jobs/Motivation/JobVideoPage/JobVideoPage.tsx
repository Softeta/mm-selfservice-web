import { CircularProgress } from '@mui/material'
import {
  updateCandidateJobMotivation,
  useCandidateSelectedInJob
} from 'API/Calls/candidateJobs'
import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'
import { TFile } from 'Components/Molecules/FileUpload/types'
import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { CandidateJobMotivationVideo } from 'Components/Organisms/CandidateJobMotivationVideo'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactPlayer from 'react-player'
import { useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

export const JobVideoPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { jobId, candidateId } = useParams()

  const { data: candidateInJobResponse, isLoading: isCandidateJobsLoading } =
    useCandidateSelectedInJob(jobId!, candidateId!)
  const candidateInJob = candidateInJobResponse?.data
  const [video, setVideo] = useState(candidateInJob?.motivationVideo)
  const [isLoading, setIsLoading] = useState(false)
  const [fileSavedSuccessfully, setFileSuccessfullySaved] = useState<
    boolean | undefined
  >()

  const uploadVideo = async (video?: TFile, cacheId?: string) => {
    setVideo(video)
    setFileSuccessfullySaved(undefined)
    await updateCandidateJobMotivation(
      candidateId!,
      jobId!,
      {
        motivationVideo: { cacheId: cacheId, hasChanged: true },
        coverLetter: candidateInJob?.coverLetter
      },
      queryClient
    )
      .then(() => setFileSuccessfullySaved(true))
      .catch(() => {
        setFileSuccessfullySaved(false)
      })
  }

  return (
    <ProfilePageContainer>
      <div className="grid w-full pt-16">
        {isCandidateJobsLoading && <CircularProgress />}
        {!isCandidateJobsLoading && (
          <div className="grid gap-4 pt-16">
            <h1 className="text-center">
              {t('candidate.profile.aboutYou.video.header')}
            </h1>
            {video?.uri && (
              <div className="h-[30rem] w-full p-8">
                <ReactPlayer
                  url={video?.uri}
                  width="100%"
                  height="100%"
                  controls={true}
                />
              </div>
            )}
            {!video?.uri && (
              <div className="grid items-center justify-items-center">
                <p>{t('candidate.jobs.video.none')}</p>
              </div>
            )}
            {isLoading && (
              <div className="grid items-center justify-items-center">
                <CircularProgress />
              </div>
            )}
            <CandidateJobMotivationVideo
              selectedFile={video as TFile}
              onChange={uploadVideo}
              setIsVideoLoading={setIsLoading}
              fileSavedSuccessfully={fileSavedSuccessfully}
            />
            <PrevNextMenu
              onBackBtnClick={() => navigate('/myprofile')}
              onSubmitBtnClick={() => navigate('/myprofile')}
              continueButtonLabel={t('candidate.settings.save')}
            />
          </div>
        )}
      </div>
    </ProfilePageContainer>
  )
}
