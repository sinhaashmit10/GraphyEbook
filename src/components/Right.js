import React from 'react'
import SideView from './SideView'

export default function Right() {
  const enterTitle = "E-book Title"; 

  return (
    <div>
        <div className="right">
            <SideView enterTitle={enterTitle} /> 
        </div>
    </div>
  )
}