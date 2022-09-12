import React from 'react'
import styled from 'styled-components'
import { useDialogState } from 'reakit/Dialog'
import {
  DialogDisclosure,
  DialogBackdrop,
  DialogContent,
} from 'components/Dialog'
import get from 'utils/get'
import { Cross, Settings as SettingsIcon } from 'components/icons'
import Typography from 'components/Typography'
import { useTranslation } from 'next-i18next'
import IconButton from 'components/IconButton'
import Toggle from 'components/Toggle'
import MobileCountrySwitcher from 'components/CountrySwitcher/MobileCountrySwitcher'
import Link from 'components/Link'
import GitHubButton from './GitHubButton'

const Container = styled.div`
  @media (min-width: ${get('breakpoints.desktop')}) {
    display: none;
  }
`

const Settings = styled(SettingsIcon)`
  margin-right: 12px;
`

const Backdrop = styled(DialogBackdrop)`
  display: flex;
  align-items: flex-end;
`

const Content = styled(DialogContent)`
  background-color: var(--settings-mobile-dialog-bg);
  border-top: 1px solid var(--gray-400);
  border-radius: 20px 20px 0px 0px;
  padding: 16px 32px 20px;
  height: auto;
  opacity: 1;
  transition: transform 300ms, background-color 300ms;
  transform-origin: top center;
  transform: translateY(100%);
  &[data-enter] {
    transform: translateY(0);
  }
`

const CloseButton = styled(IconButton)`
  position: absolute;
  right: 0;
  top: 10px;
`

const Title = styled(Typography)`
  display: block;
  text-align: center;
`

const Appearence = styled.div`
  margin-top: 78px;
  display: flex;
  justify-content: space-between;
`

const CountryPreference = styled.div``

const Section = styled.div`
  border-bottom: 1px solid var(--gray-500);
  padding-bottom: 24px;
  padding-top: 12px;
`

const PoweredBy = styled.div`
  color: var(--gray-300);
  margin-top: 68px;
`

const BottomSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Disclosure = styled(DialogDisclosure)`
  color: var(--gray-300);
  transition: color 300ms;
  &:hover,
  &:focus {
    color: var(--settings-button-hover);
  }
`

const MobileSettings = () => {
  const dialog = useDialogState({ animated: true })
  const { t } = useTranslation('common')

  return (
    <Container data-cy="settings-mobile">
      <Disclosure {...dialog}>
        <Settings width={20} />
      </Disclosure>
      <Backdrop {...dialog}>
        <Content {...dialog} aria-label="Settings">
          <div style={{ position: 'relative' }}>
            <Title variant="typo5">{t('settings')}</Title>
            <CloseButton onClick={dialog.hide}>
              <Cross width={18} />
            </CloseButton>
            <Section>
              <Appearence>
                <Typography variant="typo6">{t('appearance')}</Typography>
                <Toggle onChange={window.__setPreferredTheme} />
              </Appearence>
            </Section>
            <Section>
              <CountryPreference>
                <Typography
                  variant="typo6"
                  style={{ marginBottom: 16, display: 'block' }}
                >
                  {t('countryPreference')}
                </Typography>
                <MobileCountrySwitcher />
              </CountryPreference>
            </Section>
            <BottomSection>
              <PoweredBy>
                <Typography>{t('poweredBy')}</Typography>
                <Typography>
                  <Link
                    style={{ textDecoration: 'underline', marginLeft: 3 }}
                    href="https://www.meilisearch.com/"
                    target="_blank"
                  >
                    Meilisearch
                  </Link>
                </Typography>
              </PoweredBy>
              <GitHubButton style={{ marginTop: 6 }} />
            </BottomSection>
          </div>
        </Content>
      </Backdrop>
    </Container>
  )
}

export default MobileSettings
