import React from 'react'
import styled from 'styled-components'
import Providers from '../Providers'
import DesktopMovieInfos from './DesktopMovieInfos'
import Cast from '../Cast'

const Wrapper = styled.div`
  grid-template-columns: repeat(12, 1fr);
  display: grid;
`

const RightSection = styled.div`
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
      <RightSection>
        <DesktopMovieInfos movie={movie} />
        <Cast cast={cast} />
      </RightSection>
    </Wrapper>
  )
}

export default DesktopLayout
