import React from 'react'

function Header() {
  return (
    <header style={{"backgroundImage": "url('./images/Background.png')"}} className="position-relative page-header flex flex-col w-1/2">
      <div className="text-center my-auto z-10 max:w-full">
        <h1 className="w-full text-white text-5xl font-bold">Welcome To Our <span className="text-whtie">Service</span></h1>
      </div>
      <img alt="wave" src='' alt="Waves" className="wave w-100"/>
    </header>
  )
}

export default Header

