import clsx from 'clsx'
import React from 'react'
import Card from '~/components/Card'
import { MovieContext } from '~/context/MovieContext'
import type { MovieData } from '~/types'

interface SimilarMoviesProps {
  movies: MovieData[]
  className?: string
}

export default function SimilarMovies({
  movies,
  className,
}: SimilarMoviesProps) {
  const { setCurrentMovie } = React.useContext(MovieContext)
  return (
    <div className={clsx('', className)}>
      {movies.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 text-sm">No recommendations</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {movies.map(movie => (
            <button
              key={movie.id}
              onClick={() => setCurrentMovie(movie)}
              className="text-left flex"
            >
              <Card
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                release_date={movie.release_date}
                vote_average={movie.vote_average}
                className="w-32"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
