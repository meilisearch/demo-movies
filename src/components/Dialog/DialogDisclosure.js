/* eslint-disable react/display-name */
import React from 'react'
import styled from 'styled-components'
import { DialogDisclosure as ReakitDialogDisclosure } from 'reakit/Dialog'

const Disclosure = styled.div`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
`

const DialogDisclosure = React.forwardRef((props, ref) => (
  <ReakitDialogDisclosure as={Disclosure} ref={ref} {...props} />
))

export default DialogDisclosure
