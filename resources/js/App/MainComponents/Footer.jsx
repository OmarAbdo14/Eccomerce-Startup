import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  const navigation = [
    { name: 'Login', href: '/login' },
    { name: 'Home Quarantine', href: '/dashboard' },
    { name: 'Contact Us', href: '/contact-us' },
  ];

  return (
  <footer className="bg-blue-dark">
    <div className="mx-auto w-10/12 grid  sm:grid-cols-1 md:grid-cols-3 gap-4 py-20">
      <div>
        <h3 className="text-white align-bottom text-2xl font-extrabold">GSCCM</h3>
        <ul className="list text-blue-light text-lg">
          {navigation.map((item, index) => (
          <Link key={index} className="text-blue-light block px-3 py-2 rounded-md text-lg font-medium" to={item.href}>{item.name}</Link>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-white align-bottom text-xl font-bold">Services</h3>
        <ul className="list text-blue-light text-lg">
          <Link to="" className="text-blue-light block px-3 py-2 rounded-md text-lg font-medium">Home Quarantine</Link>
          <Link to="" className="text-blue-light block px-3 py-2 rounded-md text-lg font-medium">Workplaces & Surface Areas</Link>
          <Link to="" className="text-blue-light block px-3 py-2 rounded-md text-lg font-medium">Infected Zones</Link>
        </ul>
      </div>
      <div>
        <h3 className="text-white align-bottom text-xl font-bold">Contact Info</h3>
        <ul className="list text-blue-light text-lg">
          <p className="text-blue-light block px-3 py-2 rounded-md text-lg font-medium">STDF Funded</p>
          <p className="text-blue-light block px-3 py-2 rounded-md text-lg font-medium">Research Project No. 45442</p>
        </ul>
      </div>
    </div>
  </footer>
  )
}

export default Footer

