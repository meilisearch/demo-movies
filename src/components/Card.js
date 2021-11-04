import React from 'react'
import styled from 'styled-components'
import Poster from 'components/Poster'
import Typography from 'components/Typography'
import Rating from 'components/Rating'
import get from 'utils/get'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 111px;
  @media (min-width: ${get('breakpoints.desktop')}) {
    width: 150px;
  }
`

const Title = styled(Typography)`
  color: var(--card-title);
`

const ReleaseYear = styled(Typography)`
  color: var(--gray-300);
  margin-right: ${get('spacing.4')};
`

const Info = styled.div`
  display: flex;
  align-items: center;
`

const Card = ({ poster_path, title, release_date, vote_average, ...props }) => {
  const releaseYear = new Date(release_date).getFullYear()
  return (
    <Wrapper {...props}>
      <Poster src={poster_path} alt={title} />
      <Title variant="cardTitle">{title}</Title>
      <Info>
        <ReleaseYear variant="subtitle">{releaseYear}</ReleaseYear>
        <Rating rating={vote_average} />
      </Info>
    </Wrapper>
  )
}

export default Card
