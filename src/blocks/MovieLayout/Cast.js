import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div``

const Cast = ({ cast }) => {
  return (
    <Wrapper>
      {cast.map(people => (
        <div key={people.name}>{people.character}</div>
      ))}
    </Wrapper>
  )
}

export default Cast
