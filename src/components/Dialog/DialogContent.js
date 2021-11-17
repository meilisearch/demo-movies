import styled, { css } from 'styled-components'
import { Dialog as ReakitDialog } from 'reakit/Dialog'
import get from 'utils/get'

const Content = styled.div`
  ${p =>
    p.$animated &&
    css`
      transition: opacity 300ms;
      opacity: 0;
      &[data-enter] {
        opacity: 1;
      }
    `};

  position: relative;
  width: 100%;
  height: 100%;
  inset: 0;
  background-color: var(--dialog-bg-color);
  z-index: 999;

  @media (min-width: ${get('breakpoints.desktop')}) {
    max-width: 1480px;
    width: 70%;
    height: auto;
    inset: 50% 50%;
    transform: translate(-50%, calc(-50% - 48px));
    border-radius: 12px;
  }
`

const DialogContent = props => (
  <ReakitDialog as={Content} $animated={props.animated} {...props} />
)

export default DialogContent
