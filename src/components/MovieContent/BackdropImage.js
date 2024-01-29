import styled from 'styled-components'
import get from 'utils/get'

const BackdropImage = styled.div`
  background: linear-gradient(
      to bottom,
      rgba(var(--movie-content-image-gradient), 0.5) 0%,
      rgba(var(--movie-content-image-gradient), 0.5) 35%,
      rgba(var(--movie-content-image-gradient), 1) 70%
    ),
    no-repeat center center url(${p => p.$image});

  @media (max-width: ${get('breakpoints.desktop')}) {
    background-size: cover;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding-bottom: 30px;
  }

  @media (min-width: ${get('breakpoints.desktop')}) {
    background-size: cover;
    padding: 246px 50px 0;
  }
`
export default BackdropImage
