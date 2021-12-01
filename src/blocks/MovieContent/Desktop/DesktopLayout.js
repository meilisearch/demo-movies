import React from 'react'
import styled from 'styled-components'
import Providers from '../Providers'
import DesktopMovieInfos from './DesktopMovieInfos'
import Cast from '../Cast'
import Typography from 'components/Typography'
import { useTranslation } from 'next-i18next'

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

const CastWrapper = styled.div`
  padding: 112px 50px 0;
`

const CastTitle = styled(Typography)`
  color: var(--cast-section-title-desktop);
  text-transform: uppercase;
`

const CastSection = ({ cast }) => {
  const { t } = useTranslation('common')

  return (
    <CastWrapper>
      <CastTitle variant="typo3">{t('cast')}</CastTitle>
      <Cast cast={cast} />
    </CastWrapper>
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
      </RightSection>
    </Wrapper>
  )
}

export default DesktopLayout
