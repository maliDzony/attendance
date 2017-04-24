import React from 'react'
import PropTypes from 'prop-types'
import { mapIdsToNames } from '../helpers/mapIdsToNames'

export default function Preview (props) {
  const { present, late, absent } = props
  return (
    <div>
      <p>Present: {mapIdsToNames(present)}</p>
      <p>Late: {mapIdsToNames(late)}</p>
      <p>Absent: {mapIdsToNames(absent)}</p>
    </div>
  )
}

Preview.propTypes = {
  present: PropTypes.array,
  late: PropTypes.array,
  absent: PropTypes.array
}
