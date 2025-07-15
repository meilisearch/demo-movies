import styled from 'styled-components'
import get from 'utils/get'

const Container = styled.div`
  @media (min-width: ${get('breakpoints.desktop')}) {
    max-width: ${get('breakpoints.2xl')};
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
  }
`
export default Container
