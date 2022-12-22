export const replaceLastRouteElement = (path: string, newRoute: string) => {
  const parts = path.split('/')
  const lastElement = parts[parts.length - 1]
  delete parts[parts.length - 1]
  if (lastElement.trim() === '') {
    delete parts[parts.length - 1]
  }

  const newPath = `${parts.join('/')}${newRoute}`
  return newPath
}