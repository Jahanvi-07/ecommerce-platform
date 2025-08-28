import React from 'react'

export default function Checkout(){
  return (
    <div>
      <h2 className="text-xl font-semibold">Checkout (use product page to buy in minimal demo)</h2>
      <p className="mt-2 text-sm">This minimal demo opens Razorpay directly from product detail.</p>
      <p className="mt-4 text-xs text-gray-500">Make sure you add backend Razorpay keys and have the backend running.</p>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </div>
  )
}
