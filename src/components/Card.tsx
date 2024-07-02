import React from 'react'
import styled from 'styled-components'
import { TwicImg } from '@twicpics/components/react'
import { getTwicpicsUrl } from '~/utils'
import { MOVIE_POSTER_ASPECT_RATIO } from '~/lib/constants'
import Typography from 'components/Typography'
import Rating from 'components/Rating'
import type { MovieCardProps } from '~/types'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled(Typography)`
  color: var(--800-100);
`

const ReleaseYear = styled(Typography)`
  color: var(--gray-300);
  margin-right: 16px;
`

const Info = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

const Card = ({
  poster_path = '',
  title = '',
  release_date = '',
  vote_average = '',
  ...props
}: MovieCardProps) => {
  const releaseYear = new Date(release_date).getFullYear()
  return (
    <Wrapper {...props}>
      <div className="rounded-lg overflow-hidden">
        <TwicImg
          mode="contain"
          src={getTwicpicsUrl('tmdb', poster_path)}
          ratio={MOVIE_POSTER_ASPECT_RATIO}
        />
      </div>
      <Title variant="cardTitle">{title}</Title>
      <Info>
        <ReleaseYear variant="subtitle">{releaseYear}</ReleaseYear>
        <Rating rating={Math.round((vote_average / 2) * 10) / 10} />
      </Info>
    </Wrapper>
  )
}

export default Card
