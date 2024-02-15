import RCSlider from 'rc-slider'
import 'rc-slider/assets/index.css'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 0 5px;
`

const Slider = ({ min, max, step, defaultValue, onChangeComplete }) => (
  <Wrapper>
    <RCSlider
      min={min}
      max={max}
      step={step}
      defaultValue={defaultValue}
      onChangeComplete={onChangeComplete}
      styles={{
        track: { backgroundColor: 'var(--800-100)' },
        rail: { backgroundColor: 'var(--100-300)' },
        handle: {
          borderColor: 'var(--800-100)',
          backgroundColor: 'var(--800-100)',
          opacity: 1,
          boxShadow: '0 0 0 0px',
        },
      }}
    />
  </Wrapper>
)

export default Slider
