import React from 'react'
import styled from 'styled-components'
import MobileSwitcher from './MobileSwitcher'
import DesktopSwitcher from './DesktopSwitcher'

const Container = styled.div`
  margin-right: 21px;
`

const LanguageSwitcher = () => {
  return (
    <Container>
      <MobileSwitcher />
      <DesktopSwitcher />
    </Container>
  )
}

export default LanguageSwitcher
