import React, { Suspense } from 'react'
import { ThemeProvider } from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import theme from '../src/theme'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
  }
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
  }
`

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
