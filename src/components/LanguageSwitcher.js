import React from 'react'
import styled from 'styled-components'
import {
  usePopoverState,
  Popover as ReakitPopover,
  PopoverDisclosure,
} from 'reakit/Popover'
import LanguageContext from 'context/LanguageContext'
import { LANGUAGES } from 'data/constants'
import Typography from 'components/Typography'

const Container = styled.div`
  margin-right: 21px;
`

const PopoverContainer = styled.div`
  transition: opacity 250ms ease-in-out, transform 250ms ease-in-out;
  opacity: 0;
  transform-origin: top center;
  transform: translate3d(0, -20px, 0);
  [data-enter] & {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`

const Menu = styled.ul`
  background-color: var(--language-switcher-bg);
  color: var(--text-color);
  list-style: none;
  margin: 0;
  padding: 0;
  border-radius: 6px;
`
const MenuItem = styled.li`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  cursor: pointer;
  transition: background-color 300ms;

  color: ${({ selected }) =>
    selected ? 'var(--selected-language-text)' : 'var(--base-language-text)'};

  &:hover {
    background-color: var(--selected-language-bg);
  }

  background-color: ${({ selected }) =>
    selected ? 'var(--selected-language-bg)' : 'transparent'};
`

const StyledPopoverDisclosure = styled(PopoverDisclosure)`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  border-radius: 3px;
  overflow: hidden;
  width: 31px;
  height: 22px;
  border: 1px solid var(--flag-border);
  box-sizing: content-box;
`

const Popover = styled(ReakitPopover)`
  border: 0;
  background: none;
  padding: 0;
  border-radius: 6px;
  overflow: hidden;
`

const SelectedLanguageFlag = styled.img`
  display: inline-block;
  width: 31px;
  height: 22px;
`

const FlagImage = styled.img`
  width: 24px;
  height: 17px;
`

const CountryName = styled(Typography)`
  margin-left: 6px;
`

const LanguageSwitcher = () => {
  const popover = usePopoverState({
    animated: 250,
    hideOnEsc: true,
  })
  const { selectedLanguage, setSelectedLanguage } =
    React.useContext(LanguageContext)

  const handleLanguageSelection = newSelectedLanguage => {
    setSelectedLanguage(newSelectedLanguage)
    popover.hide()
  }

  return (
    <Container>
      <StyledPopoverDisclosure {...popover} aria-label="Language selector">
        <SelectedLanguageFlag
          src={`/images/flags/${selectedLanguage.code}.png`}
          alt={selectedLanguage.code}
        />
      </StyledPopoverDisclosure>
      <Popover {...popover} aria-label="Language list">
        <PopoverContainer>
          <Menu>
            {LANGUAGES.map(data => (
              <MenuItem
                key={data.code}
                selected={data.code === selectedLanguage.code}
                onClick={() => handleLanguageSelection(data)}
              >
                <FlagImage
                  src={`/images/flags/${data.code}.png`}
                  alt={data.code}
                />
                <CountryName>{data.countryName}</CountryName>
              </MenuItem>
            ))}
          </Menu>
        </PopoverContainer>
      </Popover>
    </Container>
  )
}

export default LanguageSwitcher
