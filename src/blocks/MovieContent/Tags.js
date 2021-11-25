import styled from 'styled-components'
import Tag from 'components/Tag'
import get from 'utils/get'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  > div {
    margin-top: 14px;
    margin-right: 10px;
  }
  @media (min-width: ${get('breakpoints.desktop')}) {
    > div {
      margin-top: 10px;
    }
  }
`

const Tags = ({ tags, ...props }) => (
  <Wrapper {...props}>
    {tags?.map(tag => (
      <Tag key={tag} tag={tag} />
    ))}
  </Wrapper>
)

export default Tags
