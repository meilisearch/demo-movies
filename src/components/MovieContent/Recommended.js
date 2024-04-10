import React from 'react'
import styled from 'styled-components'
import Container from 'components/Container'
import { MovieCard } from 'components/MoviesList'

const Recommended = ({ id, dialog, prompt, limit }) => {
  const [recommendedMovies, setRecommendedMovies] = React.useState([])

  React.useEffect(() => {
    fetch('http://51.159.80.95:7777/' + 'indexes/movies-en-US/recommend', {
      headers: {
        'Authorization': 'Bearer yk9xqAjxF6oRYWKmDno4gB3prBIBPIs1G2kCkrzZHmc',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        id: id.toString(),
        limit: limit,
        prompt: prompt,
      }),
    })
      .then(response => response.json())
      .then(data => {
        setRecommendedMovies(data.hits.slice(0, 5))
      })
  }, [recommendedMovies, id])

  return (
    <Wrapper as="section">
      {recommendedMovies.map(movie => (
        <div key={movie.id} style={{ width: '12em', padding: '0.8em' }}>
          <MovieCard dialog={dialog} hit={movie} />
        </div>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled(Container)`
  background-color: var(--results-bg);
  transition: background-color 300ms;
  box-shadow: 0px 0px 64px rgba(0, 0, 0, 0.06);
  margin: 16px -10px 0;
  padding: 18px 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
`

export default Recommended
