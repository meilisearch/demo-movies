import { appWithTranslation } from 'next-i18next'
import styled, { ThemeProvider } from 'styled-components'
import GlobalStyle from 'theme/GlobalStyle'
import theme from 'theme'
import 'theme/colors.css'
import get from 'utils/get'

const Wrapper = styled.div`
  @media (max-width: ${get('breakpoints.desktop')}) {
    padding: ${get('spacing.12')} ${get('spacing[2.5]')} 0;
  }
`

// Template for every page
export function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </ThemeProvider>
  )
}

export default appWithTranslation(App)
