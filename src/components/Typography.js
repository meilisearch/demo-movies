import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import get from 'utils/get'

const variants = {
  default: {
    tag: 'span',
    style: css``,
  },
  cardTitle: {
    tag: 'span',
    style: css`
      font-family: Barlow;
      font-weight: 500;
      font-size: 13px;
      line-height: 22px;
      @media (min-width: ${get('breakpoints.desktop')}) {
        font-size: 17px;
      }
    `,
  },
  subtitle: {
    tag: 'span',
    style: css`
      font-family: Barlow;
      font-weight: 500;
      font-size: 11px;
      line-height: 22px;
      @media (min-width: ${get('breakpoints.desktop')}) {
        font-size: 15px;
      }
    `,
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
  variant: PropTypes.oneOf(['default', 'cardTitle', 'subtitle']),
}

Typography.defaultProps = {
  variant: 'default',
}

export default Typography
