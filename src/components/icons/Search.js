import * as React from 'react';

function SvgSearch({ title, titleId, ...props }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.612 0C4.303 0 0 4.208 0 9.4c0 5.19 4.303 9.399 9.612 9.399 2.27 0 4.356-.77 6.001-2.058l3.124 3.048.083.07c.29.21.701.186.964-.072a.713.713 0 00-.002-1.023l-3.087-3.012A9.253 9.253 0 0019.223 9.4C19.223 4.21 14.92 0 9.612 0zm0 1.448c4.49 0 8.13 3.56 8.13 7.951 0 4.392-3.64 7.952-8.13 7.952-4.491 0-8.132-3.56-8.132-7.952 0-4.391 3.64-7.951 8.132-7.951z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SvgSearch;
