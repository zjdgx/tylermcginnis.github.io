import React, { Component } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import { prefixLink } from 'gatsby-helpers'
import SiteSidebar from '../components/SiteSidebar'
import Helmet from 'react-helmet'
import { config } from 'config'

function strip (str) {
  return str.includes('<hide-from-preview>') === true
    ? str.split('</hide-from-preview>')[1].replace(/<\/?[^>]+(>|$)/g, "")
    : str.replace(/<\/?[^>]+(>|$)/g, "")
}

SiteIndex.propTypes = {
  route: React.PropTypes.object
}

export default function SiteIndex (props) {
  return (
    <div>
      <Helmet
        title={config.siteTitle}
        meta={[
          {name: "description", content: config.siteDescription},
          {name: "keywords", content: "react, reactjs, javascript, front end engineering"},
          {name: "og:locale", content: config.locale},
          {name: "og:type", content: "website"},
          {name: "og:title", content: config.shareTitle},
          {name: "og:description", content: config.siteDescription},
          {name: "og:url", content: config.canonicalURL},
          {name: "og:site_name", content: config.shareTitle},
          {name: "og:image", content: config.avatar},
          {name: "twitter:card", content: "summary_large_image"},
          {name: "twitter:description", content: config.siteDescription},
          {name: "twitter:title", content: config.shareTitle},
          {name: "twitter:site", content: "@tylermcginnis33"},
          {name: "twitter:image", content: config.avatar},
        ]}
        link={[{rel: "canonical", href: config.canonicalURL}]} />
      <SiteSidebar {...props}/>
      <div className='content'>
        <div className='main'>
          <div className='main-inner'>
            {props.route.pages
              .filter((page) => page.data.layout === 'post')
              .reverse()
              .map((page) => {
                const { title, description, date, body } = page.data
                return (
                  <div key={date} className='blog-post'>
                    <time dateTime={moment(date).format('MMMM D, YYYY')}>
                      {moment(date).format('MMMM YYYY')}
                    </time>
                    <h1 style={{
                      marginTop: 10, marginBottom: 20, lineHeight: '30px', fontSize: '1.6875rem'
                    }}>
                      <Link
                        style={{borderBottom: 'none', fontWeight: 400}}
                        to={prefixLink(page.path)}>
                          {title}
                      </Link>
                    </h1>
                    <p>{strip(body).slice(0, 180) + '...'}</p>
                    <Link className='readmore' to={ prefixLink(page.path) }>
                      More
                    </Link>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
