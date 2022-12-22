import { CircularProgress } from '@mui/material'
import { useCandidate } from 'API/Calls/candidates'
import { updateCandidateVideos } from 'API/Calls/candidateVideo'
import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'
import { TFile } from 'Components/Molecules/FileUpload/types'
import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { CandidateVideo } from 'Components/Organisms/CandidateVideo'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'Store/Slices/rootReducer'

export const VideoPage = () => {
  const candidateId = useSelector<RootState, string>(
    (state) => state.candidateProfile.candidate!.id!
  )
  const {
    data: candidateData,
    isLoading: isCandidateLoading,
    refetch
  } = useCandidate(candidateId)
  const candidate = candidateData?.data

  const navigate = useNavigate()
  const { t } = useTranslation()
  const [video, setVideo] = useState(candidate?.video)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setVideo(candidate?.video)
  }, [candidate])

  const uploadVideo = async (video?: TFile, cacheId?: string) => {
    setIsLoading(true)
    setVideo(video)

    await updateCandidateVideos(candidateId, {
      hasChanged: true,
      cacheId
    })

    await refetch()

    setIsLoading(false)
  }

  const deleteVideo = () => {
    uploadVideo()
  }

  return (
    <ProfilePageContainer>
      <div className="grid w-full pt-16">
        {isCandidateLoading && <CircularProgress />}
        {!isCandidateLoading && (
          <div className="grid gap-4">
            <h1 className="text-center text-lg">
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
                <p>{t('candidate.profile.aboutYou.video.none')}</p>
              </div>
            )}
            {isLoading && (
              <div className="grid items-center justify-items-center">
                <CircularProgress />
              </div>
            )}
            <div className="bottom-0 w-full">
              <CandidateVideo
                selectedFile={candidate?.video as TFile}
                onChange={uploadVideo}
                onDelete={deleteVideo}
                setIsVideoLoading={setIsLoading}
                backgroundClassName="transparent"
                showBottomControls={false}
              />
            </div>
            <PrevNextMenu
              onBackBtnClick={() => navigate('/myprofile/profile/about-you')}
              onSubmitBtnClick={() => navigate('/myprofile/profile/about-you')}
              continueButtonLabel={t('candidate.settings.save')}
            />
          </div>
        )}
      </div>
    </ProfilePageContainer>
  )
}
