import type { MovieCardProps } from '~/types'
import { TwicImg } from '@twicpics/components/react'
import { getTwicpicsUrl } from '~/utils'
import { MOVIE_POSTER_ASPECT_RATIO } from '~/lib/constants'
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
        // <div key={movie.id} className="w-40 rounded-lg overflow-hidden">
        //   <TwicImg
        //     mode="contain"
        //     src={getTwicpicsUrl('tmdb', movie.poster_path)}
        //     ratio={MOVIE_POSTER_ASPECT_RATIO}
        //   />
        // </div>
      ))}
    </div>
  )
}
