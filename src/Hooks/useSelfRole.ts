import ContactPersonRole from 'API/Types/Enums/contactPersonRole'
import { useSelector } from 'react-redux'
import { getCurrentAccount } from 'Services/AzureMsal'
import { RootState } from 'Store/Slices/rootReducer'

export const useSelfRole = (): ContactPersonRole => {
  const role = useSelector<RootState, ContactPersonRole | undefined>(
    (state) => state.contactPerson.contactPerson?.role
  )
  const account = getCurrentAccount()
  const isAdmin =
    account?.idTokenClaims?.extension_IsAdmin === true &&
    role === ContactPersonRole.Admin

  return isAdmin ? ContactPersonRole.Admin : ContactPersonRole.User
}
