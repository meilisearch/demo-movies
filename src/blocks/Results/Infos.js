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
  margin-right: ${get('spacing.4')};
  color: var(--h3);
`

const Wrapper = styled.div`
  @media (min-width: ${get('breakpoints.desktop')}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`
const DisplayAllButton = styled.button`
  display: none;
  @media (min-width: ${get('breakpoints.desktop')}) {
    display: inline-flex;
  }
`

const Infos = ({ title }) => {
  const { t } = useTranslation('common')

  return (
    <Wrapper>
      <div>
        <H3 variant="h3">{title}</H3>
        <NbResults variant="nbResults">
          <Stats
            translations={{
              stats(nbHits) {
                return `${nbHits.toLocaleString()}`
              },
            }}
          />
        </NbResults>
        <ResultsText variant="nbResults">{t('results')}</ResultsText>
      </div>
      <DisplayAllButton>Display all</DisplayAllButton>
    </Wrapper>
  )
}

export default Infos
