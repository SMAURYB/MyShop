import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Store from './components/Store';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Payment from './components/Payment';
import Admin from './components/Admin';
import { useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext'; // Importa el proveedor de contexto de temas
import './App.css';

function App() {
  const { user, loading } = useAuth();

  // Define la función de redirección
  const redirectToLogin = () => <Navigate to="/login" />;

  return (
    <ThemeProvider> {/* Envuelve toda la aplicación con el proveedor de contexto de temas */}
      <Router>
        <Routes>
          {/* Ruta para redirigir a /login si el usuario no está autenticado */}
          <Route path="/store" element={!user && !loading ? redirectToLogin() : null} />

          {/* Define las rutas normales */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {user && (
            <>
              {/* Pasa la prop isAuthenticated al componente Dashboard */}
              <Route path="/" element={<Store />} />
              <Route path="/dashboard" element={<Dashboard isAuthenticated={true} />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/admin" element={<Admin />} />
            </>
          )}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;


// - crear acceso a páginas por tipo de usuarios y tipos de usuarios en firebase
// - crear módulo de pagos... hay que buscar opcion que cobre menos..recomedadas payu y mercadopago en versión test
// - arreglar el hover del sidebar o hacer uno mas bacano
// - botón del profile de usuario debe regresar, no lo hace
// - bug si me devuelvo de payment, que no se borre el carrito de compras
// - usar Contex para variables globales como carrito de compras

// - branch-0011: hacer que los colores de fondo tengan gradiente
// - branch-0010: poner a funcionar el botón delete de la tabla
// - branch-0009: colocar el número de items seleccionados
// - branch-0008: Despues de editar o crear un producto en firebase a traves de AdminForm, se debe actualizar la lista de productos en el index (revisar, creo que ya se resolvió)
// - branch-0007: No esta cargando las fotos en firebase (revisar, creo que ya se resolvió)
// - branch-0006: Colocar que se vea la foto del producto en la tabla del index
// - branch-0005: Mostrar fotos de productos en la tabla Admin
// - branch-0004: ordenar tabla de productos por ID en orden descendente
// - branch-0003: Que los temas sean una variable global y prevalescan
// - branch-0002: Que las fotos circulares nunca se deformen
