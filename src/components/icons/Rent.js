import * as React from 'react';

function SvgRent({ title, titleId, ...props }) {
  return (
    <svg
      viewBox="0 0 22 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        d="M8.451 19.983h5.294M11.098 19.983v-3.705M1.569 1.983h19.059v13.765H1.569z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.58 8.593l-3.699-2.96a.5.5 0 00-.812.39v5.92a.5.5 0 00.812.39l3.7-2.96a.5.5 0 000-.78z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SvgRent;
