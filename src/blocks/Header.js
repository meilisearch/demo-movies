import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import Toggle from 'components/Toggle'
import get from 'utils/get'
import Container from 'components/Container'
import Typography from 'components/Typography'
import BaseSearchbox from 'components/Searchbox'

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
`

const Logos = styled.div`
  order: 1;
`

const ByMeiliSearch = styled.a`
  display: flex;
  align-items: center;
  margin-left: 8px;
  color: var(--gray-300);
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  order: 2;
  margin-bottom: 32px;
  @media (min-width: ${get('breakpoints.desktop')}) {
    order: 3;
    margin-bottom: 0;
  }
`

const Github = styled.a`
  color: var(--gray-300);
  margin-left: 21px;
  display: flex;
  align-items: center;
`

const Header = () => (
  <Wrapper>
    <Logos>
      <h1 style={{ margin: 0 }}>
        <Logo src="images/logo-light-mode.svg" alt="Where to Watch" />
      </h1>
      <ByMeiliSearch href="https://www.meilisearch.com/" target="_blank">
        <Typography style={{ marginRight: 4 }}>by</Typography>
        <Image
          src="/images/meilisearch.svg"
          alt="MeiliSearch logo"
          layout="fixed"
          width={120}
          height={19}
        />
      </ByMeiliSearch>
    </Logos>
    <Searchbox />
    <RightSection>
      <Toggle onChange={window.__setPreferredTheme} />
      <Github
        href="https://github.com/meilisearch/MeiliSearch"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src="/images/github.svg"
          alt="Github logo"
          layout="fixed"
          width={16}
          height={16}
        />
        <Typography variant="subtitle" style={{ marginLeft: 6 }}>
          Github
        </Typography>
      </Github>
    </RightSection>
  </Wrapper>
)

export default Header
