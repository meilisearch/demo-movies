import React, { createContext, useState, useEffect } from 'react'

const FavoritesContext = createContext({
  favorites: {},
  markFavorite: (type, item) => item,
  isFavorited: () => true,
})

const STORAGE_KEY = 'favorites'

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState({ movies: [], crew: [] })

  // Load state from session in case of a refresh
  useEffect(() => {
    const storage = localStorage.getItem(STORAGE_KEY)

    if (storage) {
      setFavorites(JSON.parse(storage))
    }
  }, [])

  const markFavorite = (type, data) => {
    const alreadyFavorited = isFavorited(type, data.id)

    if (alreadyFavorited) {
      favorites[type].splice(findFavorite(type, data.id), 1)
    } else {
      if (type === 'movies') {
        favorites[type].push({ id: data.id, title: data.title })
      } else {
        favorites[type].push({ id: data.id, name: data.name, role: 'actor' })
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    setFavorites(favorites)
  }

  const findFavorite = (type, id) => favorites[type].findIndex(o => o.id === id)
  const isFavorited = (type, id) => findFavorite(type, id) !== -1

  // Wraps the regular setProject to only save the state when the flow is on.
  const clearSession = () => localStorage.removeItem(STORAGE_KEY)

  return (
    <FavoritesContext.Provider
      value={{ favorites, markFavorite, clearSession, isFavorited }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export { FavoritesProvider, FavoritesContext }
