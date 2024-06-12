import { useEffect, useState } from 'react'

const useGeolation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coords: { lat: '', lng: '' }
  })

  useEffect(() => {
    const getLocation = () => {
      if (!('geolocation' in navigator)) {
        setLocation((state) => ({
          ...state,
          loaded: true,
          error: {
            code: 0,
            message: 'Geolocation not supported'
          }
        }))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            loaded: true,
            coords: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        },
        (error) => {
          setLocation({
            loaded: true,
            error
          })
        }
      )
    }

    if (typeof window !== 'undefined') {
      getLocation()
    }
  }, [])

  return location
}

export default useGeolation
