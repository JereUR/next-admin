'use client'

import { Icon, divIcon, point } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import useGeolation from './useGeolation'
import { GiGlobe } from 'react-icons/gi'
import Autosuggest from 'react-autosuggest'
import 'tailwindcss/tailwind.css'

const MapView = () => {
  const mapRef = useRef()
  const location = useGeolation()
  const ZOOM_LEVEL = 13
  const [searchAddress, setSearchAddress] = useState('')
  const [searchSuggestions, setSearchSuggestions] = useState([])
  const [searchResult, setSearchResult] = useState(null)
  const [addingMarker, setAddingMarker] = useState(false)
  const [markerPosition, setMarkerPosition] = useState(null) // Estado para almacenar la posición del marcador generado por el botón

  const markers = [
    { geocode: [48.86, 2.3522], popup: 'Hello, I am pop up 1' },
    { geocode: [48.85, 2.3522], popup: 'Hello, I am pop up 2' },
    { geocode: [48.855, 2.34], popup: 'Hello, I am pop up 3' }
  ]

  const customIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/9561/9561845.png',
    iconSize: [38, 38]
  })

  const homeIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/7757/7757494.png',
    iconSize: [38, 38]
  })

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class='h-12 w-12 rounded-full bg-white transform translate-x-[-50%] translate-y-[-50%] flex justify-center items-center font-[900] text-xl text-black'>${cluster.getChildCount()}</div>`,
      className: 'custom-marker-cluster',
      iconSize: point(33, 33, true)
    })
  }

  const showMyLocation = () => {
    if (location.loaded && !location.error) {
      const { lat, lng } = location.coords
      mapRef.current.flyTo([lat, lng], ZOOM_LEVEL, {
        animate: true,
        duration: 1.5
      })
    } else {
      alert(location.error.message)
    }
  }

  const handleSearch = async (value) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
    )
    const results = await response.json()
    setSearchSuggestions(results)
  }

  const onSuggestionSelected = (event, { suggestion }) => {
    const { lat, lon } = suggestion
    setSearchResult([lat, lon])
    mapRef.current.flyTo([lat, lon], ZOOM_LEVEL, {
      animate: true,
      duration: 1.5
    })
  }

  const onSuggestionsFetchRequested = ({ value }) => {
    handleSearch(value)
  }

  const onSuggestionsClearRequested = () => {
    setSearchSuggestions([])
  }

  const getSuggestionValue = (suggestion) => suggestion.display_name

  const renderSuggestion = (suggestion) => (
    <div className="p-2 cursor-pointer hover:bg-gray-200">
      {suggestion.display_name}
    </div>
  )

  const handleAddMarker = () => {
    setAddingMarker(true)
    setMarkerPosition(mapRef.current.getCenter()) // Al agregar un marcador, establece la posición actual del centro del mapa como posición del marcador
  }

  const handleMarkerDragEnd = (event) => {
    const marker = event.target
    const position = marker.getLatLng()
    setSearchResult([position.lat, position.lng])
    setAddingMarker(false)
    setMarkerPosition([position.lat, position.lng])
  }

  return (
    <div>
      <div className="relative my-4">
        <Autosuggest
          suggestions={searchSuggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{
            value: searchAddress,
            onChange: (e, { newValue }) => setSearchAddress(newValue),
            className: 'p-2 border border-gray-300 rounded text-black',
            placeholder: 'Enter address'
          }}
          onSuggestionSelected={onSuggestionSelected}
          theme={{
            suggestionsContainer:
              'absolute bg-white shadow-lg z-20 w-full text-black',
            suggestionsList: 'm-0 p-0 list-none',
            suggestion: '',
            suggestionHighlighted: 'bg-gray-300'
          }}
        />
      </div>
      {!addingMarker && (
        <button
          className="flex gap-2 items-center justify-center p-2 bg-blue-600 text-white mb-4"
          onClick={handleAddMarker}
        >
          Add Marker
        </button>
      )}
      {location.loaded && !location.error && (
        <MapContainer
          center={[location.coords.lat, location.coords.lng]}
          zoom={ZOOM_LEVEL}
          className="h-screen z-10"
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
            {markers.map((marker, index) => (
              <Marker key={index} position={marker.geocode} icon={customIcon}>
                <Popup>{marker.popup}</Popup>
              </Marker>
            ))}
            {location.loaded && !location.error && (
              <Marker
                icon={homeIcon}
                position={[location.coords.lat, location.coords.lng]}
              ></Marker>
            )}
            {searchResult && (
              <Marker
                icon={customIcon}
                position={searchResult}
                draggable={true}
                eventHandlers={{ dragend: handleMarkerDragEnd }}
              >
                <Popup>Search Result</Popup>
              </Marker>
            )}
            {addingMarker && (
              <Marker
                icon={customIcon}
                position={markerPosition} // Utiliza la posición almacenada del marcador generado por el botón
                draggable={true}
                eventHandlers={{ dragend: handleMarkerDragEnd }}
              >
                <Popup>Add Marker</Popup>
              </Marker>
            )}
          </MarkerClusterGroup>
        </MapContainer>
      )}
      <div className="my-4 w-[10vw]">
        <div className="flex flex-col justify-center">
          <button
            className="flex gap-2 items-center justify-center p-2 bg-red-600 text-white"
            onClick={showMyLocation}
          >
            Locate Me <GiGlobe />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MapView
