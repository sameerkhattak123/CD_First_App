import React, { useEffect } from 'react'

export default function Counter1({number}) {

    useEffect(()=>{
        console.log("Functionl Component Updating ")

        return () =>{
            console.log("Functional Component : Removed")
        }
    },[number])
  return (
    <div>

        <h1> {number}</h1>
    </div>
  )
}
