import axios from 'axios'
const api = axios.create({ baseURL: '/api' })

export async function fetchProducts(q = '') {
  const res = await api.get(`/products${q ? '?q=' + encodeURIComponent(q) : ''}`)
  return res.data.items
}

export async function fetchProductBySlug(slug) {
  const res = await api.get(`/products/slug/${slug}`)
  return res.data
}

export async function createOrder(token, items = []) {
  return api.post('/orders', { items }, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data)
}

export async function verifyPayment(token, payload) {
  return api.post('/payments/verify', payload, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data)
}
