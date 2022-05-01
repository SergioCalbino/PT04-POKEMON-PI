import React from 'react'
import {Link} from 'react-router-dom'
import image from '../img/all.jpg'
import Styles from '../LandingPage/LandingPage.module.css'


function LandingPage() {
  return (
    <div className={Styles.img}>
    <div className={Styles.landing}>
        <Link to='/home'>Home</Link>
        </div>
    <h1>Gotta catch 'em all!</h1>
    <img className={Styles.img} src={image} alt=''/>
        
    </div>
  )
}

export default LandingPage