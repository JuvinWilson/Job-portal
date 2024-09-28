import React from 'react'
import { Link } from 'react-router-dom'

const Notfound = () => {
  return (
    <div>
        <h1> page Not Found</h1>
        <Link className='btn btn-success' to='/'>Go Back</Link>
    </div>
  )
}

export default Notfound