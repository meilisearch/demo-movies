import type { MovieCardProps } from '~/types'
import clsx from 'clsx'
import Card from '~/components/Card'

interface RecommendationsProps {
  movies: MovieCardProps[]
  className?: string
}

export function Recommendations(props: RecommendationsProps) {
  return (
    <div className={clsx('flex flex-wrap gap-4', props.className)}>
      {props.movies.map(movie => (
        <Card key={movie.id} {...movie}></Card>
      ))}
    </div>
  )
}
