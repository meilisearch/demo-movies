import * as React from 'react';

function SvgMoon({ title, titleId, ...props }) {
  return (
    <svg
      viewBox="0 0 10 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        d="M8.622 10.835a6.055 6.055 0 01.257-9.447.346.346 0 00-.052-.61A6.054 6.054 0 108.9 11.686a.35.35 0 00.047-.6 4.357 4.357 0 01-.325-.251z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SvgMoon;
