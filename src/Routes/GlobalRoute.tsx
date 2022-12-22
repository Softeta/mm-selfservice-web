import { landingWebsiteUrl } from 'Variables/environmentVariables'

const GlobalRoute = ({ children }: { children: JSX.Element }) => {
  if (location.pathname === '/') {
    location.href = landingWebsiteUrl
  }

  return children
}

export default GlobalRoute
