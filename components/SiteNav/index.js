import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import './style.css'

SiteNav.propTypes = {
  location: PropTypes.object,
}

export default function SiteNav ({location}) {
  return (
    <nav className='blog-nav'>
      <ul>
        <li>
          <Link to={ prefixLink('/')} activeClassName="current" onlyActiveOnIndex>
            Articles
          </Link>
        </li>
        <li>
          <Link to={ prefixLink('/about/')} activeClassName="current">
            About me
          </Link>
        </li>
        <li>
          <Link to={ prefixLink('/contact/')} activeClassName="current">
            Contact me
          </Link>
        </li>
      </ul>
    </nav>
  )
}