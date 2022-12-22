import { CircularProgress } from '@mui/material'
import { TErrorResponse } from 'API/Types/errorResponse'
import { Notification } from '../Notification'

export interface IProps {
  error: TErrorResponse
  isLoading: boolean
  isError: boolean
}

const StatusBoxComponent = ({ error, isLoading, isError }: IProps) => {
  return (
    <>
      {(isError || isLoading) && (
        <div className="h-20">
          {isError && (
            <Notification type={'error'}>
              {error.response.data.Title ?? error.message}
            </Notification>
          )}
          {isLoading && <CircularProgress />}
        </div>
      )}
    </>
  )
}

export const StatusBox = StatusBoxComponent
