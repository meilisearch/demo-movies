import clsx from 'clsx'
import Typography from '~/components/Typography'

export default function SectionHeading({ children, className }) {
  return (
    <Typography variant="h2" className={clsx('text-left', className)}>
      {children}
    </Typography>
  )
}
