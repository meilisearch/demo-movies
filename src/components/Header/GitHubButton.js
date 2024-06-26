import React from 'react'
import styled from 'styled-components'
import Link from 'components/Link'
import Image from 'next/image'
import Typography from 'components/Typography'
import { REPOSITORY_URL } from '~/lib/constants'

const GitHubLink = styled(Link)`
  color: var(--gray-300);
  display: flex;
  align-items: center;
`

const GitHubButton = props => {
  return (
    <GitHubLink
      href={REPOSITORY_URL}
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      <Image
        src="/images/github.svg"
        alt="GitHub logo"
        width={16}
        height={16}
      />
      <Typography variant="subtitle" style={{ marginLeft: 6 }}>
        GitHub
      </Typography>
    </GitHubLink>
  )
}

export default GitHubButton
