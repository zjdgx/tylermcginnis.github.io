import React from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import './style.css'
import '../../static/css/highlight.css'
import AboutMe from './AboutMe'

export default function SitePost (props) {
  const { title, date, body } = props.route.page.data
  return (
    <div>
      <Link className='gohome' to={ prefixLink('/') }>
        Back
      </Link>
      <AboutMe top={true} />
      <div className='blog-single'>
        <div className='text'>
          <h1>{title}</h1>
          <div className='date'>{moment(date).format('MMM D, YYYY')}</div>
          <div className='blog-body' dangerouslySetInnerHTML={{__html: body}} />
        </div>
        <AboutMe />
      </div>
    </div>
  )
}
