import React from 'react'
import styled from 'styled-components'
import { MessageSquare } from '~/components/icons'

const Button = styled.button`
  background: var(--color-primary, #2563eb);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.2s ease;
  white-space: nowrap;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    background: var(--color-primary-hover, #1d4ed8);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`

const AskAIButton = ({ onClick, ...props }) => {
  return (
    <Button onClick={onClick} {...props}>
      <MessageSquare width={14} height={14} />
      Ask AI
    </Button>
  )
}

export default AskAIButton