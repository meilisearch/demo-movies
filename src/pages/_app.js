import { ThemeProvider } from 'styled-components'
import GlobalStyle from 'theme/GlobalStyle'
import theme from 'theme'
import { appWithTranslation } from 'next-i18next'

// Template for every page
export function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default appWithTranslation(App)
