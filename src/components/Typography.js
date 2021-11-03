import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const variants = {
  default: {
    tag: 'span',
    style: css``,
  },
}

const StyledTypography = styled.span`
  margin: 0;
  ${p => p.$variant.style};
`

const Typography = ({ variant = 'default', ...props }) => {
  const safeVariant = variants[variant] || variants.default
  const { tag = 'span', style = css`` } = safeVariant
  return (
    <StyledTypography as={tag} {...style} $variant={safeVariant} {...props} />
  )
}

Typography.propTypes = {
  /**
   * The variant name, used to display Typography with different styles
   */
  variant: PropTypes.oneOf(['default']),
}

Typography.defaultProps = {
  variant: 'default',
}

export default Typography
