import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  )
}
