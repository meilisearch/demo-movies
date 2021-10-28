// import { createGlobalStyle } from 'styled-components'
// import colors from './colors'

// const GlobalStyle = createGlobalStyle`
//   html, body {
//     margin: 0;
//     &.dark-mode {
//       --color-background: ${colors.cinder};

//       // Colors

//       --text-color: ${colors.gray[100]};
//       --block: ${colors.red};
//     }
//     &.light-mode {
//       --color-background: ${colors.athensGray};
//       --text-color: ${colors.gray[500]};
//       --block: ${colors.blue};
//     }
//   }

//   body {
//     background-color: var(--color-background);
//     color: var(--text-color);
//     transition: background-color 300ms, color 300ms;
//   }
//   * {
//     font-family: 'Work Sans';
//     box-sizing: border-box;
//   }
//   a {
//     text-decoration: none;
//   }
// `

// export default GlobalStyle

const GlobalStyle = () => (
  <style jsx global>
    {`
      :root {
        --color-homepage-bg: #fff,
        --color-text: #000;
        --code: #f1f1f1;
        --color-blue: #0070f3;
        --color-grey: #eaeaea;
      }

      html,
      body {
        padding: 0;
        margin: 0;

        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

        transition: background 300ms;
        background: var(--color-homepage-bg);
        color: var(--color-text);
      }

      * {
        box-sizing: border-box;
      }
    `}
  </style>
)
export default GlobalStyle
