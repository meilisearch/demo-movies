import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Star } from 'components/icons'
import get from 'utils/get'
import Typography from 'components/Typography'

const StarsContainer = styled.div`
  display: flex;
  align-items: center;
  color: var(--japonica);
  > * + * {
    margin-left: 4px;
    @media (min-width: ${get('breakpoints.desktop')}) {
      margin-left: 5px;
    }
  }
`

const StarComponent = styled(Star)`
  width: ${p => (p.$size === 'big' ? '14px' : '8px')};
  opacity: ${p => (p.$active ? '100%' : '40%')};
  @media (min-width: ${get('breakpoints.desktop')}) {
    width: 11px;
  }
`

const Text = styled(Typography)`
  margin-left: 8px;
`

const Rating = ({ rating, withText, size = 'normal', ...props }) => (
  <StarsContainer {...props} $size={size}>
    {[...Array(5)].map((e, i) => (
      <StarComponent key={i} $active={i < Math.round(rating)} $size={size} />
    ))}
    {withText && <Text variant="rating">{rating}</Text>}
  </StarsContainer>
)

Rating.propTypes = {
  /**
   * Note given
   */
  rating: PropTypes.number,
  /**
   * Wether or not it should display the notation next to the stars
   */
  withText: PropTypes.bool,
  /**
   * Size of the stars
   */
  size: PropTypes.oneOf(['normal', 'big']),
}

Rating.defaultProps = {
  rating: 0,
  withText: false,
  size: 'normal',
}

export default Rating
