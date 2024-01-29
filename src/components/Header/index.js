import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import Toggle from 'components/Toggle'
import get from 'utils/get'
import Container from 'components/Container'
import Typography from 'components/Typography'
import BaseSearchbox from 'components/Searchbox'
import DesktopCountrySwitcher from 'components/CountrySwitcher/DesktopCountrySwitcher'
import MobileSettings from './MobileSettings'
import GitHub from './GitHubButton'
import { MEILISEARCH_URL } from 'constants'

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
  margin-top: 20px;
  @media (min-width: ${get('breakpoints.desktop')}) {
    order: 2;
    flex: 1;
    justify-content: center;
    margin: 0 48px;
  }
`

const Logo = styled.img`
  display: flex;
  width: 180px;
  @media (min-width: ${get('breakpoints.desktop')}) {
    width: 250px;
  }
`

const Logos = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  order: 1;
  @media (min-width: ${get('breakpoints.desktop')}) {
    flex-direction: column;
    align-items: flex-start;
    flex: initial;
  }
`

const ByMeiliSearch = styled.a`
  display: none;
  @media (min-width: ${get('breakpoints.desktop')}) {
    display: flex;
    align-items: baseline;
    margin-left: 8px;
    color: var(--gray-300);
  }
`

const RightSection = styled.div`
  display: none;
  @media (min-width: ${get('breakpoints.desktop')}) {
    display: flex;
    align-items: center;
    order: 3;
    margin-bottom: 0;
  }
`

const GitHubButton = styled(GitHub)`
  margin-left: 21px;
`

const Header = () => (
  <Wrapper>
    <Logos>
      <h1 style={{ margin: 0 }}>
        <Logo src="images/logo-light-mode.svg" alt="Where to Watch" />
      </h1>
      <ByMeiliSearch href={MEILISEARCH_URL} target="_blank">
        <Typography style={{ marginRight: 4 }}>by</Typography>
        <Image
          src="/images/meilisearch.svg"
          alt="Meilisearch logo"
          layout="fixed"
          width={81}
          height={12}
        />
      </ByMeiliSearch>
      <MobileSettings />
    </Logos>
    <Searchbox />
    <RightSection data-cy="settings-desktop">
      <DesktopCountrySwitcher />
      <Toggle onChange={window.__setPreferredTheme} />
      <GitHubButton />
    </RightSection>
  </Wrapper>
)

export default Header
