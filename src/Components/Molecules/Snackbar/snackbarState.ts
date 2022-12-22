import { AlertColor } from '@mui/material'
import { atom } from 'recoil'

export const snackbarState = atom<{
  open: boolean
  severity: AlertColor
  message: string
}>({
  key: 'snackbarState',
  default: {
    open: false,
    message: '',
    severity: 'success'
  }
})

export default snackbarState
