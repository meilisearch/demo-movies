import React from 'react'
import styled from 'styled-components'
import { Stats } from 'react-instantsearch-dom'
import { useTranslation } from 'next-i18next'
import get from 'utils/get'
import Typography from 'components/Typography'

const NbResults = styled(Typography)`
  display: inline-flex;
  text-transform: uppercase;
  color: var(--800-100);
`

const ResultsText = styled(Typography)`
  display: inline-flex;
  text-transform: uppercase;
  color: var(--gray-300);
  margin-left: 5px;
`

const H3 = styled(Typography)`
  margin-right: 16px;
  color: var(--h3);
`

const Wrapper = styled.div`
  @media (min-width: ${get('breakpoints.desktop')}) {
    display: flex;
    align-items: center;
  }
`

const Infos = ({ title }) => {
  const { t } = useTranslation('common')

  return (
    <Wrapper>
      <H3 variant="h3">{title}</H3>
      <NbResults variant="typo1">
        <Stats
          translations={{
            stats(nbHits) {
              return `${nbHits.toLocaleString()}`
            },
          }}
        />
      </NbResults>
      <ResultsText variant="typo1">{t('results')}</ResultsText>
    </Wrapper>
  )
}

export default Infos
