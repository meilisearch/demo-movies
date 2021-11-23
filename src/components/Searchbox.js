import React from 'react'
import styled from 'styled-components'
import { SearchBox as IsSearchbox } from 'react-instantsearch-dom'
import { Search, Cross } from 'components/icons'
import get from 'utils/get'

const StyledSearchbox = styled(IsSearchbox)`
  width: 100%;
  @media (min-width: ${get('breakpoints.desktop')}) {
    max-width: 660px;
  }
  svg {
    color: var(--300-400);
    transition: color 300ms;
  }
  form {
    position: relative;
    flex: 1;
    height: 48px;
    width: 100%;
    box-shadow: 0px 0px 64px rgba(0, 0, 0, 0.06);
  }
  button {
    padding: 0;
    border: none;
    background-color: transparent;
    outline: none;
    &:focus {
      filter: drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.4));
    }
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  button[type='submit'] {
    left: 16px;
  }
  input {
    width: 100%;
    height: 100%;
    padding-left: 48px;
    padding-right: 8px;
    outline: none;
    border-color: var(--input-border);
    border-width: 1px;
    border-style: solid;
    border-radius: 8px;
    background-color: var(--input-bg-color);
    color: var(----800-100);
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    transition: border-color 300ms, color 300ms, background-color 300ms;

    &:hover,
    &:focus {
      border-color: var(--input-border-focus);
    }
  }
  button[type='reset'] {
    right: 16px;
    opacity: 1;
    cursor: pointer;
    &[hidden] {
      opacity: 0;
    }
  }
  input[type='search' i]::-webkit-search-cancel-button {
    display: none;
  }
`

const Searchbox = props => {
  React.useEffect(() => {
    const submitButton = document.getElementsByClassName(
      'ais-SearchBox-submit'
    )[0]
    submitButton.setAttribute('tabindex', -1)
  }, [])
  return (
    <StyledSearchbox
      autoFocus
      submit={<Search width={20} />}
      reset={<Cross width={11} />}
      translations={{
        submitTitle: null,
        resetTitle: null,
        placeholder: null,
      }}
      {...props}
    />
  )
}

export default Searchbox
