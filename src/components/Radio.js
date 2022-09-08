import React from 'react'
import styled from 'styled-components'
import { Radio as ReakitRadio } from 'reakit/Radio'
import Typography from 'components/Typography'

const HiddenRadio = styled(ReakitRadio)`
  opacity: 0;
  height: 0;
  width: 0;
  display: block;
`

const Label = styled.label`
  display: block;
`

const CardRadio = styled.div`
  cursor: pointer;
  border: 1px solid transparent;
  color: var(-gray-200);
  height: 40px;
  min-width: 196px;
  border-radius: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
  transition: border-color 300ms, background-color 300ms;
  border-width: 1px;
  border-style: solid;
  border-color: var(--settings-mobile-language-switcher-checked-border);

  &:hover,
  &:focus-within,
  ${HiddenRadio}:focus + & {
    border-color: var(--settings-mobile-radio-hover);
  }
  ${HiddenRadio}[aria-checked="true"] + & {
    background-color: var(--settings-mobile-language-switcher-checked-bg);
  }
  ${HiddenRadio}[aria-checked="true"]:hover + &,
  ${HiddenRadio}[aria-checked="true"]:focus + & {
    border-color: var(--settings-mobile-language-switcher-checked-border);
    background-color: var(--settings-mobile-language-switcher-checked-bg);
    cursor: default;
  }
`

const Icon = styled.img`
  width: 32px;
  height: 22px;
  border-radius: 4px;
  margin-right: 12px;
  border: 1px solid var(--gray-300);
`

const Radio = ({ icon, title, radioState, value, onChange, ...props }) => (
  <Label {...props}>
    <HiddenRadio {...radioState} onChange={onChange} value={value} />
    <CardRadio>
      {icon && <Icon src={icon} alt={title} />}
      <Typography>{title}</Typography>
    </CardRadio>
  </Label>
)

export default Radio
