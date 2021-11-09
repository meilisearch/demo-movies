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
  h2: {
    tag: 'span',
    style: css`
      font-family: Asap Condensed;
      font-weight: 600;
      font-size: 42px;
      line-height: 43px;
      letter-spacing: 0.1px;
      text-transform: uppercase;
    `,
  },
  h3: {
    tag: 'span',
    style: css`
      font-family: Asap Condensed;
      font-weight: 600;
      font-size: 32px;
      line-height: 43px;
      letter-spacing: 0.1px;
      text-transform: uppercase;
      @media (min-width: ${get('breakpoints.desktop')}) {
        font-size: 27px;
        line-height: 36px;
      }
    `,
  },
  nbResults: {
    tag: 'span',
    style: css`
      font-family: Barlow;
      font-weight: 500;
      font-size: 15px;
      line-height: 22px;
      letter-spacing: 1px;
      text-transform: uppercase;
    `,
  },
}

const StyledTypography = styled.span`
  margin: 0;
  transition: color 300ms;
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
  variant: PropTypes.oneOf([
    'default',
    'cardTitle',
    'subtitle',
    'h2',
    'h3',
    'nbResults',
  ]),
}

Typography.defaultProps = {
  variant: 'default',
}

export default Typography
