import React, { Component } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete'

const searchOptions = {
  types: ['address'],
  componentRestrictions: { country: 'se' },
}

export class AddressForm extends Component {
  constructor(props) {
    super(props)
    this.state = { address: '' }
  }

  handleChange = (address) => {
    this.setState({ address })
  }

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        this.setState({ address })
        this.props.setAddress = address
        /* this.props.coordinates = latLng */
      })
      .catch((error) => console.error('Error', error))
  }

  render() {
    return (
      <div>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          searchOptions={searchOptions}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <label
                className='block text-grey-darker text-sm font-bold my-2'
                htmlFor='website'
              >
                Adress
              </label>
              <input
                {...getInputProps({
                  placeholder: 'Sök adress ...',
                  className:
                    'location-search-input shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker',
                })}
              />
              <div className='autocomplete-dropdown-container shadow border rounded text-grey-darker'>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active py-2 px-3 shadow border'
                    : 'suggestion-item py-2 px-3 shadow border'
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' }
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    )
  }
}

export default AddressForm
