import React from 'react'
import styled from 'styled-components'
import { Hits as ISHits } from 'react-instantsearch-dom'
import { useTranslation } from 'next-i18next'
import get from 'utils/get'
import Container from 'components/Container'
import Infos from './Infos'
import Hit from './Hit'

const Hits = styled(ISHits)`
  ul {
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 11px;
    @media (min-width: ${get('breakpoints.desktop')}) {
      grid-template-columns: repeat(8, 1fr);
      grid-gap: 20px;
    }
  }
  li {
    list-style-type: none;
  }
`

const Wrapper = styled(Container)`
  background-color: var(--results-bg);
  transition: background-color 300ms;
  box-shadow: 0px 0px 64px rgba(0, 0, 0, 0.06);
  margin: ${get('spacing.4')} -${get('spacing[2.5]')} 0;
  padding: 18px ${get('spacing[2.5]')};
  @media (min-width: ${get('breakpoints.desktop')}) {
    border-radius: 12px;
    padding: 40px 80px;
    margin: 0 auto;
  }
`

const Movies = styled.div``

const Results = () => {
  const { t } = useTranslation('common')

  return (
    <Wrapper>
      <Movies>
        <Infos title={t('movies')} />
        <Hits hitComponent={Hit} />
      </Movies>
    </Wrapper>
  )
}

export default Results
