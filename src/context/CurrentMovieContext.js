import React, { createContext, useState } from 'react'

const CurrentMovieContext = createContext({
  currentMovie: null,
  setMovie: d => d,
})

const CurrentMovieProvider = ({ children }) => {
  const [currentMovie, setCurrentMovie] = useState(null)

  return (
    <CurrentMovieContext.Provider
      value={{ currentMovie, setMovie: setCurrentMovie }}
    >
      {children}
    </CurrentMovieContext.Provider>
  )
}

export { CurrentMovieProvider, CurrentMovieContext }
