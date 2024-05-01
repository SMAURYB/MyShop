import React from 'react'
import App from './App'
import AuthProvider from './context/AuthContext' // Importa el AuthProvider
import { createRoot } from 'react-dom/client' // Import from 'react-dom/client'
import './index.css'

// Utiliza createRoot para montar tu aplicación en el contenedor del DOM
const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    {/* Envuelve el componente App con AuthProvider */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)
