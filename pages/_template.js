import React from 'react'

import '../static/css/reset.css'
import '../static/css/base.css'
import '../static/css/typography.css'

export default function Template ({children}) {
  return (
    <div className='wrapper'>
      {children}
    </div>
  )
}