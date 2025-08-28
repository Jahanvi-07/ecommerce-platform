const express = require('express')
const Product = require('../models/Product')
const router = express.Router()

// list
router.get('/', async (req, res) => {
  try {
    const q = req.query.q || ''
    const items = await Product.find({ title: { $regex: q, $options: 'i' } }).limit(100)
    res.json({ items })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// get by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const p = await Product.findOne({ slug: req.params.slug })
    if (!p) return res.status(404).json({ error: 'Not found' })
    res.json(p)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// create (very simple, no auth in minimal version)
router.post('/', async (req, res) => {
  try {
    const { title, description, priceInPaise, stock = 10, category = 'misc', images = [] } = req.body
    if (!title || !priceInPaise) return res.status(400).json({ error: 'Missing fields' })
    const slug = title.toLowerCase().replace(/\s+/g,'-') + '-' + Date.now().toString(36).slice(-4)
    const product = await Product.create({ title, description, priceInPaise, stock, category, images, slug })
    res.json({ product })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

module.exports = router
