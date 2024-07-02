import { appWithTranslation } from 'next-i18next'
import styled, { ThemeProvider } from 'styled-components'
import { TwicInstall } from '@twicpics/components/react'

import GlobalStyle from 'theme/GlobalStyle'
import theme from 'theme/index.js'
import 'theme/colors.css'
import get from 'utils/get'
import Script from 'next/script'

import '@twicpics/components/style.css'
import '~/globals.css'

const Wrapper = styled.div`
  @media (max-width: ${get('breakpoints.desktop')}) {
    padding: 48px 10px 0;
  }
`

const Scripts = () => {
  if (process.env.NEXT_PUBLIC_APP_ENV !== 'production') {
    return null
  }
  const fathomTrackingCode = process.env.NEXT_PUBLIC_FATHOM_TRACKING_CODE
  return (
    <>
      <Script
        id="fathom-script"
        src="https://cdn.usefathom.com/script.js"
        data-site={fathomTrackingCode}
      />
    </>
  )
}

// Template for every page
export function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <TwicInstall domain="https://meilisearch.twic.pics" />
      <Scripts />
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </ThemeProvider>
  )
}

export default appWithTranslation(App)
