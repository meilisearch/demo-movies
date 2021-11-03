import * as React from 'react';

function SvgStar({ title, titleId, ...props }) {
  return (
    <svg
      viewBox="0 0 12 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        d="M6.242.183l1.12 3.628a.246.246 0 00.232.178h3.65c.244 0 .354.333.146.486L8.44 6.724a.263.263 0 00-.088.287l1.13 3.628c.074.244-.195.449-.39.295L6.14 8.698a.236.236 0 00-.287 0l-2.95 2.249c-.196.154-.478-.051-.392-.295l1.13-3.629a.263.263 0 00-.088-.286L.604 4.488c-.196-.153-.098-.487.147-.487H4.4c.106 0 .2-.071.232-.177L5.753.183a.255.255 0 01.489 0z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SvgStar;
