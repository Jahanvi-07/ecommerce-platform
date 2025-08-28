const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, wantArtisan } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing fields' })
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' })
    }

    const exists = await User.findOne({ email })
    if (exists) return res.status(409).json({ error: 'Email already exists' })

    const hash = await bcrypt.hash(password, 10)
    const user = await User.create({
      name,
      email,
      passwordHash: hash,
      role: wantArtisan ? 'ARTISAN' : 'CUSTOMER'
    })

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'dev',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    res.json({
      success: true,
      data: {
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role }
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error, please try again later' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing fields' })
    }

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: 'Invalid credentials' })

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' })

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'dev',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    res.json({
      success: true,
      data: {
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role }
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error, please try again later' })
  }
})

module.exports = router
