import React, { Suspense } from 'react'
import { ThemeProvider } from 'styled-components'
import theme from '../src/theme'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import '../src/theme/colors.css'
import GlobalStyle from '../src/theme/GlobalStyle'
import * as nextImage from 'next/image';


export const decorators = [
  (Story) => (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback="Loading localization…">
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Story />
        </ThemeProvider>
      </Suspense>
    </I18nextProvider>
  ),
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'fullscreen',
}

// Workaround for Next/Image not working in Storybook
Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: props => <img  {...props} />
});
