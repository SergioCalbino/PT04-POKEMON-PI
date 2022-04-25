import React from 'react'
import {Link} from 'react-router-dom'
import '../LandingPage/LandingPage.css'
import image from '../img/all.jpg'


function LandingPage() {
  return (
    <div className='begin'>
        <Link to='/home'>Home</Link>
    <h1>Gotta catch 'em all!</h1>
    <img className='logo' src={image} alt=''/>
        
    </div>
  )
}

export default LandingPage