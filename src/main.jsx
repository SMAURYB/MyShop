import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthProvider from './context/AuthContext'; // Importa el AuthProvider

import './index.css';

// Utiliza createRoot para montar tu aplicación en el contenedor del DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Envuelve el componente App con AuthProvider */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);