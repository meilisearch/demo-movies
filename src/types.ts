export interface MovieData {
  id: number
  poster_path: string
  title: string
  release_date: string
  vote_average: number
  keywords: string[]
}

export interface MoviesQuery {
  status: 'loading' | 'success' | 'error'
  hits: MovieData[]
}
