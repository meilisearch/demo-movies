import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { InstantSearch, useInstantSearch } from 'react-instantsearch'
import type { InstantMeiliSearchObject } from '@meilisearch/instant-meilisearch'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ClientProvider } from 'context/ClientContext'
import SemanticRatioContext from 'context/SemanticRatioContext'
import get from 'utils/get'
import Header from 'components/Header'
import HeadingSection from 'components/HeadingSection'
import MoviesList from 'components/MoviesList/index'
import { LANGUAGES } from '~/lib/constants'
import { LanguageProvider } from 'context/LanguageContext.ts'
import useLocalStorage from 'hooks/useLocalStorage'
import { createMeilisearchClient } from '../lib/createMeilisearchClient'

const MEILISEARCH_HOST = process.env.MEILISEARCH_HOST || 'http://0.0.0.0:7700'
const MEILISEARCH_API_KEY = process.env.MEILISEARCH_API_KEY || 'searchKey'

const DEFAULT_SEMANTIC_RATIO = 0.5
const DEFAULT_EMBEDDER = 'small'

const Wrapper = styled.div`
  @media (min-width: ${get('breakpoints.desktop')}) {
    padding: 0 50px 50px;
  }
`

type SearchParamsUpdaterProps = {
  setSearchParams: InstantMeiliSearchObject['setMeiliSearchParams']
  semanticRatio: number
}

const SearchParamsUpdater = ({
  setSearchParams,
  semanticRatio,
}: SearchParamsUpdaterProps) => {
  const { refresh } = useInstantSearch()

  useEffect(() => {
    if (!setSearchParams) return

    const hybrid = {
      semanticRatio,
      embedder: DEFAULT_EMBEDDER,
    }
    console.log('🔄 Updating search params', hybrid)
    setSearchParams({
      hybrid,
    })
    refresh()
  }, [semanticRatio, refresh, setSearchParams])

  return null // This component doesn't render anything
}

const Home = ({ host, apiKey }) => {
  const [localStorageCountry, setLocalStorageCountry] =
    useLocalStorage('country-preference')
  const { t } = useTranslation('common')
  const [client, setClient] = React.useState<InstantMeiliSearchObject>(null)
  const [selectedLanguage, setSelectedLanguage] = React.useState(null)
  const [semanticRatio, setSemanticRatio] = React.useState(
    DEFAULT_SEMANTIC_RATIO
  )

  const setSelectedCountry = React.useCallback(
    country => {
      setSelectedLanguage(country)
      setLocalStorageCountry(country.code)
    },
    [setLocalStorageCountry]
  )

  React.useEffect(() => {
    const preferedLanguage = LANGUAGES.find(e => e.code === localStorageCountry)
    const defaultLanguage = LANGUAGES.find(e => e.code === 'en-US')
    setSelectedLanguage(preferedLanguage || defaultLanguage)
  }, [localStorageCountry])

  React.useEffect(() => {
    if (host && apiKey) {
      setClient(createMeilisearchClient(host, apiKey))
    }
  }, [host, apiKey])

  const setSearchParams = useCallback(
    params => client.setMeiliSearchParams(params),
    [client]
  )

  if (!host || !apiKey) return <div>{t('connexionFailed')}</div>

  return (
    <ClientProvider value={{ client, setClient }}>
      <LanguageProvider
        value={{ selectedLanguage, setSelectedLanguage: setSelectedCountry }}
      >
        <Head>
          <title>{t('title')}</title>
          <meta name="description" content={t('meta.description')} />
        </Head>
        {client && (
          <InstantSearch
            future={{ preserveSharedStateOnUnmount: true }}
            indexName={selectedLanguage.indexName}
            searchClient={client.searchClient}
          >
            <SearchParamsUpdater
              setSearchParams={setSearchParams}
              semanticRatio={semanticRatio}
            />
            <Wrapper>
              <SemanticRatioContext.Provider
                value={{ semanticRatio, setSemanticRatio }}
              >
                <Header />
                <HeadingSection />
              </SemanticRatioContext.Provider>
              <MoviesList />
            </Wrapper>
          </InstantSearch>
        )}
      </LanguageProvider>
    </ClientProvider>
  )
}

export const getStaticProps = async ({ locale }) => {
  try {
    return {
      props: {
        host: MEILISEARCH_HOST,
        apiKey: MEILISEARCH_API_KEY,
        ...(await serverSideTranslations(locale, ['common'])),
      },
    }
  } catch (err) {
    console.log(err)
  }
}

export default Home
