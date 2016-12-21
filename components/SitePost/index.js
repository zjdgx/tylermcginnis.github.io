import React from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import './style.css'
import '../../static/css/highlight.css'
import PostFooter from './PostFooter'

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
          <div className='postmetadata'>
            <span className='updated'>{moment(date).format('MMM D YYYY')}</span>
          </div>
          <h1>{title}</h1>
          <div className='blog-body' dangerouslySetInnerHTML={{__html: body}} />
        </div>
        <PostFooter />
      </div>
    </div>
  )
}
