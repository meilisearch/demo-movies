import { useContext, useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import Providers from '~/components/MovieContent/Providers'
import DesktopMovieInfos from '~/components/MovieContent/Desktop/DesktopMovieInfos'
import Cast from '~/components/MovieContent/Cast'
import Typography from '~/components/Typography'
import Recommendations from '~/components/MovieContent/Desktop/Recommendations'
import SectionTitle from '~/components/MovieContent/SectionTitle'
import LanguageContext from '~/context/LanguageContext'
import { useMeilisearch } from '~/hooks/useMeilisearch'

const DesktopLayout = ({ hit }) => {
  const { t } = useTranslation('common')
  const movie = useMemo(() => hit, [hit])

  const { client } = useMeilisearch()
  const { selectedLanguage } = useContext(LanguageContext)
  const [similarMovies, setSimilarMovies] = useState([])

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      const results = await client
        .index(selectedLanguage.indexName)
        .searchSimilarDocuments({ id: movie.id, limit: 7 })
      setSimilarMovies(results.hits)
    }
    fetchSimilarMovies()
  }, [movie, client, selectedLanguage])

  return (
    <div className="grid grid-cols-12">
      <Providers
        className="bg-[var(--providers-bg-color)]"
        providers={movie.providers}
      />
      <div className="col-start-3 col-end-[-1] pb-16">
        <DesktopMovieInfos movie={movie} />
        <div className="px-14 py-12">
          <SectionTitle className="mb-4">{t('cast')}</SectionTitle>
          <Cast cast={movie.cast} movie={movie} />
          <SectionTitle className="mt-8 mb-2">
            {t('similar.heading')}
          </SectionTitle>
          <div className="mb-4">
            <Typography>
              {t('similar.description', { title: movie.title })}
            </Typography>
          </div>
          <Recommendations className="mt-4" movies={similarMovies} />
        </div>
      </div>
    </div>
  )
}

export default DesktopLayout
