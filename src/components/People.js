import React from 'react'
import styled from 'styled-components'
import Typography from './Typography'
import Image from 'next/image'
import get from 'utils/get'
import Favorite from './Favorite'

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

const ProfilePic = styled.div`
  position: relative;
`

const People = ({ people: person, ...props }) => {
  const { character = '', name = '', profile_path = '' } = person
  return (
    <div {...props}>
      {profile_path ? (
        <ProfilePic>
          <Image
            src={`https://image.tmdb.org/t/p/w185/${profile_path}`}
            alt={name}
            width={100}
            height={100}
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
          <div
            style={{
              zIndex: 2,
              position: 'absolute',
              top: 0,
              right: 0,
              width: '1.5em',
              height: '1.5em',
            }}
          >
            <Favorite type="crew" hit={person} />
          </div>
        </ProfilePic>
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
