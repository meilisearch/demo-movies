import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Star } from 'components/icons'
import get from 'utils/get'

const StarsContainer = styled.div`
  display: flex;
  align-items: center;
  > * + * {
    margin-left: 4px;
    @media (min-width: ${get('breakpoints.desktop')}) {
      margin-left: 5px;
    }
  }
`

const StarComponent = styled(Star)`
  width: 8px;
  color: var(--japonica);
  opacity: ${p => (p.$active ? '100%' : '40%')};
  @media (min-width: ${get('breakpoints.desktop')}) {
    width: 11px;
  }
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
