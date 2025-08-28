const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  role: { type: String, enum: ['CUSTOMER','ARTISAN','ADMIN'], default: 'CUSTOMER' },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema)
