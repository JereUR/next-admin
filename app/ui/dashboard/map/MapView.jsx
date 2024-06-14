'use client'

import 'leaflet/dist/leaflet.css'
import { useRef, useState, useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, Polyline } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import 'tailwindcss/tailwind.css'
import mapboxSdk from '@mapbox/mapbox-sdk'
import directions from '@mapbox/mapbox-sdk/services/directions'
import polyline from '@mapbox/polyline'
import {
  createCustomClusterIcon,
  destinationIcon,
  initialMarkerInfo,
  sendIcon,
  ZOOM_LEVEL
} from './MapInfo'
import FormMarker from './FormMarker'

const API_KEY = process.env.NEXT_PUBLIC_MAPBOX_KEY_API

const MapView = () => {
  const mapRef = useRef()
  const [markerInfo, setMarkerInfo] = useState(initialMarkerInfo)
  const [allMarkers, setAllMarkers] = useState([])
  const [location, setLocation] = useState({ lat: null, lng: null })
  const [routes, setRoutes] = useState([])

  const mapboxClient = mapboxSdk({ accessToken: API_KEY })
  const directionsClient = directions(mapboxClient)

  useEffect(() => {
    if ('geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ lat: latitude, lng: longitude })
        },
        (error) => console.error('Error getting location', error),
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000
        }
      )

      return () => navigator.geolocation.clearWatch(watchId)
    } else {
      console.error('Geolocation is not supported by this browser')
    }
  }, [])

  useEffect(() => {
    if (location.lat && location.lng && allMarkers.length > 0) {
      const fetchRoutes = async () => {
        try {
          console.log('Fetching routes for markers:', allMarkers)
          const routesPromises = allMarkers.map((marker) =>
            directionsClient
              .getDirections({
                profile: 'driving',
                waypoints: [
                  { coordinates: [location.lng, location.lat] },
                  { coordinates: [marker.coords.lng, marker.coords.lat] }
                ]
              })
              .send()
          )

          const routesResults = await Promise.all(routesPromises)

          const newRoutes = routesResults.map((result) => {
            const route = result.body.routes[0]
            const decodedGeometry = polyline.decode(route.geometry)
            return decodedGeometry.map(([lat, lng]) => ({ lat, lng }))
          })

          setRoutes(newRoutes)
        } catch (error) {
          console.error('Error fetching routes', error)
        }
      }

      fetchRoutes()
    }
  }, [location, allMarkers])

  const handleMarkerDragEnd = (event) => {
    const marker = event.target
    const position = marker.getLatLng()
    if (position) {
      setMarkerInfo({
        ...markerInfo,
        coords: { lat: position.lat, lng: position.lng }
      })
    }
  }

  return (
    <div>
      <FormMarker
        mapRef={mapRef}
        allMarkers={allMarkers}
        setMarkerInfo={setMarkerInfo}
        setAllMarkers={setAllMarkers}
        markerInfo={markerInfo}
      />
      <div className="m-10 flex justify-center">
        <MapContainer
          center={[-34.933333333333, -57.95]}
          zoom={ZOOM_LEVEL}
          className="h-[60vh] w-[60vw] z-10"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup
            chunkedLoading /*performance*/
            iconCreateFunction={createCustomClusterIcon}
          >
            {location.lat && location.lng && (
              <Marker
                icon={sendIcon}
                position={[location.lat, location.lng]}
              ></Marker>
            )}
            {markerInfo.coords && (
              <Marker
                icon={destinationIcon}
                position={[markerInfo.coords.lat, markerInfo.coords.lng]}
                draggable={true}
                eventHandlers={{ dragend: handleMarkerDragEnd }}
              >
                <Popup>
                  <div>
                    <p className="text-lg font-semibold">{markerInfo.name}</p>
                    <span className="italic font-extralight">
                      {markerInfo.description}
                    </span>
                  </div>
                </Popup>
              </Marker>
            )}
            {allMarkers.map((marker) => (
              <Marker
                key={marker.id}
                icon={destinationIcon}
                position={[marker.coords.lat, marker.coords.lng]}
                draggable={true}
                eventHandlers={{ dragend: handleMarkerDragEnd }}
              >
                <Popup>
                  <div className="flex flex-col justify-center">
                    <p className="font-semibold">{marker.name}</p>
                    <span className="italic font-extralight">
                      {marker.description}
                    </span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
          {routes.map((route, index) => (
            <Polyline key={index} positions={route} color="blue" />
          ))}
        </MapContainer>
      </div>
    </div>
  )
}

export default MapView
