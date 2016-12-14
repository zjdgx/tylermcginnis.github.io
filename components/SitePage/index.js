import React from 'react'
import SiteSidebar from '../SiteSidebar'
import './style.css'

SitePage.propTypes = {
  post: React.PropTypes.object.isRequired,
  pages: React.PropTypes.array,
}

export default function SitePage (props) {
  const post = props.route.page.data
  return (
    <div>
      <SiteSidebar {...props}/>
      <div className='content'>
        <div className='main'>
          <div className='main-inner'>
            <div className='blog-page'>
              <div className='text'>
                <h1>{post.title}</h1>
                <div dangerouslySetInnerHTML={{__html: post.body}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
