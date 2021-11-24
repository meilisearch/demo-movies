import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-top: 112px;
`

const Cast = ({ cast }) => {
  return (
    <Wrapper>
      {cast.map((people, index) => (
        <div key={index}>{people.character}</div>
      ))}
    </Wrapper>
  )
}

export default Cast
