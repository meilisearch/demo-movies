import React from 'react';
import styled from 'styled-components';
import {
  usePopoverState,
  Popover,
  PopoverDisclosure,
  PopoverArrow,
} from 'reakit/Popover';
import LanguageContext from 'context/LanguageContext';
import { LANGUAGES } from 'data/constants';
import { Us, Cn, Jp, Il } from 'react-flags-select';

const Container = styled.div`
  margin-right: 21px;
`;

const PopoverContainer = styled.div`
  transition: opacity 250ms ease-in-out, transform 250ms ease-in-out;
  opacity: 0;
  transform-origin: top center;
  transform: translate3d(0, -20px, 0);
  [data-enter] & {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const Menu = styled.ul`
  background-color: var(--language-switcher-bg);
  color: var(--text-color);
  list-style: none;
  margin: 0;
  padding: 0;
  border-radius: 6px;
`;
const MenuItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 10px;
  cursor: pointer;
  background-color: ${({ selected }) =>
    selected ? 'var(--selected-language-bg)' : 'transparent'};
`;

const StyledPopoverDisclosure = styled(PopoverDisclosure)`
  background-color: transparent;
  color: var(--text-color);
  border: none;
  outline: none;
  font-size: 1.4rem;
  cursor: pointer;
`;

const StyledPopoverArrow = styled(PopoverArrow)`
  color: var(--language-switcher-bg);
`;

const LanguageSwitcher = () => {
  const popover = usePopoverState({
    animated: 250,
    hideOnEsc: true,
  });
  const { selectedLanguage, setSelectedLanguage } =
    React.useContext(LanguageContext);

  const handleLanguageSelection = (newSelectedLanguage) => {
    setSelectedLanguage(newSelectedLanguage);
    popover.hide();
  };

  const renderFlag = (code) => {
    switch (code) {
      case 'en-US': {
        return <Us />;
      }
      case 'ja-JP': {
        return <Jp />;
      }
      case 'zh-CN': {
        return <Cn />;
      }
      case 'he-IL': {
        return <Il />;
      }
    }
  };

  return (
    <Container>
      <StyledPopoverDisclosure {...popover} aria-label="Language selector">
        {renderFlag(selectedLanguage.code)}
      </StyledPopoverDisclosure>
      <Popover
        {...popover}
        aria-label="Language list"
        style={{ border: 0, background: 'none', padding: 0 }}
      >
        <PopoverContainer>
          <StyledPopoverArrow {...popover} />
          <Menu>
            {Object.entries(LANGUAGES).map(([languageName, data]) => (
              <MenuItem
                key={data.code}
                selected={data.code === selectedLanguage.code}
                onClick={() => handleLanguageSelection(data)}
              >
                {renderFlag(data.code)}
                <div>{languageName}</div>
              </MenuItem>
            ))}
          </Menu>
        </PopoverContainer>
      </Popover>
    </Container>
  );
};

export default LanguageSwitcher;
