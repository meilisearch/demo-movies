import React, { useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { TwicImg } from '@twicpics/components/react'
import { useTabState } from 'reakit/Tab'
import { Tab, TabList, TabPanel } from 'components/Tab'
import Typography from 'components/Typography'
import Providers from '../Providers'
import MobileMovieInfos from './MobileMovieInfos'
import Cast from '../Cast'
import BackdropImage from '../BackdropImage'
import SectionHeading from './SectionHeading'
import SimilarMovies from '../SimilarMovies'
import { useSimilarMovies } from '~/hooks/useSimilarMovies'
import { getTwicpicsUrl } from '~/utils'
import { MOVIE_POSTER_ASPECT_RATIO } from '~/lib/constants'

const TAB_ID_OVERVIEW = 'overview'
const TAB_ID_PLATFORMS = 'whereTowatch'
const TAB_ID_SIMILAR = 'similar'

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
    <BackdropImage
      imageUrl={`https://image.tmdb.org/t/p/w780/${backdrop_path}`}
    >
      <TwicImg
        src={getTwicpicsUrl('tmdb', poster_path)}
        alt={movie.title}
        ratio={MOVIE_POSTER_ASPECT_RATIO}
        className="object-cover w-[240px] h-[360px] shrink-0 rounded-lg mt-32"
      />
      <StyledTabList {...tab} aria-label="movie tabs">
        <Tab {...tab} id={TAB_ID_OVERVIEW}>
          <Typography variant="typo1">{t('overview.heading')}</Typography>
        </Tab>
        <Tab {...tab} id={TAB_ID_PLATFORMS}>
          <Typography variant="typo1">{t('platforms.heading')}</Typography>
        </Tab>
        <Tab {...tab} id={TAB_ID_SIMILAR}>
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
  const tab = useTabState({ selectedId: TAB_ID_SIMILAR })
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
              <SimilarMovies movies={similarMoviesQuery.data} />
            )}
          </SectionLayout>
        </TabPanel>
      </Content>
    </div>
  )
}

export default MobileLayout
