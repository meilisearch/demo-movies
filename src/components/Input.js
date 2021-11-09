import React, { useRef } from 'react'
import styled from 'styled-components'
import { Search as BaseSearch, Cross } from 'components/icons'
import get from 'utils/get'

const InputField = styled.input`
  height: 48px;
  width: 100%;
  padding-left: 48px;
  padding-right: 8px;
  background-position: top 50% left 16px;
  border-color: var(--input-border);
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
  box-shadow: 0px 0px 64px rgba(0, 0, 0, 0.06);
  outline: none;
  color: var(----800-100);
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  background-color: var(--input-bg-color);
  transition: border-color 300ms, color 300ms, background-color 300ms;

  &:hover,
  &:focus {
    border-color: var(--input-border-focus);
  }

  ::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
`

const ClearButton = styled.div`
  svg {
    width: 11px;
    height: 11px;
  }
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
`

const Search = styled(BaseSearch)`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
`

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  @media (min-width: ${get('breakpoints.desktop')}) {
    max-width: 660px;
  }
  svg {
    color: var(--300-400);
    transition: color 300ms;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  @media (min-width: ${get('breakpoints.desktop')}) {
    justify-content: center;
    margin: 0 48px;
  }
`

const Input = ({ ref, clear, type, value, ...props }) => {
  const input = useRef(null)
  return (
    <Wrapper {...props}>
      <InputContainer ref={ref}>
        <Search width={20} />
        <InputField value={value} type={type} ref={input} />
        {type === 'search' && (
          <ClearButton
            aria-label="clear"
            onClick={() => {
              clear()
              input.current.focus()
            }}
            style={{ display: value ? 'block' : 'none' }}
          >
            <Cross />
          </ClearButton>
        )}
      </InputContainer>
    </Wrapper>
  )
}

export default Input
