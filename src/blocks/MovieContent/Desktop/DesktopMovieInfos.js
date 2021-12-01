import React from 'react'
import styled from 'styled-components'
import Typography from 'components/Typography'
import Rating from 'components/Rating'
import Poster from 'components/Poster'
import Crews from '../Crews'
import Socials from '../Socials'
import BackdropImage from '../BackdropImage'
import Tags from '../Tags'

const Descriptions = styled.div`
  margin-left: 40px;
  width: 40%;
`

const KeyInfos = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
`

const Description = styled(Typography)`
  margin-top: 42px;
  display: inline-block;
  max-width: 400px;
`

const AdditionalInfos = styled.div`
  width: 25%;
  flex-shrink: 0;
  margin-left: 40px;
  margin-top: auto;
`

const Infos = styled.div`
  display: flex;
  flex-direction: row;
`

const DesktopMovieInfos = ({ movie }) => {
  const {
    title,
    vote_average,
    release_year,
    movie_duration,
    genres,
    external_ids,
    poster_path,
    crew,
  } = movie

  return (
    <BackdropImage
      $image={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
    >
      <Infos>
        <Poster
          src={poster_path}
          alt={movie.title}
          style={{ height: 360, flexShrink: 0 }}
        />
        <Descriptions>
          <Typography variant="h1" style={{ textTransform: 'uppercase' }}>
            {title}
          </Typography>
          <KeyInfos>
            <Rating rating={Math.round((vote_average / 2) * 10) / 10} />
            <Typography variant="h5" style={{ marginLeft: 20 }}>
              {release_year}
            </Typography>
            <Typography variant="h5" style={{ marginLeft: 26 }}>
              {movie_duration}
            </Typography>
          </KeyInfos>
          <Tags tags={genres} />
          <Description>{movie.overview}</Description>
        </Descriptions>
        <AdditionalInfos>
          <Socials socials={external_ids} />
          <Crews crew={crew} />
        </AdditionalInfos>
      </Infos>
    </BackdropImage>
  )
}

export default DesktopMovieInfos
