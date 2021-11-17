import styled, { css } from 'styled-components'
import { DialogBackdrop as ReakitDialogBackdrop } from 'reakit/Dialog'

const Backdrop = styled.div`
  transition: opacity 300ms;
  overflow: auto;
  position: fixed;
  inset: 0;
  background-color: var(--dialog-backdrop);
  z-index: 50;

  ${p =>
    p.$animated &&
    css`
      opacity: 0;
      &[data-enter] {
        opacity: 1;
      }
    `};
`

const DialogBackdrop = props => (
  <ReakitDialogBackdrop as={Backdrop} $animated={props.animated} {...props} />
)

export default DialogBackdrop
