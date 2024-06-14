import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest'
import { initialMarkerInfo, ZOOM_LEVEL } from './MapInfo'

const FormMarker = ({
  allMarkers,
  setAllMarkers,
  mapRef,
  setMarkerInfo,
  markerInfo
}) => {
  const [searchAddress, setSearchAddress] = useState('')
  const [searchSuggestions, setSearchSuggestions] = useState([])
  const [openForm, setOpenForm] = useState(false)
  const [onEdit, setOnEdit] = useState(false)

  const handleChange = (e) => {
    const { value, name } = e.target
    setMarkerInfo({ ...markerInfo, [name]: value })
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
    mapRef.current.flyTo([lat, lon], ZOOM_LEVEL, {
      animate: true,
      duration: 1.5
    })
    setMarkerInfo({ ...markerInfo, coords: [lat, lon] })
    setOnEdit(true)
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
    setMarkerInfo({ ...markerInfo, coords: mapRef.current.getCenter() })
    setOnEdit(true)
  }

  const handleCancel = () => {
    setOpenForm(false)
    setOnEdit(false)
    setMarkerInfo({ ...markerInfo, coords: null })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setAllMarkers([...allMarkers, markerInfo])
    setMarkerInfo(initialMarkerInfo)
    setOpenForm(false)
    setOnEdit(false)
  }

  return (
    <div className="my-4 mx-10">
      {!openForm && (
        <button
          className="p-2 bg-purple-600 border border-black rounded-lg"
          type="button"
          onClick={() => setOpenForm(true)}
        >
          Add Marker
        </button>
      )}
      {openForm && (
        <div className="relative w-[30vw]">
          <div className="absolute -top-5 right-0">
            <button
              className="px-2 bg-gray-800 text-red-600"
              onClick={() => setOpenForm(false)}
            >
              X
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center my-10 mx-4 "
          >
            <div className="flex flex-col justify-center gap-4 text-black">
              <div>
                <input
                  name="name"
                  type="text"
                  value={markerInfo.name}
                  placeholder="Enter name"
                  onChange={handleChange}
                  className="p-2"
                />
              </div>
              <div>
                <input
                  name="description"
                  type="text"
                  value={markerInfo.description}
                  placeholder="Enter description"
                  onChange={handleChange}
                  className="p-2"
                />
              </div>
              <span className="text-white font-semibold">Generate marker</span>
              <div className="flex flex-col gap-4">
                <div>
                  <Autosuggest
                    suggestions={searchSuggestions}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={{
                      value: searchAddress,
                      onChange: (e, { newValue }) => setSearchAddress(newValue),
                      className:
                        'p-2 border border-gray-300 rounded text-black w-full',
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
                <span className="text-white text-center">ó</span>
                <button
                  type="button"
                  className="flex gap-2 items-center justify-center p-2 bg-blue-600 text-white mb-4"
                  onClick={handleAddMarker}
                  disabled={onEdit}
                >
                  Add Marker
                </button>
              </div>
            </div>
            {onEdit && (
              <button
                type="button"
                onClick={handleCancel}
                className="p-2 bg-red-600 text-white mb-4"
              >
                Cancelar
              </button>
            )}
            {onEdit && (
              <button
                type="submit"
                className="p-2 bg-green-600 text-white mb-4"
              >
                Add
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  )
}

export default FormMarker
