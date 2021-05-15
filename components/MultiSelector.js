import React, { useState } from 'react'

import Select from 'react-select'

const MultiSelector = (props) => {
  const [selectedOptions, setSelectedOptions] = useState(null)

  return (
    <div>
      <Select
        /* styles={styles} */
        defaultValue={selectedOptions}
        onChange={setSelectedOptions}
        closeMenuOnSelect={true}
        isMulti
        options={props.options}
        /* defaultValue={props.defaultValue} */
      />
    </div>
  )
}

export default MultiSelector
