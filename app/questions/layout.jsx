import React from 'react'
import Header from '../dashboard/_components/Header'

function layout({children}) {
  return (
      <div>
          <Header />
          {children}
      
      </div>
  )
}

export default layout