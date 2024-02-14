import styled from 'styled-components'
import PropTypes from 'prop-types'
import Image from "next/legacy/image"

const Wrapper = styled.div`
  background-color: var(--gray-600);
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 150/225;
`

const Poster = ({ src = '', alt = '', ...props }) => (
  <Wrapper {...props}>
    <Image
      src={src}
      alt={alt}
      layout="responsive"
      width={150}
      height={225}
      quality={10}
    />
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
