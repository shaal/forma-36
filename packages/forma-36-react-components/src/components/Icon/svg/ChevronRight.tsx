import * as React from 'react';

function SvgChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path d="M8.62623 18.7071C8.2357 18.3166 8.2357 17.6834 8.62623 17.2929L13.9191 12L8.62623 6.70711C8.2357 6.31658 8.2357 5.68342 8.62623 5.29289C9.01675 4.90237 9.64992 4.90237 10.0404 5.29289L16.0404 11.2929C16.431 11.6834 16.431 12.3166 16.0404 12.7071L10.0404 18.7071C9.64992 19.0976 9.01675 19.0976 8.62623 18.7071Z" />
    </svg>
  );
}

export default SvgChevronRight;
