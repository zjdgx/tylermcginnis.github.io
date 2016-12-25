import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import SiteNav from '../SiteNav'
import SiteLinks from '../SiteLinks'
import './style.css'
import profilePic from '../../pages/tyler-mcginnis.jpg'

export default function SiteSidebar (props) {
  return (
    <div className='sidebar'>
      <div className='sidebar-inner'>
        <div className='blog-details'>
          <header>
            <Link
              style={{textDecoration: 'none', borderBottom: 'none', outline: 'none'}}
              to={ prefixLink('/') }>
                <img src={prefixLink(profilePic)} width='150' height='150' alt='Tyler McGinnis Avatar' />
            </Link>
            <h1>
              <Link
                style={{textDecoration: 'none', borderBottom: 'none', color: 'inherit'}}
                to={prefixLink('/')}>
                  {config.siteAuthor}
              </Link>
            </h1>
            <p>{config.siteDescr}</p>
          </header>
        </div>
        <div className='blog-options'>
          {/* add back when I have more pages <SiteNav {...props}/> */}
          <footer>
            <SiteLinks {...props}/>
          </footer>
        </div>
      </div>
    </div>
  )
}