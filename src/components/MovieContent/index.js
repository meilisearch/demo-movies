import React from 'react'
import MobileLayout from './Mobile/MobileLayout'
import DesktopLayout from './Desktop/DesktopLayout'

const MovieContent = ({ hit }) => {
  const [mobile, setMobile] = React.useState(undefined)
  const releaseDate = new Date(hit.release_date)
  const release_year = releaseDate.getFullYear()

  const runtimeHours = Math.floor(hit.runtime / 60)
  const runtimeMinutes = hit.runtime % 60
  const movie_duration = `${runtimeHours}h${
    runtimeMinutes ? ` ${runtimeMinutes}m` : null
  }`

  const Layout = React.useMemo(
    () => (mobile ? MobileLayout : DesktopLayout),
    [mobile]
  )
  React.useEffect(() => {
    const updateMobile = () => {
      setMobile(window.innerWidth < 1024 ? true : false)
    }

    updateMobile()
    window.addEventListener('resize', updateMobile)
    return () => {
      window.removeEventListener('resize', updateMobile)
    }
  }, [])

  return typeof mobile !== 'undefined' ? (
    <Layout hit={{ ...hit, release_year, movie_duration }} />
  ) : null
}

export default MovieContent
