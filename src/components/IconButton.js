import React from 'react'
import styled, { css } from 'styled-components'
import { Button as ReakitButton } from 'reakit/Button'

const Button = styled(ReakitButton)`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  color: var(--icon-button-svg-color);
  transition: color 300ms;
  &:hover,
  &:focus {
    color: var(--icon-button-svg-focus-color);
  }
  svg {
    display: block;
  }

  ${p =>
    p.$rounded &&
    css`
      padding: 15px;
      border-radius: 50%;
      svg {
        color: white;
      }
      background-color: var(--icon-button-bg-color);
      transition: background-color 300ms;
      &:hover,
      &:focus {
        background-color: var(--icon-button-focus-bg-color);
      }
    `};
`

const IconButton = ({ rounded, ...props }) => {
  return <Button $rounded={rounded} {...props} />
}

export default IconButton
