import React from 'react'
import { useDialogState } from 'reakit/Dialog'
import {
  DialogDisclosure,
  DialogBackdrop,
  DialogContent,
} from 'components/Dialog'

import Typography from 'components/Typography'

export default {
  title: 'Components/Dialog',
}

export const Animated = () => {
  const dialog = useDialogState({ animated: true })
  return (
    <>
      <DialogDisclosure {...dialog}>
        <Typography>Click me</Typography>
      </DialogDisclosure>
      <DialogBackdrop {...dialog}>
        <DialogContent {...dialog} aria-label="Welcome">
          <Typography>I’m the content !</Typography>
          <button onClick={dialog.hide}>
            <Typography>Close</Typography>
          </button>
        </DialogContent>
      </DialogBackdrop>
    </>
  )
}
