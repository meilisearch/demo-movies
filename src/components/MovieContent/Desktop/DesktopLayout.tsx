import { useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import Providers from '~/components/MovieContent/Providers'
import DesktopMovieInfos from '~/components/MovieContent/Desktop/DesktopMovieInfos'
import Cast from '~/components/MovieContent/Cast'
import Typography from '~/components/Typography'
import Recommendations from '~/components/MovieContent/Recommendations'
import SectionTitle from '~/components/MovieContent/Desktop/SectionTitle'
import { useSimilarMovies } from '~/hooks/useSimilarMovies'

const DesktopLayout = ({ hit }) => {
  const { t } = useTranslation('common')
  const movie = useMemo(() => hit, [hit])
  const similarMoviesQuery = useSimilarMovies(movie.id)

  return (
    <div className="grid grid-cols-12">
      <div className="col-start-1 col-end-3 px-4 py-12 bg-[var(--providers-bg-color)]">
        <SectionTitle className="mb-4">{t('title')}</SectionTitle>
        <div className="mb-8">
          <Typography>
            {t('platforms.description', { title: movie.title })}
          </Typography>
        </div>
        <Providers providers={movie.providers} />
      </div>
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
          {similarMoviesQuery.status === 'loading' && (
            <Typography>Loading...</Typography>
          )}
          {similarMoviesQuery.status === 'error' && (
            <Typography>Error while loading similar movies.</Typography>
          )}
          {similarMoviesQuery.status === 'success' && (
            <Recommendations movies={similarMoviesQuery.data} />
          )}
        </div>
      </div>
    </div>
  )
}

export default DesktopLayout
