import React from 'react'
import styled from 'styled-components'
import { Stats } from 'react-instantsearch'
import { useTranslation } from 'next-i18next'
import Typography from '~/components/Typography'

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

const ProcessingTime = styled(Typography)`
  margin-left: 15px;
  color: var(--gray-400);
  font-style: italic;
`

const Infos = ({ title }) => {
  const { t } = useTranslation('common')

  return (
    <div className="flex items-baseline space-x-4 mb-6">
      <Typography variant="h3" className="text-[var(--h3)]">
        {title}
      </Typography>
      <Stats
        translations={{
          stats(nbHits, processingTimeMS) {
            return (
              <div style={{ display: 'flex' }}>
                <NbResults variant="typo1">
                  {`${nbHits.toLocaleString()}`}
                </NbResults>
                <ResultsText variant="typo1">{t('results')}</ResultsText>
                <ProcessingTime variant="typo4">
                  {t('processingTime', {
                    processingTime: processingTimeMS.toLocaleString(),
                  })}
                </ProcessingTime>
              </div>
            )
          },
        }}
      />
    </div>
  )
}

export default Infos
