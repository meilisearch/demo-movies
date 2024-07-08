export * from './get'

export const getTwicpicsUrl = (provider: 'tmdb', url: string) => {
  return url.replace('https://image.tmdb.org/', '/tmdb/')
}
