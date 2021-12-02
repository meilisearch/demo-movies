import React from 'react'
import styled from 'styled-components'
import Typography from 'components/Typography'
import Rating from 'components/Rating'
import { useTranslation } from 'next-i18next'
import Crews from '../Crews'
import Socials from '../Socials'
import Tags from '../Tags'

const Description = styled(Typography)`
  margin-top: 10px;
  display: inline-block;
  max-width: 400px;
`

const Wrapper = styled.div`
  padding: 36px 28px;
`

const TitleAndDate = styled.div`
  display: flex;
  align-items: baseline;
  margin-top: 6px;
`

const TagsAndDuration = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  align-items: baseline;
`

const Synopsis = styled.div`
  margin-top: 40px;
`

const SynopsisTitle = styled(Typography)`
  color: var(--gray-400);
  text-transform: uppercase;
`

const MovieInfos = ({ movie }) => {
  const { t } = useTranslation('common')

  const {
    title,
    vote_average,
    release_year,
    movie_duration,
    genres,
    external_ids,
    crew,
  } = movie

  return (
    <Wrapper>
      <Rating
        rating={Math.round((vote_average / 2) * 10) / 10}
        withText
        size="big"
      />
      <TitleAndDate>
        <Typography variant="h1" style={{ textTransform: 'uppercase' }}>
          {title}
        </Typography>
        <Typography variant="typo4" style={{ marginLeft: 8 }}>
          {release_year}
        </Typography>
      </TitleAndDate>
      <TagsAndDuration>
        <Tags tags={genres} />
        <Typography variant="typo4" style={{ marginLeft: 26 }}>
          {movie_duration}
        </Typography>
      </TagsAndDuration>
      <Synopsis>
        <SynopsisTitle variant="typo1">{t('synopsis')}</SynopsisTitle>
        <Description>{movie.overview}</Description>
      </Synopsis>
      <div>
        <Socials socials={external_ids} />
        <Crews crew={crew} />
      </div>
    </Wrapper>
  )
}

export default MovieInfos
