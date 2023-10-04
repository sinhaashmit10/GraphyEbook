import React from 'react'
import SideView from './SideView'

export default function Right() {
  const enterTitle = "E-book Title"; // Replace with the actual title or fetch it from your data source

  return (
    <div>
        <div className="right">
            <SideView enterTitle={enterTitle} /> {/* Pass enterTitle as a prop */}
        </div>
    </div>
  )
}
