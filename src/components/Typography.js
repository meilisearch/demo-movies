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
  h1: {
    tag: 'h1',
    style: css`
      font-family: Asap Condensed;
      font-style: normal;
      font-weight: 600;
      font-size: 35px;
      line-height: 35px;

      @media (min-width: ${get('breakpoints.desktop')}) {
        font-size: 65px;
        line-height: 58px;
      }
    `,
  },
  h2: {
    tag: 'h2',
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
    tag: 'h3',
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
  typo1: {
    tag: 'span',
    style: css`
      font-family: Barlow;
      font-weight: 500;
      font-size: 15px;
      line-height: 22px;
      letter-spacing: 1px;
    `,
  },
  typo2: {
    tag: 'span',
    style: css`
      font-family: Barlow;
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
    `,
  },
  typo3: {
    tag: 'span',
    style: css`
      font-family: Asap Condensed;
      font-style: normal;
      font-weight: 600;
      font-size: 27px;
      line-height: 36px;
      letter-spacing: 0.1px;
    `,
  },
  typo4: {
    tag: 'span',
    style: css`
      font-family: Barlow;
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 22px;
    `,
  },
  typo5: {
    tag: 'span',
    style: css`
      font-family: 'Barlow';
      font-weight: 500;
      font-size: 19px;
      line-height: 27px;
    `,
  },
  typo6: {
    tag: 'span',
    style: css`
      font-family: 'Barlow';
      font-size: 16px;
      line-height: 28px;
      letter-spacing: 0.52px;
    `,
  },
}

const StyledTypography = styled.span`
  transition: color 300ms;
  ${p => p.$variant.style};
`

const Typography = ({ variant = 'default', ...props }) => {
  const safeVariant = variants[variant] || variants.default
  const { tag = 'span', style = css`` } = safeVariant
  return (
    <StyledTypography
      as={tag}
      {...style}
      $variant={safeVariant}
      {...props}
      className={props.className}
    />
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
    'h1',
    'h2',
    'h3',
    'typo1',
    'typo2',
    'typo3',
    'typo4',
    'typo5',
    'typo6',
  ]),
}

Typography.defaultProps = {
  variant: 'default',
}

export default Typography
