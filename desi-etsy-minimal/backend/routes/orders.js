const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const Product = require('../models/Product')
const razorpay = require('../config/razorpay')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')

// minimal auth middleware
async function auth(req, res, next) {
  try {
    const h = req.headers.authorization
    if (!h) return res.status(401).json({ error: 'No token' })
    const token = h.split(' ')[1]
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev')
    req.userId = payload.id
    next()
  } catch (err) { res.status(401).json({ error: 'Invalid token' }) }
}

// create order and razorpay order
router.post('/', auth, async (req, res) => {
  try {
    const { items = [] } = req.body
    if (!items.length) return res.status(400).json({ error: 'Cart empty' })
    const productIds = items.map(i => i.productId)
    const prods = await Product.find({ _id: { $in: productIds } })
    const byId = {}
    prods.forEach(p => byId[p._id.toString()] = p)
    let amount = 0
    const orderItems = []
    for (const it of items) {
      const p = byId[it.productId]
      if (!p) return res.status(400).json({ error: 'Product missing' })
      const qty = it.qty || 1
      const subtotal = p.priceInPaise * qty
      amount += subtotal
      orderItems.push({ productId: p._id, title: p.title, unitPrice: p.priceInPaise, qty, subtotal })
    }

    // create razorpay order
    const receipt = `rcpt_${uuid.v4().slice(0,8)}`
    const rzpOrder = await razorpay.orders.create({ amount, currency: 'INR', receipt, payment_capture: 1 })

    const order = await Order.create({ userId: req.userId, items: orderItems, amountPaise: amount, razorpayOrderId: rzpOrder.id })
    res.json({ orderId: order._id, razorpayOrderId: rzpOrder.id, amount })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

module.exports = router
