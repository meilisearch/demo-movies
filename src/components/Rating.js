import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Star } from 'components/icons'

const StarsContainer = styled.div`
  > * + * {
    margin-left: 5px;
  }
`

const StarComponent = styled(Star)`
  width: 11px;
  color: var(--japonica);
  opacity: ${p => (p.$active ? '100%' : '40%')};
`

const Rating = ({ rating, ...props }) => {
  return (
    <StarsContainer {...props}>
      {[...Array(5)].map((e, i) => (
        <StarComponent key={i} $active={i < Math.round(rating)} />
      ))}
    </StarsContainer>
  )
}

Rating.propTypes = {
  /**
   * Note given
   */
  rating: PropTypes.number,
}

Rating.defaultProps = {
  rating: 0,
}

export default Rating
