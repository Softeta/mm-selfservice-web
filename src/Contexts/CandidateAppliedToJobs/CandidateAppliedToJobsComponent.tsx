import { CircularProgress } from "@mui/material";
import { FunctionComponent, memo, ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCandidateAppliedJobIds } from "Store/Slices/CandidateProfile/candidateProfileReducer";

type TProps = {
  candidateAppliedToJobIds?: string[],
  children: ReactNode[]
}

const CandidateAppliedToJobsComponent: FunctionComponent<TProps> = (props) => {
  const { candidateAppliedToJobIds, children } = props
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getCandidateAppliedJobIds())
  }, [])

  if (candidateAppliedToJobIds === undefined) {
    return <CircularProgress />
  }

  return <>{children}</>
}

export default CandidateAppliedToJobsComponent