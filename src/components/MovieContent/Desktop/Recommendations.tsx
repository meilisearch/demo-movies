import clsx from 'clsx'
import Card from '~/components/Card'
import type { MovieData } from '~/types'

interface RecommendationsProps {
  movies: MovieData[]
  className?: string
}

export default function Recommendations({
  movies,
  className,
}: RecommendationsProps) {
  return (
    <div className={clsx('', className)}>
      {movies.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 text-sm">No recommendations</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {movies.map(movie => (
            <Card
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              release_date={movie.release_date}
              vote_average={movie.vote_average}
              className="w-32"
            />
          ))}
        </div>
      )}
    </div>
  )
}
