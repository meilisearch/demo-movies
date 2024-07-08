import React from 'react'
import styled from 'styled-components'
import { TwicImg } from '@twicpics/components/react'
import { getTwicpicsUrl } from '~/utils'
import { MOVIE_POSTER_ASPECT_RATIO } from '~/lib/constants'
import Typography from 'components/Typography'
import Rating from 'components/Rating'
import { MovieData } from '~/types'
import clsx from 'clsx'

type CardProps = MovieData & {
  className?: string
  imageClassName?: string
}

const Title = styled(Typography)`
  color: var(--800-100);
`

const ReleaseYear = styled(Typography)`
  color: var(--gray-300);
`

const Card = ({
  poster_path = '',
  title = '',
  release_date = '',
  vote_average,
  ...props
}: CardProps) => {
  const releaseYear = new Date(release_date).getFullYear()
  return (
    <div className={clsx('flex flex-col', props.className)}>
      <div
        className={clsx(
          'rounded-lg overflow-hidden mb-2',
          props.imageClassName
        )}
      >
        <TwicImg
          src={getTwicpicsUrl('tmdb', poster_path)}
          ratio={MOVIE_POSTER_ASPECT_RATIO}
          className="w-full h-full object-cover"
        />
      </div>
      <Title variant="cardTitle" className="text-wrap">
        {title}
      </Title>
      <div className="flex items-center flex-wrap space-x-4">
        <ReleaseYear variant="subtitle">{releaseYear}</ReleaseYear>
        <Rating rating={Math.round((vote_average / 2) * 10) / 10} />
      </div>
    </div>
  )
}

export default Card
