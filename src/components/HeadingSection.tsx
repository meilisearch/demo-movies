import React, { useContext } from 'react'
import styled from 'styled-components'
import get from 'utils/get'
import Typography from 'components/Typography'
import Container from 'components/Container'
import { useTranslation } from 'next-i18next'
import Slider from './Slider'
import SemanticRatioContext from 'context/SemanticRatioContext'

const Wrapper = styled(Container)`
  display: none;
  align-items: center;
  justify-content: space-between;
  @media (min-width: ${get('breakpoints.desktop')}) {
    display: flex;
    padding: 0 80px;
    height: 140px;
  }
`

const Heading = styled(Typography)`
  color: var(--filter-text);
  margin-right: 20px;
`

const SliderWrapper = styled.div`
  width: 12rem;
`

const LabelWrapper = styled.div`
  text-align: right;
  margin-bottom: 0.5rem;
`

const HeadingSection = () => {
  const { t } = useTranslation('common')
  const { semanticRatio, setSemanticRatio } = useContext(SemanticRatioContext)

  return (
    <Wrapper>
      <Heading variant="h2">{t('home.heading')}</Heading>
      <SliderWrapper>
        <LabelWrapper>
          <Typography
            variant="default"
            as="label"
            style={{ color: 'var(--800-100)' }}
          >
            {semanticRatio * 100}% {t('home.semanticLabel')}
          </Typography>
        </LabelWrapper>
        <Slider
          min={0}
          max={1}
          step={0.1}
          defaultValue={semanticRatio}
          onChangeComplete={setSemanticRatio}
        />
      </SliderWrapper>
    </Wrapper>
  )
}

export default HeadingSection
