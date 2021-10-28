import { appWithTranslation } from 'next-i18next'
import 'theme/colors.css'

// Template for every page
export function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default appWithTranslation(App)
