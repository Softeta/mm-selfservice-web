import { AccountInfo } from '@azure/msal-browser'

export enum TenantType {
  NotAuthorized,
  Company,
  Candidate
}

export const getTenantType = (account: AccountInfo[]): TenantType => {
  const claims = account[0].idTokenClaims as any
  const roles: string[] = claims.roles ?? []

  //return roles.some((userRole) => allowedRoles.includes(userRole));
  return TenantType.NotAuthorized
}

export default getTenantType
