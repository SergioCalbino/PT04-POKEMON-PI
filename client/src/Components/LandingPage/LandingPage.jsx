import React from 'react'
import {Link} from 'react-router-dom'
import image from '../img/pokemon.png'

function LandingPage() {
  return (
    <div>
    <h1>Gotta catch 'em all!</h1>
    <img src={image} alt=''/>
        <Link to='/home'>Home</Link>
        
    </div>
  )
}

export default LandingPage