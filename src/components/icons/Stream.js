import * as React from 'react';

function SvgStream({ title, titleId, ...props }) {
  return (
    <svg
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        d="M15.016 11.523l-4.463-3.72a.6.6 0 00-.984.461v7.438a.6.6 0 00.984.461l4.463-3.719a.6.6 0 000-.921z"
        fill="currentColor"
      />
      <circle
        cx={11.569}
        cy={11.983}
        r={10}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgStream;
