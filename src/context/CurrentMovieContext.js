import React, { createContext, useState } from 'react'

const CurrentMovieContext = createContext({
  currentMovie: null,
  setMovie: d => d,
})

const CurrentMovieProvider = ({ children }) => {
  const [currentMovie, setCurrentMovie] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <CurrentMovieContext.Provider
      value={{
        currentMovie,
        setMovie: setCurrentMovie,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </CurrentMovieContext.Provider>
  )
}

export { CurrentMovieProvider, CurrentMovieContext }
