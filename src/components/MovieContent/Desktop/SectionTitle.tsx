import clsx from 'clsx'
import Typography from '~/components/Typography'

export default function SectionTitle({ children, className }) {
  return (
    <Typography
      as="h2"
      variant="typo3"
      className={clsx('uppercase', className)}
      style={{ color: 'var(--cast-section-title-desktop)' }}
    >
      {children}
    </Typography>
  )
}
