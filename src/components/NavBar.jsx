import React from 'react'
import '../css/NavBar.css'

const NavBar = () => {
  return (
    <>
        <nav className='navbar'>
            <div className='menu-item'><a href="/">Home</a></div>
            <div className='menu-item'><a href="">Results</a></div>
            <div className='menu-item'><a href="/fixtures">Fixtures</a></div>
            <div className='menu-item'><a href="">League Table</a></div>
            <div className='menu-item'><a href="/predictions">Predictions</a></div>
        </nav>
    </>
  )
}

export default NavBar