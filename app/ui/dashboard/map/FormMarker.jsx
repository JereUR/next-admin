import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest'
import { ZOOM_LEVEL } from './MapInfo'

const FormMarker = ({
  setAllMarkers,
  setAddingMarker,
  mapRef,
  setMarkerPosition
}) => {
  const [searchAddress, setSearchAddress] = useState('')
  const [searchSuggestions, setSearchSuggestions] = useState([])
  const [openForm, setOpenForm] = useState(false)
  const [onEdit, setOnEdit] = useState(false)

  const handleSearch = async (value) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
    )
    const results = await response.json()
    setSearchSuggestions(results)
  }

  const onSuggestionSelected = (event, { suggestion }) => {
    const { lat, lon } = suggestion
    mapRef.current.flyTo([lat, lon], ZOOM_LEVEL, {
      animate: true,
      duration: 1.5
    })
    setMarkerPosition([lat, lon])
    setAddingMarker(true)
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
    setMarkerPosition(mapRef.current.getCenter())
    setAddingMarker(true)
  }

  return (
    <div>
      <button
        className="p-2 bg-purple-600 my-4 mx-10 border border-black rounded-lg"
        type="button"
        onClick={() => setOpenForm(true)}
      >
        Add Marker
      </button>
      {openForm && (
        <div className="flex gap-4">
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
                placeholder: 'Enter address',
                disabled: onEdit
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
          <button
            className="flex gap-2 items-center justify-center p-2 bg-blue-600 text-white mb-4"
            onClick={handleAddMarker}
            disabled={onEdit}
          >
            Add Marker
          </button>
        </div>
      )}
    </div>
  )
}

export default FormMarker
