import { createContext, Dispatch, SetStateAction } from 'react'
import { MovieData as Movie } from '~/types'

export interface MovieContextProps {
  currentMovie: Movie | null
  setCurrentMovie: Dispatch<SetStateAction<Movie | null>>
}

export const movieContextDefaultValue: MovieContextProps = {
  currentMovie: null,
  setCurrentMovie: () => {},
}

export const MovieContext = createContext<MovieContextProps>(
  movieContextDefaultValue
)

export const MovieContextProvider = MovieContext.Provider
