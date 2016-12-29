import React from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import './style.css'
import '../../static/css/highlight.css'
import AboutMe from './AboutMe'
import Helmet from 'react-helmet'
import SocialShare from './SocialShare'

export default function SitePost (props) {
  const { title, date, body } = props.route.page.data
  const url = `https://tylermcginnis.com${props.route.page.path}`

  return (
    <div>
      <Helmet
        title={title}
        link={[{rel: "canonical", href: url}]} />
      <Link className='gohome' to={ prefixLink('/') }>
        Back
      </Link>
      <AboutMe top={true} />
      <div className='blog-single'>
        <div className='text'>
          <h1 className='blog-title'>{title}</h1>
          <div className='date'>{moment(date).format('MMM D, YYYY')}</div>
          <div className='blog-body' dangerouslySetInnerHTML={{__html: body}} />
        </div>
        <div style={{marginTop: 50}}>
          <SocialShare type='twitter' tweet={`"${title}" by @tylermcginnis33`} url={url} />
          <SocialShare type='facebook' url={url} />
        </div>
        <AboutMe />
      </div>
    </div>
  )
}
