import React, { useEffect, useContext, useRef } from 'react'
import styled from 'styled-components'
import { DialogBackdrop, DialogContent } from 'components/Dialog'
import { Cross } from 'components/icons'
import IconButton from 'components/IconButton'
import MovieContent from 'components/MovieContent'
import get from 'utils/get'
import { MovieContext } from '~/context/MovieContext'

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

const MovieModalContent = ({ dialog, hit }) => {
  const { currentMovie } = useContext(MovieContext)
  const contentRef = useRef(null)

  useEffect(() => {
    if (currentMovie && contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentMovie])

  return (
    <DialogBackdrop {...dialog}>
      <Close rounded onClick={() => dialog.hide()}>
        <Cross width={15} />
      </Close>
      <DialogContent
        {...dialog}
        ref={contentRef}
        tabIndex={0}
        aria-label={hit?.title || 'Movie infos'}
        data-cy="movie-detail"
      >
        {hit && dialog.visible && <MovieContent hit={hit} />}
      </DialogContent>
    </DialogBackdrop>
  )
}

export default React.memo(MovieModalContent)
