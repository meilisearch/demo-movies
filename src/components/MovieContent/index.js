import React from 'react'
import MobileLayout from './Mobile/MobileLayout'
import DesktopLayout from './Desktop/DesktopLayout'

const hasMobileDeviceWindowWidth = () => {
  return window.innerWidth < 1024
}

const MovieContent = ({ hit }) => {
  const [isMobileDevice, setMobileDevice] = React.useState(
    hasMobileDeviceWindowWidth()
  )
  const releaseDate = new Date(hit.release_date)
  const release_year = releaseDate.getFullYear()

  const runtimeHours = Math.floor(hit.runtime / 60)
  const runtimeMinutes = hit.runtime % 60
  const movie_duration = `${runtimeHours}h${
    runtimeMinutes ? ` ${runtimeMinutes}m` : null
  }`

  const Layout = React.useMemo(
    () => (isMobileDevice ? MobileLayout : DesktopLayout),
    [isMobileDevice]
  )
  React.useEffect(() => {
    const updateMobile = () => {
      setMobileDevice(hasMobileDeviceWindowWidth())
    }

    updateMobile()
    window.addEventListener('resize', updateMobile)
    return () => {
      window.removeEventListener('resize', updateMobile)
    }
  }, [])

  return <Layout hit={{ ...hit, release_year, movie_duration }} />
}

export default MovieContent
