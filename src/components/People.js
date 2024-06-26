import React from 'react'
import styled from 'styled-components'
import Typography from './Typography'
import Image from 'next/image'
import get from 'utils/get'

const Text = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`
const PeopleName = styled(Typography)`
  font-weight: 700;
  color: var(--cast-people-name);
  word-break: break-word;
  @media (min-width: ${get('breakpoints.desktop')}) {
    word-break: initial;
  }
`
const CharacterName = styled(Typography)`
  display: none;
  margin-top: 5px;
  color: var(--cast-character-name);
  word-break: break-word;
  @media (min-width: ${get('breakpoints.desktop')}) {
    display: block;
    word-break: initial;
  }
`

const PlaceholderProfilePicture = styled.div`
  width: 100%;
  position: relative;
  height: 0;
  padding-bottom: 100%;
  border-radius: 50%;
  background-color: var(--people-placeholder);
`

const People = ({ people, ...props }) => {
  const { character = '', name = '', profile_path = '' } = people
  return (
    <div {...props} className="max-w-[100px]">
      {profile_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w185/${profile_path}`}
          alt={name}
          width={100}
          height={100}
          className="rounded-full h-[100px] w-[100px] object-cover"
        />
      ) : (
        <PlaceholderProfilePicture />
      )}

      <Text>
        <PeopleName variant="typo4">{name}</PeopleName>
        <CharacterName variant="typo4">{character}</CharacterName>
      </Text>
    </div>
  )
}

export default People
