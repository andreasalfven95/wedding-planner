import React from 'react'
import Select from 'react-select'
import county from './County'

const CountySelector = () => {
  return (
    <div>
      <Select
        /* styles={styles} */
        closeMenuOnSelect={true}
        isMulti
        options={county}
        defaultValue={county[0]}
      />
    </div>
  )
}

export default CountySelector
