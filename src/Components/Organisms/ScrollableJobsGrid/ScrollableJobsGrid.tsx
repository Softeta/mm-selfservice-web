import { usePagedJobs } from 'API/Calls/jobs'
import CenteredLoader from 'Components/Molecules/CenteredLoader'
import { JobsGrid } from 'Components/Molecules/JobsGrid'
import InfiniteScroll from 'react-infinite-scroll-component'

const id = 'PendingCandidatesParentDiv'

interface IProps {
  title: string
  queryString: string
  onOpenClick: (jobId: string) => void
}

export const ScrollableJobsGrid = ({
  queryString,
  title,
  onOpenClick
}: IProps) => {
  const jobs = usePagedJobs(queryString)

  const data = jobs?.data?.pages
    .map((page) => page.data)
    .map((row) => row.data)
    .flat()

  return (
    <div id={id} className="flex overflow-auto flex-col pl-4 h-screen">
      <div className="pb-10 my-10 mx-auto">
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          next={() => jobs.fetchNextPage()}
          hasMore={!!jobs.hasNextPage}
          dataLength={jobs.data?.pages[0].data?.count || 0}
          loader={<CenteredLoader />}
          scrollableTarget={id}
        >
          <JobsGrid
            className="mb-10"
            title={title}
            jobs={data}
            onOpenClick={onOpenClick}
          />
        </InfiniteScroll>
      </div>
    </div>
  )
}
