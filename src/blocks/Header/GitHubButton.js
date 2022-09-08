import React from 'react'
import styled from 'styled-components'
import Link from 'components/Link'
import Image from 'next/image'
import Typography from 'components/Typography'

const GitHubLink = styled(Link)`
  color: var(--gray-300);
  display: flex;
  align-items: center;
`

const GitHubButton = props => {
  return (
    <GitHubLink
      href="https://github.com/meilisearch/meilisearch"
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      <Image
        src="/images/github.svg"
        alt="GitHub logo"
        layout="fixed"
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
