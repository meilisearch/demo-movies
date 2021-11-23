import React from 'react'
import styled from 'styled-components'
import { Tab, TabList, TabPanel } from 'components/Tab'
import { useTabState } from 'reakit/Tab'
import Typography from 'components/Typography'
import Providers from './Providers'
import MovieInfos from './MovieInfos'
import Cast from './Cast'

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const HeadWrapper = styled.div`
  height: 476px;
`

const Head = ({ tab }) => (
  <HeadWrapper>
    <TabList {...tab} aria-label="movie tabs">
      <Tab {...tab} id="overview">
        <Typography variant="typo1">Overview</Typography>
      </Tab>
      <Tab {...tab} id="whereTowatch">
        <Typography variant="typo1">Where to Watch</Typography>
      </Tab>
    </TabList>
  </HeadWrapper>
)

const Content = styled.div`
  flex: 1;
  background-color: var(--movie-content-bg-color-mobile);
`

const MobileLayout = ({ hit }) => {
  const tab = useTabState()
  const { cast, providers, ...movie } = hit

  return (
    <Wrapper>
      <Head tab={tab} />
      <Content>
        <TabPanel {...tab}>
          <MovieInfos movie={movie} />
          <Cast cast={cast} />
        </TabPanel>
        <TabPanel {...tab}>
          <Providers providers={providers} />
        </TabPanel>
      </Content>
    </Wrapper>
  )
}

export default MobileLayout
