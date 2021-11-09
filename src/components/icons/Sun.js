import * as React from 'react';

function SvgSun({ title, titleId, ...props }) {
  return (
    <svg
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <circle cx={7.608} cy={7.204} r={6.615} fill="currentColor" />
    </svg>
  );
}

export default SvgSun;
