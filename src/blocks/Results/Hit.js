import React from 'react'
import styled from 'styled-components'
import Card from 'components/Card'
import IconButton from 'components/IconButton'
import { useDialogState } from 'reakit/Dialog'
import {
  DialogDisclosure,
  DialogBackdrop,
  DialogContent,
} from 'components/Dialog'
import { Cross } from 'components/icons'
import get from 'utils/get'
import { DesktopLayout, MobileLayout } from 'blocks/MovieLayout'

const Disclosure = styled(DialogDisclosure)`
  transform: scale(1);
  &:hover,
  &:focus {
    transform: scale(1.05);
  }
  transition: transform 300ms;
`

const Close = styled(IconButton)`
  position: absolute;
  top: 27px;
  right: 21px;

  @media (min-width: ${get('breakpoints.desktop')}) {
    top: 28px;
    right: 30px;
  }
`

const MovieContent = ({ hit }) => {
  const [mobile, setMobile] = React.useState(undefined)
  const Layout = React.useMemo(
    () => (mobile ? MobileLayout : DesktopLayout),
    [mobile]
  )
  React.useEffect(() => {
    const updateMobile = () => {
      setMobile(window.innerWidth < 1024 ? true : false)
    }

    updateMobile()
    window.addEventListener('resize', updateMobile)
    return () => {
      window.removeEventListener('resize', updateMobile)
    }
  }, [])

  return typeof mobile !== 'undefined' ? <Layout hit={hit} /> : null
}

const Hit = ({ hit, ...props }) => {
  const dialog = useDialogState({ animated: true })
  return (
    <div {...props}>
      <Disclosure {...dialog}>
        <Card {...hit} />
      </Disclosure>
      <DialogBackdrop {...dialog}>
        <DialogContent {...dialog} tabIndex={0} aria-label={hit.title}>
          <Close rounded onClick={() => dialog.hide()}>
            <Cross width={15} />
          </Close>
          <MovieContent hit={hit} />
        </DialogContent>
      </DialogBackdrop>
    </div>
  )
}

export default Hit
