import styled from 'styled-components'
import IconLink from 'components/IconLink'
import { Facebook, Imdb, Instagram, Twitter } from 'components/icons'

const Wrapper = styled.div`
  margin-top: 22px;
  > a {
    margin-right: 12px;
  }
`

const Socials = ({ socials }) => {
  const { facebook_id, imdb_id, instagram_id, twitter_id } = socials
  return (
    <Wrapper style={{ marginTop: 22 }}>
      {imdb_id && (
        <IconLink
          link={`https://www.imdb.com/title/${imdb_id}`}
          data-socials="imdb"
        >
          <Imdb height={30} />
        </IconLink>
      )}
      {instagram_id && (
        <IconLink
          link={`https://www.instagram.com/${instagram_id}`}
          data-socials="instagram"
        >
          <Instagram height={30} />
        </IconLink>
      )}
      {twitter_id && (
        <IconLink
          link={`https://twitter.com/${twitter_id}`}
          data-socials="twitter"
        >
          <Twitter height={30} />
        </IconLink>
      )}
      {facebook_id && (
        <IconLink
          link={`https://www.facebook.com/${facebook_id}`}
          data-socials="facebook"
        >
          <Facebook height={30} />
        </IconLink>
      )}
    </Wrapper>
  )
}
export default Socials
