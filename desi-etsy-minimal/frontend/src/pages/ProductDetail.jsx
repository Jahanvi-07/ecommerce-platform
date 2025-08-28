import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchProductBySlug, createOrder } from '../api'

export default function ProductDetail(){
  const { slug } = useParams()
  const [p, setP] = useState(null)
  const [qty, setQty] = useState(1)
  const navigate = useNavigate()
  useEffect(()=>{ fetchProductBySlug(slug).then(setP).catch(()=>setP(null)) }, [slug])

  const handleBuy = async () => {
    // for demo: create order (requires token) — we'll assume guest token not used; use placeholder flow
    const token = localStorage.getItem('token') || '' // login flow not included in minimal
    const order = await createOrder(token, [{ productId: p._id, qty }])
    // open razorpay
    const options = {
      key: import.meta.env.VITE_RZP_KEY || '', // set in env for frontend if you like; we proxy /api so you can use backend key server-side
      amount: order.amount,
      currency: 'INR',
      order_id: order.razorpayOrderId,
      name: 'Desi Etsy',
      handler: async (resp) => {
        // send to backend verify
        await fetch('/api/payments/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: token ? `Bearer ${token}` : '' },
          body: JSON.stringify({ orderId: order.orderId, ...resp })
        })
        alert('Payment success (demo)')
        navigate('/')
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  if (!p) return <div>Loading...</div>
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="border rounded p-4">
        <div className="h-64 bg-gray-100 flex items-center justify-center">
          {p.images && p.images[0] ? <img src={p.images[0]} alt={p.title} /> : 'No image'}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">{p.title}</h2>
        <p className="mt-2">₹{(p.priceInPaise/100).toFixed(2)}</p>
        <p className="mt-2 text-sm">{p.description}</p>
        <div className="mt-4 flex items-center gap-2">
          <input type="number" min="1" value={qty} onChange={e=>setQty(Number(e.target.value))} className="border rounded px-2 py-1 w-20" />
          <button className="btn btn-primary" onClick={handleBuy}>Buy Now</button>
        </div>
      </div>
    </div>
  )
}
