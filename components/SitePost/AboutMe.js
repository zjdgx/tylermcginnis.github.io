import React, { PropTypes } from 'react'
import { config } from 'config'
import './aboutMeStyles.css'
import profilePic from '../../pages/tyler-mcginnis.jpg'
import { Follow } from 'react-twitter-widgets'

AboutMe.propTypes = {
  top: PropTypes.bool.isRequired,
}

AboutMe.defaultProps = {
  top: false,
}

export default function AboutMe ({top}) {
  return (
    <div>
      { top === true ? null : <hr style={{marginBottom: 30}} /> }
      <div className='footer'>
      <img className='avatar' src={profilePic} alt='Tyler McGinnis Profile Picture' />
      <div className='author-bio'>
        <p>👋 I'm Tyler. I'm a <a href="https://developers.google.com/experts/people/tyler-mcginnis">Google Developer Expert</a> and a partner at <a href="https://reacttraining.com">React Training</a> where we teach React online, in person, and build OSS like React Router.</p>
        <Follow username='tylermcginnis33' />
      </div>
      </div>
      { top === true ? null : <div style={{height: 62}} /> }
    </div>
  )
}