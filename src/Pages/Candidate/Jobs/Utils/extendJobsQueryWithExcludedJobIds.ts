export const extendQueryWithExcludedJobIds = (qs: string, appliedJobIds: string[]) => {
  if (appliedJobIds.length > 0) {
    return  qs.concat("&excludedJobIds=", appliedJobIds!.join(`&excludedJobIds=`))
  }
  return qs;
}
 