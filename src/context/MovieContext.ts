import { createContext, Dispatch, SetStateAction } from 'react'
import { MovieData as Movie } from '~/types'
import { DialogStateReturn } from 'reakit/Dialog'

export interface MovieContextProps {
  currentMovie: Movie | null
  setCurrentMovie: Dispatch<SetStateAction<Movie | null>>
  dialog: DialogStateReturn
}

export const movieContextDefaultValue: MovieContextProps = {
  currentMovie: null,
  setCurrentMovie: () => {},
  dialog: null as any, // We'll provide the actual dialog state from the provider
}

export const MovieContext = createContext<MovieContextProps>(
  movieContextDefaultValue
)

export const MovieContextProvider = MovieContext.Provider
