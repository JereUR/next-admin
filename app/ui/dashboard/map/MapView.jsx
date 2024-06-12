'use client'

import 'leaflet/dist/leaflet.css'
import { useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import 'tailwindcss/tailwind.css'
import { createCustomClusterIcon, destinationIcon, ZOOM_LEVEL } from './MapInfo'
import FormMarker from './FormMarker'

const MapView = () => {
  const mapRef = useRef()
  const [addingMarker, setAddingMarker] = useState(false)
  const [markerPosition, setMarkerPosition] = useState(null)
  const [allMarkers, setAllMarkers] = useState([])

  const handleMarkerDragEnd = (event) => {
    const marker = event.target
    const position = marker.getLatLng()
    setMarkerPosition([position.lat, position.lng])
  }

  return (
    <div>
      <FormMarker
        mapRef={mapRef}
        setAddingMarker={setAddingMarker}
        setAllMarkers={setAllMarkers}
        setMarkerPosition={setMarkerPosition}
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
            {addingMarker && markerPosition && (
              <Marker
                icon={destinationIcon}
                position={markerPosition}
                draggable={true}
                eventHandlers={{ dragend: handleMarkerDragEnd }}
              >
                <Popup>Add Marker</Popup>
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
                <Popup>Search Result</Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  )
}

export default MapView
