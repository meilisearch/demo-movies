import React from 'react'
import styled from 'styled-components'
import Providers from './Providers'
import MovieInfos from './MovieInfos'
import Cast from './Cast'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`

const Infos = styled.div`
  grid-column: 3 / -1;
`

const StyledProviders = styled(Providers)`
  background-color: var(--providers-bg-color);
`

const DesktopLayout = ({ hit }) => {
  const { cast = [], providers = {}, ...movie } = hit
  return (
    <Wrapper>
      <StyledProviders providers={providers} />
      <Infos>
        <MovieInfos movie={movie} />
        <Cast cast={cast} />
      </Infos>
    </Wrapper>
  )
}

export default DesktopLayout
