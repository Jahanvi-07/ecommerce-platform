const express = require('express')
const crypto = require('crypto')
const Payment = require('../models/Order') // note: minimal project stores payment in order
const Order = require('../models/Order')
const router = express.Router()

// verify signature after client payment
router.post('/verify', async (req, res) => {
  try {
    const { orderId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body
    const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '').update(razorpay_order_id + '|' + razorpay_payment_id).digest('hex')
    const ok = expected === razorpay_signature
    if (!ok) return res.status(400).json({ ok: false, error: 'Invalid signature' })
    // find and update order
    const order = await Order.findById(orderId)
    if (!order) return res.status(404).json({ error: 'Order not found' })
    order.status = 'PAID'
    await order.save()
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// basic webhook (optional): we won't protect raw body here for simplicity
router.post('/webhook', express.json(), (req, res) => {
  // process events if you want
  console.log('webhook received', req.body.event)
  res.json({ ok: true })
})

module.exports = router
