import styled from 'styled-components'
import PropTypes from 'prop-types'
import get from 'utils/get'
import Image from 'next/image'

const Wrapper = styled.div`
  position: relative;
  border-radius: ${get('spacing.2')};
  overflow: hidden;
  aspect-ratio: 150/225;
`

const Poster = ({ src = '', alt = '', ...props }) => (
  <Wrapper {...props}>
    <Image src={src} alt={alt} layout={'fill'} objectFit="cover" />
  </Wrapper>
)

Poster.propTypes = {
  /**
   * Image to display
   */
  src: PropTypes.string.isRequired,
  /**
   * Alternative text for the image
   */
  alt: PropTypes.string.isRequired,
}

Poster.defaultProps = {
  src: null,
  alt: null,
}

export default Poster
