const mongoose = require('mongoose')
const { Schema } = mongoose

const orderItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  title: String,
  unitPrice: Number,
  qty: Number,
  subtotal: Number
})

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  items: [orderItemSchema],
  amountPaise: Number,
  status: { type: String, enum: ['PENDING','PAID','SHIPPED','DELIVERED'], default: 'PENDING' },
  razorpayOrderId: String,
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Order', orderSchema)
