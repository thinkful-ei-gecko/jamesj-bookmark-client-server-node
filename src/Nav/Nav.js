import React from 'react'
import { Link } from 'react-router-dom'
export default function Nav(props) {
  return (
    <nav className="Nav">
      <Link to="/">
        <button>Bookmark List</button>
      </Link>{' '}
      <Link to="/add-bookmark">
        <button>Add Bookmark</button>
      </Link>
    </nav>
  )
}
