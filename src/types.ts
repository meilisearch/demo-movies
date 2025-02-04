export interface MovieData {
  id: number
  poster_path: string
  title: string
  release_date: string
  vote_average: number
  keywords: string[]
}

export type Query<T> = {
  status: 'loading' | 'success' | 'error'
  data: T
  error: Error | null
}
