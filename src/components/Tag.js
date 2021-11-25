import React from 'react'
import styled from 'styled-components'
import Typography from 'components/Typography'

const Wrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 4px 10px;
  background-color: var(--tag-bg-color);
  border-width: 2px;
  border-style: solid;
  border-color: var(--tag-border-color);
  border-radius: 40px;
  color: var(--tag-text-color);
  transition: background-color 300ms, border-color 300ms;
`

const TagName = styled(Typography)`
  white-space: nowrap;
`

const Tag = ({ tag, ...props }) => {
  return (
    <Wrapper {...props}>
      <TagName variant="typo2">{tag}</TagName>
    </Wrapper>
  )
}

export default Tag
