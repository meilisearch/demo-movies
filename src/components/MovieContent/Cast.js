import React from 'react'
import People from 'components/People'
import clsx from 'clsx'

const Cast = ({ cast, ...props }) => (
  <div {...props} className={clsx('flex flex-wrap gap-6', props.className)}>
    {cast.map((people, index) => (
      <People
        key={`${people?.name}-${people?.character || index}`}
        people={people}
        data-cast={people?.name}
      />
    ))}
  </div>
)

export default Cast
