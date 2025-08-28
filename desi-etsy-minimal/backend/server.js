require("dotenv").config();
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { connectDB } = require('./config/db')
const razorpay = require('./config/razorpay')

const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/products')
const orderRoutes = require('./routes/orders')
const paymentRoutes = require('./routes/payments')

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(express.json());

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

connectDB()

app.use(cors())
app.use(express.json({ limit: '5mb' }))
app.use(morgan('dev'))

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/payments', paymentRoutes)

// health
app.get('/health', (req, res) => res.json({ ok: true, ts: new Date() }))

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`))
