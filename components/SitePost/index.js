import React from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import './style.css'
import '../../static/css/highlight.css'

export default function SitePost ({route}) {
  const { title, date, body } = route.page.data
  return (
    <div>
      <div>
        <Link className='gohome' to={ prefixLink('/') }>
          Back
        </Link>
      </div>
      <div className='blog-single'>
        <div className='text'>
          <div className='date-published'>
            {moment(date).format('D MMM YYYY')}
          </div>
          <h1>{title}</h1>
          <div className='blog-body' dangerouslySetInnerHTML={{__html: body}} />
        </div>
        <div className='footer'>
          <a style={{textDecoration: 'underline'}} href={config.siteTwitterUrl}>{config.siteAuthor}</a>
        </div>
      </div>
    </div>
  )
}
