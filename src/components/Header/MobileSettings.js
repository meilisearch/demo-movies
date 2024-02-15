import { useContext } from 'react'
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
import { MEILISEARCH_URL } from 'data/constants'
import Slider from 'components/Slider'
import SemanticRatioContext from 'context/SemanticRatioContext'

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

const Label = styled(Typography)`
  display: block;
  margin-bottom: 16px;
`

const LabelValueWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

const Section = styled.div`
  border-bottom: 1px solid var(--gray-500);
  padding: 24px 0;
`

const ColorSchemeSection = styled(Section)`
  display: flex;
  justify-content: space-between;
`

const LanguageSection = styled(Section)``

const BottomSection = styled(Section)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-bottom: none;
`

const HybridSearchSection = styled(Section)``

const PoweredBy = styled.div`
  color: var(--gray-300);
  margin-top: 68px;
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
  const { semanticRatio, setSemanticRatio } = useContext(SemanticRatioContext)

  return (
    <Container data-cy="settings-mobile">
      <Disclosure {...dialog}>
        <Settings width={20} />
      </Disclosure>
      <Backdrop {...dialog}>
        <Content {...dialog} aria-label="Settings">
          <div style={{ position: 'relative' }}>
            <Title variant="typo5">{t('menu.settings')}</Title>
            <CloseButton onClick={dialog.hide}>
              <Cross width={18} />
            </CloseButton>
            <HybridSearchSection>
              <LabelValueWrapper>
                <Label variant="typo6">{t('settings.semanticRatio')}</Label>
                <Typography variant="default">
                  {semanticRatio * 100}% semantic
                </Typography>
              </LabelValueWrapper>
              <Slider
                min={0}
                max={1}
                step={0.1}
                defaultValue={semanticRatio}
                onChangeComplete={setSemanticRatio}
              />
            </HybridSearchSection>
            <LanguageSection>
              <Label variant="typo6">{t('settings.movieLanguage')}</Label>
              <MobileCountrySwitcher />
            </LanguageSection>
            <ColorSchemeSection>
              <Label variant="typo6">{t('settings.colorScheme')}</Label>
              <Toggle onChange={window.__setPreferredTheme} />
            </ColorSchemeSection>
            <BottomSection>
              <PoweredBy>
                <Typography>{t('poweredBy')}</Typography>
                <Typography>
                  <Link
                    style={{ textDecoration: 'underline', marginLeft: 3 }}
                    href={MEILISEARCH_URL}
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
