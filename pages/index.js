import React, { Component } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import { prefixLink } from 'gatsby-helpers'
import SiteSidebar from '../components/SiteSidebar'

function strip (str) {
  return str.replace(/<\/?[^>]+(>|$)/g, "")
}

SiteIndex.propTypes = {
  route: React.PropTypes.object
}

export default function SiteIndex (props) {
  return (
    <div>
      <SiteSidebar {...props}/>
      <div className='content'>
        <div className='main'>
          <div className='main-inner'>
            {props.route.pages
              .filter((page) => page.data.layout === 'post')
              .sort((a,b) => b.data.date > a.data.date)
              .map((page) => {
                const { title, description, date, body } = page.data
                return (
                  <div key={date} className='blog-post'>
                    <time dateTime={moment(date).format('MMMM D, YYYY')}>
                      {moment(date).format('MMMM YYYY')}
                    </time>
                    <h2>
                      <Link
                        style={{borderBottom: 'none', fontWeight: 400}}
                        to={prefixLink(page.path)}>
                          {title}
                      </Link>
                    </h2>
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
