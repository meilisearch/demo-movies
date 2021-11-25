/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styled from 'styled-components'

const Link = styled.a`
  display: inline-block;
  color: var(--social-color);
  transition: color 300ms;
`

const IconLink = ({ link, ...props }) => {
  return <Link href={link} target="_blank" {...props} />
}

export default IconLink
