import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Store from './components/Store'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Payment from './components/Payment'
import Admin from './components/Admin'
import { useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext' // Importa el proveedor de contexto de temas
import './App.css'

// Define la función de redirección
const redirectToLogin = () => <Navigate to="/login" />

function App () {
  const { user, loading } = useAuth()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  console.log('user', user)
  console.log('loading', loading)

  useEffect(() => {
    if (user) {
      (
        setIsAuthenticated(true)
      )
    }
  }, [user])
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Ruta para redirigir a /login si el usuario no está autenticado */}
          <Route path="/" element={!user && !loading ? redirectToLogin() : null} />
          {/* Define las rutas normales */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {user && (
            <>
              {/* Pasa la prop isAuthenticated al componente Dashboard */}
              <Route path="/store" element={<Store />} />
              <Route path="/dashboard" element={<Dashboard isAuthenticated={isAuthenticated}/>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/admin" element={<Admin />} />
            </>
          )}
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

// BACKLOG
// - crear acceso a páginas por tipo de usuarios y tipos de usuarios en firebase
// - crear módulo de pagos... hay que buscar opcion que cobre menos..recomedadas payu y mercadopago en versión test
// - arreglar el hover del sidebar o hacer uno mas bacano
// - botón del profile de usuario debe regresar, no lo hace
// - bug si me devuelvo de payment, que no se borre el carrito de compras
// - usar Contex para variables globales como carrito de compras

// - Mejorar errores de la versión mobil
// - No esta cargando las fotos en firebase (revisar, creo que ya se resolvió)
// - hacer que los colores de fondo tengan gradiente
// - Configurar firebase con un .env
// - branch-0016: Descargar los datos de usuarios regirstrados y colocar nombre (name) en dashboard
// - branch-0017: colocar el usuario con avatar en el store
// - branch-0018: Cuando estoy en el store y quiero entrar a "profile" quiero que se rellenen los datos del formulario con
//   lo que haya disponible en el momento.
// - Despues de editar o crear un producto en firebase a traves de AdminForm, se debe actualizar la lista de productos en el index (revisar, creo que ya se resolvió)

// DONE
// - branch-0002: Que las fotos circulares nunca se deformen
// - branch-0003: Que los temas sean una variable global y prevalescan
// - branch-0004: ordenar tabla de productos por ID en orden descendente
// - branch-0005: Colocar que se vea la foto del producto en la tabla del index
// - branch-0006: Que aparezca el nombre y no el id de la categoria en la
// - branch-0007: colocar el número de items seleccionados

// - branch-0009: hacer un tema claro (blanco)
// - branch-0010: (x) el boton del formulario profile no funciona
// - branch-0011: Mejorar el scroll del car
// - branch-0012: Personalizar los checkboxes de las cards
// - branch-0013: Mostrar la imagen del producto cuando se edita un producto
// - branch-0014: Poner a funcionar el botón: delete, edit y crear de la tabla
// - branch-0015:
