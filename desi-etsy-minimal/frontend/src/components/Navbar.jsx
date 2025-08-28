import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold">Desi Etsy</Link>
        <nav className="space-x-4">
          <Link to="/products" className="text-sm">Products</Link>
          <Link to="/checkout" className="text-sm">Checkout</Link>
        </nav>
      </div>
    </header>
  )
}
