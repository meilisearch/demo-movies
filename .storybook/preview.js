import React, { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../src/theme';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import '../src/theme/colors.css';
import GlobalStyle from '../src/theme/GlobalStyle';
import * as nextImage from "next/legacy/image";
import addons from '@storybook/addons';

const channel = addons.getChannel();

function Decorator({ children }) {
  const [isDark, setDark] = React.useState(
    localStorage.getItem('theme') || 'dark'
  );

  React.useEffect(() => {
    channel.on('DARK_MODE', setDark);

    document.body.classList.remove(isDark ? 'light' : 'dark')
    document.body.classList.add(isDark ? 'dark' : 'light')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')

    return () => channel.off('DARK_MODE', setDark);
  }, [channel, setDark, channel.data.DARK_MODE]);

  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback="Loading localization…">
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </Suspense>
    </I18nextProvider>
  );
}

export const decorators = [(story) => <Decorator>{story()}</Decorator>];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'fullscreen',
};

// Workaround for Next/Image not working in Storybook
Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props) => <img {...props} />,
});
