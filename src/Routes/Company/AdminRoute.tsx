import ContactPersonRole from 'API/Types/Enums/contactPersonRole'
import { useSelfRole } from 'Hooks/useSelfRole'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type TProps = {
  children: JSX.Element
  rollBackUrl: string
}

const AdminRoute = ({ children, rollBackUrl }: TProps) => {
  const navigate = useNavigate()
  const role = useSelfRole()

  useEffect(() => {
    if (role !== ContactPersonRole.Admin) {
      navigate(rollBackUrl)
    }
  }, [role, navigate, rollBackUrl])

  return <>{role === ContactPersonRole.Admin && children}</>
}

export default AdminRoute
