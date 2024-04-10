import React, { createContext, useState } from 'react'

const CurrentMovieContext = createContext({
  currentMovie: null,
  setMovie: d => d,
})

const CurrentMovieProvider = ({ children }) => {
  const [currentMovie, setCurrentMovie] = useState(null)

  console.log(currentMovie)

  return (
    <CurrentMovieContext.Provider
      value={{ currentMovie, setMovie: setCurrentMovie }}
    >
      {children}
    </CurrentMovieContext.Provider>
  )
}

export { CurrentMovieProvider, CurrentMovieContext }
