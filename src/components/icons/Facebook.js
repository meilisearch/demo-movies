import * as React from 'react';

function SvgFacebook({ title, titleId, ...props }) {
  return (
    <svg
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.282 15.359C.282 6.876 7.16 0 15.641 0S31 6.876 31 15.359c0 8.482-6.877 15.358-15.36 15.358C7.16 30.717.283 23.841.283 15.36zm16.96 9.03v-8.356h2.306l.306-2.88h-2.612l.004-1.44c0-.751.071-1.154 1.15-1.154h1.442V7.68H17.53c-2.771 0-3.746 1.397-3.746 3.746v1.73h-1.728v2.879h1.727v8.355h3.458z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SvgFacebook;
