import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../api'
import ProductCard from '../components/ProductCard'

export default function Products(){
  const [items, setItems] = useState([])
  useEffect(()=>{ fetchProducts().then(setItems) }, [])
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Products</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(p => <ProductCard key={p._id} p={p} />)}
      </div>
    </div>
  )
}
