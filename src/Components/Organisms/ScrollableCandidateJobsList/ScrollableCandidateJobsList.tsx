import CenteredLoader from 'Components/Molecules/CenteredLoader'
import { JobsList } from 'Components/Molecules/JobsList'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import { appliedJobsToJobCards } from 'Pages/Candidate/Jobs/helpers'
import { usePagedCandidateApplieddInJobs } from 'API/Calls/candidateAppliedToJobs'

interface IProps {
  queryString?: string
  title: string
  onNavigateBack?: () => void
}

export const ScrollableCandidateJobsList = ({
  queryString,
  title,
  onNavigateBack
}: IProps) => {
  const candidateId = useSelector<RootState, string>(
    (state) => state.candidateProfile.candidate!.id!
  )

  const jobs = usePagedCandidateApplieddInJobs(candidateId, queryString)

  const data = jobs?.data?.pages
    .map((page) => page.data)
    .map((row) => row.data)
    .flat()

  return (
    <InfiniteScroll
      style={{ overflow: 'hidden' }}
      next={() => jobs.fetchNextPage()}
      hasMore={!!jobs.hasNextPage}
      dataLength={data?.length || 0}
      loader={<CenteredLoader />}
    >
      <JobsList
        title={title}
        jobs={appliedJobsToJobCards(data)}
        isLoading={jobs.isLoading}
        onNavigateBack={onNavigateBack}
        onSearchInput={() => {
          return /* TODO: implement search bar */
        }}
      />
    </InfiniteScroll>
  )
}
