import styled from 'styled-components'
import { DialogDisclosure as ReakitDialogDisclosure } from 'reakit/Dialog'

const Disclosure = styled.div`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
`

const DialogDisclosure = props => (
  <ReakitDialogDisclosure as={Disclosure} {...props} />
)

export default DialogDisclosure
