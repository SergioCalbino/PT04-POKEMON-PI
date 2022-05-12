import React from 'react'
import {Link} from 'react-router-dom'
import Styles from '../LandingPage/LandingPage.module.css'


function LandingPage() {
  return (
    <div className={Styles.img}>
    <button className={Styles.btn}>
        <Link to='/home'>Home</Link>
        </button>
    <h1 className={Styles.title}>Gotta catch 'em all!</h1>
   
        
    </div>
  )
}

export default LandingPage