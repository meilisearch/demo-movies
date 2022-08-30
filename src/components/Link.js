import React from 'react'
import styled from 'styled-components'
import NextLink from 'next/link'

const StyledLink = styled.a`
  color: inherit;
  transition: color 300ms;
  outline: none;
`

const Link = React.forwardRef(({ href, ...props }, ref) => (
  <NextLink href={href} passHref>
    <StyledLink ref={ref} {...props} />
  </NextLink>
))

Link.displayName = 'Link'

Link.propTypes = {}

Link.defaultProps = {}

export default Link
