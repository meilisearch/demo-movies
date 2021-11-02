import { appWithTranslation } from 'next-i18next'
import GlobalStyle from 'theme/GlobalStyle'
import 'theme/colors.css'

// Template for every page
export function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default appWithTranslation(App)
