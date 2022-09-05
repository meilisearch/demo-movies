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

  @media (min-width: ${get('breakpoints.desktop')}) {
    top: 28px;
    right: 30px;
  }
`

const Content = styled.div`
  overflow: auto;
  width: 100%;
  height: 100%;
`

const MovieModalContent = ({ dialog, hit }) => (
  <DialogBackdrop {...dialog}>
    <DialogContent
      {...dialog}
      tabIndex={0}
      aria-label={hit?.title || 'Movie infos'}
    >
      <Close rounded onClick={() => dialog.hide()}>
        <Cross width={15} />
      </Close>
      {hit && (
        <Content>
          <MovieContent hit={hit} />
        </Content>
      )}
    </DialogContent>
  </DialogBackdrop>
)

export default MovieModalContent
