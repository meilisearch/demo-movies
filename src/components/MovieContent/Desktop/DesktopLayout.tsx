import React, { useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import Providers from '~/components/MovieContent/Providers'
import DesktopMovieInfos from '~/components/MovieContent/Desktop/DesktopMovieInfos'
import Cast from '~/components/MovieContent/Cast'
import Typography from '~/components/Typography'
import Recommendations from '~/components/MovieContent/Recommendations'
import SectionTitle from '~/components/MovieContent/Desktop/SectionTitle'
import { useSimilarMovies } from '~/hooks/useSimilarMovies'

const SectionLayout = ({
  children,
  heading,
  description,
}: {
  children: React.ReactNode
  heading: string
  description?: string
}) => {
  return (
    <div className="">
      <SectionTitle className="mb-4">{heading}</SectionTitle>
      {description && (
        <div className="mb-8">
          <Typography>{description}</Typography>
        </div>
      )}
      {children}
    </div>
  )
}

const DesktopLayout = ({ hit }) => {
  const { t } = useTranslation('common')
  const movie = useMemo(() => hit, [hit])
  const similarMoviesQuery = useSimilarMovies(movie.id)

  return (
    <div className="grid grid-cols-12">
      <div className="col-start-1 col-end-3 px-4 py-12 bg-[var(--providers-bg-color)]">
        <SectionLayout
          heading={t('title')}
          description={t('platforms.description', { title: movie.title })}
        >
          <Providers providers={movie.providers} />
        </SectionLayout>
      </div>
      <div className="col-start-3 col-end-[-1] pb-16">
        <DesktopMovieInfos movie={movie} />
        <div className="px-14 py-12 space-y-8">
          <SectionLayout heading={t('cast')}>
            <Cast cast={movie.cast} movie={movie} />
          </SectionLayout>
          <SectionLayout
            heading={t('similar.heading')}
            description={t('similar.description', { title: movie.title })}
          >
            {similarMoviesQuery.status === 'loading' && (
              <Typography>Loading...</Typography>
            )}
            {similarMoviesQuery.status === 'error' && (
              <Typography>Error while loading similar movies.</Typography>
            )}
            {similarMoviesQuery.status === 'success' && (
              <Recommendations movies={similarMoviesQuery.data} />
            )}
          </SectionLayout>
        </div>
      </div>
    </div>
  )
}

export default DesktopLayout
