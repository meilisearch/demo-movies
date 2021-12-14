import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const RedLink = styled.a`
  border: 1px solid var(--deep-blush);
  height: 50px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0 28px;
  color: var(--deep-blush);
  border-radius: 40px;
`

const LinkButton = ({ href, ...props }) => {
  return (
    <Link href={href} passHref>
      <RedLink {...props} />
    </Link>
  )
}

export default LinkButton
