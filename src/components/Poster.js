import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import get from 'utils/get'

const Poster = styled.img`
  border-radius: ${get('spacing.2')};
  object-fit: cover;
  width: 111px;
  height: 165px;
  @media (min-width: ${get('breakpoints.desktop')}) {
    width: 150px;
    height: 225px;
  }

  ${p =>
    p.$size === 'big' &&
    css`
      width: 172px;
      height: 246px;
      @media (min-width: ${get('breakpoints.desktop')}) {
        width: 240px;
        height: 360px;
      }
    `};
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
  /**
   * Size of the Poster
   */
  $size: PropTypes.oneOf(['medium', 'big']),
}

Poster.defaultProps = {
  src: null,
  alt: null,
  $size: 'medium',
}

export default Poster
