import React, { useRef, useState, useContext } from 'react'
import styled from 'styled-components'
import Card from '~/components/Card'
import { MovieContext } from '~/context/MovieContext'
import { DialogDisclosure } from 'components/Dialog'

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

const MovieCard = styled(DialogDisclosure)`
  flex: 0 0 100px;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`

const ScrollButton = styled.button<{ direction: 'left' | 'right', visible: boolean }>`
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
      const scrollAmount = 220 // Scroll by ~2 movie cards
      trackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
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
            <MovieCard
              key={movie.id}
              {...dialog}
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
              }}
            >
              <Card
                id={movie.id}
                poster_path={movie.poster_path}
                title={movie.title}
                release_date={movie.release_date}
                vote_average={movie.vote_average}
                imageClassName="h-[150px]"
              />
            </MovieCard>
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