export * from './get'

export const getTwicpicsUrl = (provider: 'tmdb', url: string) => {
  return url.replace('https://image.tmdb.org/', '/tmdb/')
}

export const makeStringSafeForFilters = (value: string): string => {
  // Replace single quotes with escaped single quotes
  // and escape any other special characters that could cause issues
  return value.replace(/'/g, "\\'").replace(/"/g, '\\"')
}
