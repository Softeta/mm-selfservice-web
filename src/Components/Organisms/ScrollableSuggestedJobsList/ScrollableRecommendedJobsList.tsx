import { usePagedRecommendedJobs } from 'API/Calls/recommendedJobs'
import { TRecommendedJobsRequest } from 'API/Types/recommendedJobs'
import CenteredLoader from 'Components/Molecules/CenteredLoader'
import { JobsList } from 'Components/Molecules/JobsList'
import { jobsToJobCards } from 'Pages/Candidate/Jobs/helpers'
import InfiniteScroll from 'react-infinite-scroll-component'

interface IProps {
  queryString: string,
  candidateId: string,
  recommendedJobsRequest: TRecommendedJobsRequest
  title: string
  onNavigateBack?: () => void
}

export const ScrollableRecommendedJobsList = ({
  queryString,
  candidateId,
  recommendedJobsRequest,
  title,
  onNavigateBack
}: IProps) => {
  const jobs = usePagedRecommendedJobs(candidateId, recommendedJobsRequest, queryString)

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
        jobs={jobsToJobCards(data)}
        isLoading={jobs.isLoading}
        onNavigateBack={onNavigateBack}
        onSearchInput={() => {
          return /* TODO: implement search bar */
        }}
      />
    </InfiniteScroll>
  )
}
