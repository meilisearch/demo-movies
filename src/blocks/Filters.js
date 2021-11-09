import React from 'react'
import styled from 'styled-components'
import get from 'utils/get'
import Typography from 'components/Typography'
import Container from 'components/Container'
import { useTranslation } from 'next-i18next'

const Trending = styled(Typography)`
  display: none;
  @media (min-width: ${get('breakpoints.desktop')}) {
    display: inline-flex;
    margin-right: 20px;
  }
`

const Wrapper = styled(Container)`
  display: flex;
  align-items: center;
  height: 41px;
  color: var(--filter-text);
  margin-top: ${get('spacing[2.5]')};
  @media (min-width: ${get('breakpoints.desktop')}) {
    padding: 0 80px;
    height: 140px;
  }
`

const Filters = () => {
  const { t } = useTranslation('common')
  return (
    <Wrapper>
      <Trending variant="h2">{t('whatsTrending')}</Trending>
    </Wrapper>
  )
}

export default Filters
