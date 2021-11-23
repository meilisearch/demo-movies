import React from 'react'
import styled from 'styled-components'
import get from 'utils/get'

const Wrapper = styled.div`
  @media (min-width: ${get('breakpoints.desktop')}) {
    height: 600px;
  }
`

const MovieInfos = ({ movie }) => {
  return <Wrapper>{movie.title}</Wrapper>
}

export default MovieInfos
