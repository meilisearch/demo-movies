import React from 'react'
import styled from 'styled-components'
import BaseToggle from 'components/Toggle'
import get from 'utils/get'
import Container from 'components/Container'
import BaseSearchbox from 'components/Searchbox'

const Toggle = styled(BaseToggle)`
  display: flex;
  order: 2;
  margin-bottom: 32px;
  @media (min-width: ${get('breakpoints.desktop')}) {
    order: 3;
    margin-bottom: 0;
  }
`

const Wrapper = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;

  @media (min-width: ${get('breakpoints.desktop')}) {
    height: 200px;
    align-items: center;
  }
`

const Searchbox = styled(BaseSearchbox)`
  display: flex;
  order: 3;
  @media (min-width: ${get('breakpoints.desktop')}) {
    order: 2;
    flex: 1;
    justify-content: center;
    margin: 0 48px;
  }
`

const Logo = styled.img`
  display: flex;
  order: 1;
`

const Header = () => (
  <Wrapper>
    <h1 style={{ margin: 0 }}>
      <Logo src="images/logo-light-mode.svg" alt="Where to Watch" />
    </h1>
    <Searchbox />
    <Toggle onChange={window.__setPreferredTheme} />
  </Wrapper>
)

export default Header
