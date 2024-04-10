import React, { useContext } from 'react'
import styled from 'styled-components'
import Providers from '../Providers'
import DesktopMovieInfos from './DesktopMovieInfos'
import Cast from '../Cast'
import Recommended from '../Recommended'
import Typography from 'components/Typography'
import { useTranslation } from 'next-i18next'
import { CurrentMovieContext } from 'context/CurrentMovieContext'

const Wrapper = styled.div`
  grid-template-columns: repeat(12, 1fr);
  display: grid;
`

const RightSection = styled.div`
  grid-column: 3 / -1;
  padding-bottom: 70px;
`

const StyledProviders = styled(Providers)`
  background-color: var(--providers-bg-color);
`

const CastWrapper = styled.section`
  padding: 56px 50px 0;
`

const CastTitle = styled(Typography)`
  color: var(--cast-section-title-desktop);
  text-transform: uppercase;
  margin: 0;
`

const RecommendedWrapper = styled.section`
  padding: 56px 50px 0;
`

const RecommendedTitle = styled(Typography)`
  color: var(--cast-section-title-desktop);
  text-transform: uppercase;
  margin: 0;
`

const CastSection = ({ cast }) => {
  const { t } = useTranslation('common')

  return (
    <CastWrapper>
      <CastTitle as="h2" variant="typo3">
        {t('cast')}
      </CastTitle>
      <Cast cast={cast} />
    </CastWrapper>
  )
}

const RecommendedSection = ({ id }) => {
  const { t } = useTranslation('common')
  const { searchQuery } = useContext(CurrentMovieContext)

  return (
    <RecommendedWrapper>
      <RecommendedTitle as="h2" variant="typo3">
        {t('related movies')}
      </RecommendedTitle>
      <Recommended id={id} limit={200} />
      {searchQuery && (
        <>
          <RecommendedTitle as="h2" variant="typo3">
            {t('movies related to your search: ' + searchQuery)}
          </RecommendedTitle>
          <Recommended
            id={id}
            prompt={'User looked for ' + searchQuery}
            limit={200}
          />
        </>
      )}
      <RecommendedTitle as="h2" variant="typo3">
        {t('Movies you might like based on your favorites')}
      </RecommendedTitle>
      <Recommended
        id={id}
        prompt={'User likes cars and planes. Loves racing.'}
        limit={600}
      />
    </RecommendedWrapper>
  )
}

const DesktopLayout = ({ hit }) => {
  const { cast = [], providers = {}, ...movie } = hit
  return (
    <Wrapper>
      <StyledProviders providers={providers} />
      <RightSection>
        <DesktopMovieInfos movie={movie} />
        <CastSection cast={cast} />
        <RecommendedSection id={movie.id} />
      </RightSection>
    </Wrapper>
  )
}

export default DesktopLayout
