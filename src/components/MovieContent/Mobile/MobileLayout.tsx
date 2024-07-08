import React, { useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { useTabState } from 'reakit/Tab'
import { Tab, TabList, TabPanel } from 'components/Tab'
import Typography from 'components/Typography'
import Providers from '../Providers'
import MobileMovieInfos from './MobileMovieInfos'
import Cast from '../Cast'
import BackdropImage from '../BackdropImage'
import Poster from 'components/Poster'
import SectionHeading from './SectionHeading'
import Recommendations from '../Recommendations'
import { useSimilarMovies } from '~/hooks/useSimilarMovies'

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
          <Typography variant="typo1">{t('overview.heading')}</Typography>
        </Tab>
        <Tab {...tab} id="whereTowatch">
          <Typography variant="typo1">{t('platforms.heading')}</Typography>
        </Tab>
        <Tab {...tab} id="similar">
          <Typography variant="typo1">{t('similar.mobileHeading')}</Typography>
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

const SectionLayout = ({
  children,
  heading,
  description,
}: {
  children: React.ReactNode
  heading: string
  description: string
}) => {
  return (
    <div className="px-6 py-8">
      <SectionHeading className="mb-4">{heading}</SectionHeading>
      <div className="mb-8">
        <Typography>{description}</Typography>
      </div>
      {children}
    </div>
  )
}

const MobileLayout = ({ hit }) => {
  const tab = useTabState()
  const movie = useMemo(() => hit, [hit])
  const similarMoviesQuery = useSimilarMovies(hit.id)
  const { t } = useTranslation('common')

  return (
    <div className="h-full flex flex-col">
      <Head tab={tab} movie={movie} />
      <Content>
        <TabPanel {...tab}>
          <MobileMovieInfos movie={hit} />
          <CastSection cast={movie.cast} />
        </TabPanel>
        <TabPanel {...tab}>
          <SectionLayout
            heading={t('platforms.heading')}
            description={t('platforms.mobileDescription', {
              title: movie.title,
            })}
          >
            <Providers providers={movie.providers} />
          </SectionLayout>
        </TabPanel>
        <TabPanel {...tab}>
          <SectionLayout
            heading={t('similar.heading')}
            description={t('similar.description', { title: movie.title })}
          >
            {similarMoviesQuery.status === 'loading' && (
              <Typography>Loading...</Typography>
            )}
            {similarMoviesQuery.status === 'error' && (
              <Typography>Error while loading similar movies.</Typography>
            )}
            {similarMoviesQuery.status === 'success' && (
              <Recommendations movies={similarMoviesQuery.data} />
            )}
          </SectionLayout>
        </TabPanel>
      </Content>
    </div>
  )
}

export default MobileLayout
