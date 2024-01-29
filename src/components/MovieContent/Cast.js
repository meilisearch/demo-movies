import React from 'react'
import styled from 'styled-components'
import People from 'components/People'
import get from 'utils/get'

const Peoples = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;

  @media (min-width: ${get('breakpoints.desktop')}) {
    margin-top: 22px;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 30px;
  }
`

const Cast = ({ cast, ...props }) => (
  <Peoples {...props}>
    {cast.map((people, index) => (
      <People
        key={`${people?.name}-${people?.character || index}`}
        people={people}
        data-cast={people?.name}
      />
    ))}
  </Peoples>
)

export default Cast
