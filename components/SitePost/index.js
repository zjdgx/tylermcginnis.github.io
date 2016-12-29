import React from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import './style.css'
import '../../static/css/highlight.css'
import AboutMe from './AboutMe'
import Helmet from 'react-helmet'
import SocialShare from './SocialShare'
import { config } from 'config'

export default function SitePost (props) {
  const { title, date, body, description, articleImage } = props.route.page.data
  const url = `https://tylermcginnis.com${props.route.page.path}`

  return (
    <div>
      <Helmet
        title={title}
        meta={[
          {name: "og:locale", content: config.locale},
          {name: "og:type", content: "article"},
          {name: "og:title", content: title},
          {name: "og:description", content: description || config.siteDescription},
          {name: "og:url", content: url},
          {name: "og:site_name", content: config.shareTitle},
          {name: "og:image", content: articleImage || config.avatar},
          {name: "twitter:card", content: "summary_large_image"},
          {name: "twitter:description", content: description || config.siteDescription},
          {name: "twitter:title", content: title},
          {name: "twitter:site", content: "@tylermcginnis33"},
          {name: "twitter:image", content: articleImage || config.avatar},
          {name: "twitter:creator", content: "@tylermcginnis33"},
          {name: "article:publisher", content: "https://www.facebook.com/tylermcginnis.dev"},
          {name: "article:section", content: "JavaScript"},
          {name: "article:published_time", content: date},
        ]}
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
