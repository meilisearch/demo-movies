import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'
import Input from 'components/Input'

const SearchBox = connectSearchBox(({ currentRefinement, refine }) => {
  const [value, setValue] = React.useState(currentRefinement)

  React.useEffect(() => {
    refine(value)
  }, [value])

  return (
    <Input
      type="search"
      value={value}
      onChange={e => setValue(e.target.value)}
      clear={() => setValue('')}
    />
  )
})

export default SearchBox
