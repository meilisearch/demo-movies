import styled from 'styled-components'
import get from '~/utils/get'
import Container from './Container'

const Wrapper = styled(Container)`
  background-color: var(--results-bg);
  transition: background-color 300ms;
  box-shadow: 0px 0px 64px rgba(0, 0, 0, 0.06);
  margin: 16px -10px 0;
  padding: 18px 10px;
  @media (min-width: ${get('breakpoints.desktop')}) {
    border-radius: 12px;
    padding: 40px 80px;
    margin: 0 auto;
  }
`

export default function ResultsContainer({ children }) {
  return <Wrapper as="section">{children}</Wrapper>
}
