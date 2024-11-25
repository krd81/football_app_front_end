import React from 'react'
import '../css/NavBar.css'

const NavBar = () => {
  return (
    <>
        <nav className='navbar'>
            <div className='menu-item'><a href="/" className='navbar-link'>Home</a></div>
            <div className='menu-item'><a href="/play" className='navbar-link'>Play</a></div>
            <div className='menu-item'><a href="/fixtures" className='navbar-link'>Fixtures</a></div>
            <div className='menu-item'><a href="" className='navbar-link'>League Table</a></div>
            <div className='menu-item'><a href="/predictions" className='navbar-link'>Predictions</a></div>
        </nav>
    </>
  )
}

export default NavBar