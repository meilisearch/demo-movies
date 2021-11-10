import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Checkbox } from 'reakit/Checkbox'
import { Moon, Sun } from 'components/icons'

const Label = styled.label`
  width: 52px;
  height: 34px;
  border-radius: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  position: relative;
  border-width: 2px;
  border-style: solid;
  border-color: var(--300-500);
  background-color: var(--toggle-background);
  transition: border-color 300ms, background-color 300ms;
  svg {
    color: var(--koromiko);
  }
  &: hover {
    cursor: pointer;
  }
`

const Input = styled(Checkbox)`
  width: 0;
  height: 0;
  margin: 0;
  border-radius: 60px;
  position: absolute;
  transform: translate(18px);
  transition: transform 300ms;
  &[aria-checked='false'] {
    transform: translate(0px);
  }
  &:before {
    content: '';
    position: absolute;
    top: -15px;
    left: 0;
    right: 0;
    bottom: 0;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background-color: var(--100-300);
    transition: background-color 300ms;
  }
  &:focus {
    outline: none;
    &:before {
      box-shadow: 0px 0px 8px var(--100-300);
      transition: background-color 300ms;
    }
  }
  &: hover {
    cursor: pointer;
  }
  -moz-appearance: initial;
`

const Span = styled.span`
  height: 100%;
  width: auto;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
  transition: opacity 300ms;
`

const Toggle = ({ onChange = () => {}, ...props }) => {
  const [currentTheme, setCurrentTheme] = React.useState()
  const [checked, setChecked] = React.useState(currentTheme === 'dark')

  React.useEffect(() => {
    setCurrentTheme(localStorage.getItem('theme') || 'dark')
  }, [currentTheme, setCurrentTheme])

  const getNextTheme = () => (currentTheme === 'dark' ? 'light' : 'dark')

  return (
    <Label {...props}>
      <Input
        checked={checked}
        onChange={() => {
          setCurrentTheme(getNextTheme())
          onChange(getNextTheme())
          setChecked(!checked)
        }}
        aria-label="color-theme"
      />
      <Span checked={checked} style={{ opacity: checked ? '1' : '0' }}>
        <Moon width={12} style={{ marginLeft: 4 }} />
      </Span>
      <Span checked={!checked} style={{ opacity: checked ? '0' : '1' }}>
        <Sun width={13} style={{ marginRight: 4 }} />
      </Span>
    </Label>
  )
}

Toggle.propTypes = {
  /**
   * Function to execute on toggle
   */
  onChange: PropTypes.func,
}

Toggle.defaultProps = {
  onChange: () => {},
}

export default Toggle
