import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TErrorResponse } from 'API/Types/errorResponse'
import { TShortlistCandidate } from 'API/Types/Jobs/shortlistGet'
import { TShortListState } from './Types/shortlistState'

export type TStateUpdate = {
  pending: boolean
  error?: TErrorResponse
}

const initialState: TShortListState = Object.freeze({})

export const shortlistSlice = createSlice({
  name: 'shortlist',
  initialState,
  reducers: {
    selectShortlistCandidate: (
      state,
      action: PayloadAction<TShortlistCandidate>
    ) => {
      state.selectedCandidate = action.payload
    }
  }
})

export default shortlistSlice.reducer

export const { selectShortlistCandidate } = shortlistSlice.actions
