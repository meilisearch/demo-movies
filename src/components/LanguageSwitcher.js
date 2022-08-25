import React from 'react'
import styled from 'styled-components'
// import {
//   usePopoverState,
//   Popover as ReakitPopover,
//   PopoverDisclosure,
// } from 'reakit/Popover'

import {
  useMenuState,
  Menu as ReakitMenu,
  MenuItem as ReakitMenuItem,
  MenuButton as ReakitMenuButton,
} from 'reakit/Menu'

import LanguageContext from 'context/LanguageContext'
import { LANGUAGES } from 'data/constants'
import Typography from 'components/Typography'

// TODO: Add LanguageSwitcher component to Storybook

const Container = styled.div`
  margin-right: 21px;
`

const MenuContainer = styled.div`
  background-color: var(--language-switcher-bg);
  border-width: 1px;
  border-style: solid;
  border-color: var(--selected-language-border);
  color: var(--text-color);
  list-style: none;
  margin: 0;
  padding: 0;
  border-radius: 6px;

  overflow: hidden;
  transition: opacity 300ms, transform 300ms;
  transform-origin: top center;
  transform: translateY(0);
  opacity: 0;
  [data-enter] & {
    transform: translateY(20px);
    opacity: 1;
  }
`

const Menu = styled(ReakitMenu)``

const MenuItem = styled(ReakitMenuItem)`
  margin: 0;
  padding: 16px 24px;
  border: 0;
  outline: none;
  display: flex;
  align-items: center;
  width: 100%;
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

const MenuButton = styled(ReakitMenuButton)`
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
  const menu = useMenuState({
    animated: 300,
    loop: true,
  })

  const { selectedLanguage, setSelectedLanguage } =
    React.useContext(LanguageContext)

  const handleLanguageSelection = newSelectedLanguage => {
    setSelectedLanguage(newSelectedLanguage)
    menu.hide()
  }

  return (
    <Container>
      <MenuButton {...menu} aria-label="Language selector">
        <SelectedLanguageFlag
          src={`/images/flags/${selectedLanguage.code}.png`}
          alt={selectedLanguage.code}
        />
      </MenuButton>
      <Menu {...menu} aria-label="Language list">
        <MenuContainer>
          {LANGUAGES.map(data => (
            <MenuItem
              {...menu}
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
        </MenuContainer>
      </Menu>
    </Container>
  )
}

export default LanguageSwitcher
