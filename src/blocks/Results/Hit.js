import React from 'react'
import Card from 'components/Card'

const Hit = ({ hit }) => {
  const { poster_path, title, release_date, vote_average } = hit
  return (
    <Card
      poster_path={poster_path}
      title={title}
      release_date={release_date}
      vote_average={vote_average}
    />
  )
}

export default Hit
