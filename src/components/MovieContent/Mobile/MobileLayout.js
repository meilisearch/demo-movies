import React from 'react'
import styled from 'styled-components'
import { Tab, TabList, TabPanel } from 'components/Tab'
import { useTabState } from 'reakit/Tab'
import Typography from 'components/Typography'
import Providers from '../Providers'
import MobileMovieInfos from './MobileMovieInfos'
import Cast from '../Cast'
import BackdropImage from '../BackdropImage'
import Poster from 'components/Poster'
import { useTranslation } from 'next-i18next'

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const StyledTabList = styled(TabList)`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-top: 50px;
`

const Head = ({ tab, movie }) => {
  const { t } = useTranslation('common')
  const { backdrop_path, poster_path } = movie
  return (
    <BackdropImage $image={`https://image.tmdb.org/t/p/w780/${backdrop_path}`}>
      <Poster
        src={poster_path}
        alt={movie.title}
        style={{ height: 360, flexShrink: 0, marginTop: 120 }}
      />
      <StyledTabList {...tab} aria-label="movie tabs">
        <Tab {...tab} id="overview">
          <Typography variant="typo1">{t('overview')}</Typography>
        </Tab>
        <Tab {...tab} id="whereTowatch">
          <Typography variant="typo1">{t('whereToWatch')}</Typography>
        </Tab>
      </StyledTabList>
    </BackdropImage>
  )
}

const Content = styled.div`
  flex: 1;
  background-color: var(--movie-content-bg-color-mobile);
`

const CastWrapper = styled.div`
  padding: 48px 32px;
`

const CastTitle = styled(Typography)`
  color: var(--cast-section-title-mobile);
  text-transform: uppercase;
`

const CastSection = ({ cast }) => {
  const { t } = useTranslation('common')

  return (
    <CastWrapper>
      <CastTitle variant="typo1">{t('cast')}</CastTitle>
      <Cast style={{ marginTop: 16 }} cast={cast} />
    </CastWrapper>
  )
}

const MobileLayout = ({ hit }) => {
  const tab = useTabState()
  const { cast = [], providers = {} } = hit
  return (
    <Wrapper>
      <Head tab={tab} movie={hit} />
      <Content>
        <TabPanel {...tab}>
          <MobileMovieInfos movie={hit} />
          <CastSection cast={cast} />
        </TabPanel>
        <TabPanel {...tab}>
          <Providers providers={providers} />
        </TabPanel>
      </Content>
    </Wrapper>
  )
}

export default MobileLayout
