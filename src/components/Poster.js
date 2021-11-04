import styled from 'styled-components'
import PropTypes from 'prop-types'
import get from 'utils/get'

const Poster = styled.img`
  border-radius: ${get('spacing.2')};
  object-fit: cover;
`

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
