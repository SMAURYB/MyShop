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
import './App.css';

function App() {
  const { user, loading } = useAuth();

  // Define la función de redirección
  const redirectToLogin = () => <Navigate to="/login" />;

  return (
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
  );
}

export default App;



// En el formulario de productos , en el input de Categorias se debe colocar un desplegable de selección
// Hacer que en la lista se muestren los productos descargados de firebase
// módulo de administradores : cargue de productos , productos, etc
// - Formulario de cargue de productos uno a uno, con:
// -precio,
// -marca,
// -url foto,
// -cantidad en inventario
// -referencia,
// -tipo (aseo, bebidas, ect)
//      - tabla crud
//      - Base de datos de inventario, entradas y salidas de items
// - crear acceso a páginas por tipo de usuarios y tipos de usuarios en firebase
// - crear módulo de pagos... hay que buscar opcion que cobre menos..recomedadas payu y mercadopago en versión test
// - arreglar el hover del sidebar o hacer uno mas bacano
// - botón del profile de usuario debe regresar, no lo hace
// - bug si me devuelvo de payment, que no se borre el carrito de compras
// - bug corregir en carrito, si se selecciona un item, y se cambia de tab, se borra el check
// - usar Contex para variables globales como carrito de compras
// - colocar el número de items seleccionados

// - xxxxxxxxxxxxxxxxxxxxxxxxx mejorar los mensajes de error del login y register, en español y colocarle adapters
// - xxxxxxxxxxxxxxxxxxxxxxxxx tomar el userCredentials y volverlo variable global, que aparezca el nombre del usuario arriba en el store
// - xxxxxxxxxxxxxxxxxxxxxxxxx localstore para usuario
// - xxxxxxxxxxxxxxxxxxxxxxxxx habilitar ruta módulo pago
// - xxxxxxxxxxxxxxxxxxxxxxxxx habilitar boton cerrar seccion que envie a pagina de salida
// - xxxxxxxxxxxxxxxxxxxxxxxxx colocar nombre de usuario en parte superior derecha
// - xxxxxxxxxxxxxxxxxxxxxxxxx crear opciones de cambio de tema y colores en la tuerca de settings
// - xxxxxxxxxxxxxxxxxxxxxxxxx después de registrarse navegue al módulo de crear perfil y quede la opción de saltarse ese
// - xxxxxxxxxxxxxxxxxxxxxxxxx paso y que lo haga cuando le de al boton pagar
// - xxxxxxxxxxxxxxxxxxxxxxxxx mejorar el scroll del car con custom-scroll
// - xxxxxxxxxxxxxxxxxxxxxxxxx poner a funcionar autenticación con google
// - xxxxxxxxxxxxxxxxxxxxxxxxx setear firebase para registro de usuarios con perfil (direccion, telefono, etc)
