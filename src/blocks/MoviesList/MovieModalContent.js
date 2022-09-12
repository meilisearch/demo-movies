import React from 'react'
import styled from 'styled-components'
import { DialogBackdrop, DialogContent } from 'components/Dialog'
import { Cross } from 'components/icons'
import IconButton from 'components/IconButton'
import MovieContent from 'blocks/MovieContent'
import get from 'utils/get'

const Close = styled(IconButton)`
  position: absolute;
  top: 27px;
  right: 21px;
  z-index: 90;
  @media (min-width: ${get('breakpoints.desktop')}) {
    top: 28px;
    right: 30px;
  }
`

const MovieModalContent = ({ dialog, hit }) => (
  <DialogBackdrop {...dialog}>
    <Close rounded onClick={() => dialog.hide()}>
      <Cross width={15} />
    </Close>
    <DialogContent
      {...dialog}
      tabIndex={0}
      aria-label={hit?.title || 'Movie infos'}
      data-cy="movie-detail"
    >
      {hit && <MovieContent hit={hit} />}
    </DialogContent>
  </DialogBackdrop>
)

export default MovieModalContent
