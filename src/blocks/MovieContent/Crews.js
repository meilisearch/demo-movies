import React from 'react'
import styled from 'styled-components'
import Typography from 'components/Typography'
import get from 'utils/get'

const CrewsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const CrewName = styled.div`
  font-weight: 700;
`

const Crew = styled.div`
  width: 50%;
  margin-top: 32px;
  @media (min-width: ${get('breakpoints.desktop')}) {
    padding-left: 8px;
  }
`

const Crews = ({ crew }) => (
  <CrewsWrapper>
    {crew.map((people, index) => (
      <Crew key={index}>
        <CrewName variant="h5">{people.name}</CrewName>
        <Typography variant="h5">{people.job}</Typography>
      </Crew>
    ))}
  </CrewsWrapper>
)

export default Crews
