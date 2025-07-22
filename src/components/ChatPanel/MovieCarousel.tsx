import React, { useRef, useState, useContext } from 'react'
import styled from 'styled-components'
import { MovieContext } from '~/context/MovieContext'

interface MovieSource {
  title: string
  id: string
  poster_path?: string
  release_date?: string
  vote_average?: number
}

interface MovieCarouselProps {
  movies: MovieSource[]
}

const CarouselContainer = styled.div`
  margin: 12px 0;
  padding: 12px 14px;
  background: var(--color-tool-bg);
  border-radius: 8px;
  border-left: 3px solid var(--color-primary);
`

const CarouselHeader = styled.div`
  font-weight: 500;
  margin-bottom: 12px;
  font-size: 13px;
  color: var(--color-primary);
  display: flex;
  align-items: center;
  gap: 8px;
`

const CarouselWrapper = styled.div`
  position: relative;
  overflow: hidden;
`

const CarouselTrack = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
  padding-bottom: 8px;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-border);
    border-radius: 3px;
  }
`

const EnhancedMovieCard = styled.div`
  flex: 0 0 160px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`

const MoviePoster = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'poster',
})<{ poster?: string }>`
  aspect-ratio: 2/3;
  background: ${props => props.poster 
    ? `url(${props.poster}) center/cover` 
    : 'var(--color-tool-bg)'
  };
  position: relative;
  
  ${props => !props.poster && `
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-secondary);
  `}
`

const MovieInfo = styled.div`
  padding: 8px;
`

const MovieTitle = styled.h4`
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 4px 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const MovieMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
  color: var(--color-text-secondary);
`

const RatingBadge = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'rating',
})<{ rating: number }>`
  background: ${props => {
    if (props.rating >= 8) return '#059669'; // green
    if (props.rating >= 6) return '#d97706'; // orange
    if (props.rating >= 4) return '#dc2626'; // red
    return 'var(--color-text-secondary)';
  }};
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
`

const YearBadge = styled.span`
  background: var(--color-tool-bg);
  color: var(--color-text-secondary);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
`

const ScrollButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['direction', 'visible'].includes(prop),
})<{ direction: 'left' | 'right', visible: boolean }>`
  position: absolute;
  top: 50%;
  ${props => props.direction === 'left' ? 'left: 0' : 'right: 0'};
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: ${props => props.visible ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  
  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
`

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies }) => {
  const { setCurrentMovie, dialog } = useContext(MovieContext)
  const trackRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const handleScroll = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      const scrollAmount = 340 // Scroll by ~2 enhanced movie cards (160px each + gap)
      trackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const formatPosterUrl = (posterPath?: string) => {
    if (!posterPath) return undefined
    return posterPath.startsWith('http') 
      ? posterPath 
      : `https://image.tmdb.org/t/p/w300${posterPath}`
  }

  const getYear = (dateString?: string) => {
    return dateString ? new Date(dateString).getFullYear() : null
  }

  return (
    <CarouselContainer>
      <CarouselHeader>
        📚 Referenced Movies ({movies.length})
      </CarouselHeader>
      <CarouselWrapper>
        <ScrollButton 
          direction="left" 
          visible={showLeftArrow}
          onClick={() => scroll('left')}
        >
          ‹
        </ScrollButton>
        <CarouselTrack ref={trackRef} onScroll={handleScroll}>
          {movies.map((movie) => (
            <EnhancedMovieCard
              key={movie.id}
              onClick={() => {
                // Convert movie source to full MovieData format expected by context
                const movieData = {
                  id: Number(movie.id),
                  title: movie.title,
                  poster_path: movie.poster_path || '',
                  release_date: movie.release_date || '',
                  vote_average: movie.vote_average || 0,
                  // Add required fields with default values
                  overview: '',
                  genres: [],
                  spoken_languages: [],
                  runtime: 0,
                  backdrop_path: '',
                  production_countries: [],
                  tagline: '',
                  cast: [],
                  crew: [],
                  watch_providers: []
                }
                setCurrentMovie(movieData)
                dialog.show()
              }}
            >
              <MoviePoster poster={formatPosterUrl(movie.poster_path)}>
                {!movie.poster_path && (
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4l-2 18h14l-2-18M10 9v8m4-8v8" />
                  </svg>
                )}
              </MoviePoster>
              <MovieInfo>
                <MovieTitle>{movie.title}</MovieTitle>
                <MovieMeta>
                  {movie.vote_average && movie.vote_average > 0 ? (
                    <RatingBadge rating={movie.vote_average}>
                      ★ {movie.vote_average.toFixed(1)}
                    </RatingBadge>
                  ) : (
                    <span>No rating</span>
                  )}
                  {getYear(movie.release_date) && (
                    <YearBadge>{getYear(movie.release_date)}</YearBadge>
                  )}
                </MovieMeta>
              </MovieInfo>
            </EnhancedMovieCard>
          ))}
        </CarouselTrack>
        <ScrollButton 
          direction="right" 
          visible={showRightArrow}
          onClick={() => scroll('right')}
        >
          ›
        </ScrollButton>
      </CarouselWrapper>
    </CarouselContainer>
  )
}

export default MovieCarousel