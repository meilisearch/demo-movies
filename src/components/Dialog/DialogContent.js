import styled, { css } from 'styled-components'
import { Dialog as ReakitDialog } from 'reakit/Dialog'
import get from 'utils/get'

const Dialog = styled(ReakitDialog)`
  ${p =>
    p.$animated &&
    css`
      transition: opacity 300ms;
      opacity: 0;
      &[data-enter] {
        opacity: 1;
      }
    `};

  outline: none;
  position: fixed;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  background-color: var(--dialog-bg-color);
  color: var(--movie-content-text-color);
  z-index: 60;
  overflow: auto;

  @media (min-width: ${get('breakpoints.desktop')}) {
    max-width: 1480px;
    width: 90%;
    height: 90%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 12px;
  }
`

const DialogContent = props => <Dialog $animated={props.animated} {...props} />

export default DialogContent
