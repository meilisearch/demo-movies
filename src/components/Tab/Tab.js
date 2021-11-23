import styled, { css } from 'styled-components'
import { Tab as ReakitTab } from 'reakit/Tab'

const StyledTab = styled(ReakitTab)`
  background-color: transparent;
  border: 0;
  color: var(--tab-inactive-color);
  transition: color 300ms;
  position: relative;
  padding-bottom: 12px;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    top: 80%;
    left: 50%;
    border-radius: 4px;
    transform: translate(-50%);
    height: 2px;
    width: 40%;
    background-color: transparent;
    transition: background-color 300ms;
  }

  ${p =>
    p.$selected &&
    css`
      color: var(--tab-active-color);

      &:after {
        background-color: white;
      }
    `}
`

const Tab = props => (
  <StyledTab $selected={props.currentId === props.id} {...props} />
)

export default Tab
