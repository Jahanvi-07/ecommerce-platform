const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
  artisanId: { type: Schema.Types.ObjectId, ref: 'User' }, // simple link
  category: String,
  title: String,
  slug: { type: String, unique: true },
  description: String,
  priceInPaise: Number,
  stock: { type: Number, default: 0 },
  approved: { type: Boolean, default: true }, // keep true for demo
  images: [String],
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Product', productSchema)
