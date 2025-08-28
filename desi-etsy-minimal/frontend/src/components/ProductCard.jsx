import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ p }) {
  return (
    <div className="border rounded-lg p-3">
      <div className="h-40 bg-gray-100 mb-3 flex items-center justify-center">
        {p.images && p.images[0] ? <img src={p.images[0]} alt={p.title} className="max-h-full" /> : <span className="text-sm text-gray-400">No Image</span>}
      </div>
      <h3 className="font-medium">{p.title}</h3>
      <div className="text-sm">₹{(p.priceInPaise/100).toFixed(2)}</div>
      <Link to={`/products/${p.slug}`} className="inline-block mt-2 text-sm text-blue-600">View</Link>
    </div>
  )
}
