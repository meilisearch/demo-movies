import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  grid-column: 1 / 3;
`

const ProviderList = ({ providers }) => (
  <>
    {providers?.map(provider => (
      <div key={provider.name}>{provider.name}</div>
    ))}
  </>
)

const WhereToWatch = ({ providers, ...props }) => {
  const { buy = [], rent = [], flatrate = [] } = providers
  return (
    <Wrapper {...props}>
      {buy && <ProviderList providers={buy} />}
      {rent && <ProviderList providers={rent} />}
      {flatrate && <ProviderList providers={flatrate} />}
    </Wrapper>
  )
}

export default WhereToWatch
