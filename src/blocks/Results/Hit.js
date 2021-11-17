import React from 'react'
import styled from 'styled-components'
import Card from 'components/Card'
import Typography from 'components/Typography'
import { useDialogState } from 'reakit/Dialog'
import {
  DialogDisclosure,
  DialogBackdrop,
  DialogContent,
} from 'components/Dialog'

const Disclosure = styled(DialogDisclosure)`
  transform: scale(1);
  &:hover,
  &:focus {
    transform: scale(1.05);
  }
  transition: transform 300ms;
`

const Hit = ({ hit, ...props }) => {
  const dialog = useDialogState({ animated: true })
  return (
    <div {...props}>
      <Disclosure {...dialog}>
        <Card {...hit} />
      </Disclosure>
      <DialogBackdrop {...dialog}>
        <DialogContent {...dialog} aria-label="Welcome">
          <Typography>{`Where to watch ${hit.title}`}</Typography>
        </DialogContent>
      </DialogBackdrop>
    </div>
  )
}

export default Hit
