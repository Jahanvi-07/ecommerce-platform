import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="grid md:grid-cols-2 gap-6 items-center">
      <div>
        <h1 className="text-3xl font-bold">Desi Etsy — Handmade Marketplace (Minimal)</h1>
        <p className="mt-2">Browse local handmade products, add to cart, and pay with Razorpay.</p>
        <div className="mt-4">
          <Link to="/products" className="btn btn-primary">Explore Products</Link>
        </div>
      </div>
      <div className="p-6 border rounded-lg">
        <h3 className="font-semibold">Demo notes</h3>
        <ul className="list-disc pl-5 text-sm mt-2">
          <li>Backend runs on port 4000</li>
          <li>Frontend runs on port 3000 (vite)</li>
          <li>Razorpay keys: put test keys in backend .env</li>
        </ul>
      </div>
    </div>
  )
}
