import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Alert } from './Alert'
import { useTheme } from '../context/ThemeContext'

export default function Register () {
  const { signup } = useAuth() // Eliminamos uid de aquí
  const { bg2 } = useTheme()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const [errorSpanish, setErrorSpanish] = useState('')
  const navigate = useNavigate()

  const userHandler = (e) => {
    const { name, value } = e.target
    setUser((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { email, password } = user // Extraemos email y password del estado user
      await signup(email, password) // Usamos email y password directamente en signup
      navigate('/profile', { state: { message: '¡Bienvenido! Complete su perfil para continuar.', user } })
    } catch (error) {
      setError(error.message)

      if (error.code === 'auth/email-already-in-use') {
        setErrorSpanish('El correo electrónico ya está en uso. Por favor, ingrese otro correo electrónico.')
      } else if (error.code === 'auth/weak-password') {
        setErrorSpanish('La contraseña es débil. Debe tener al menos 6 caracteres.')
      } else if (error.code === 'auth/invalid-email') {
        setErrorSpanish('El correo electrónico no válido')
      } else if (error.code === 'auth/missing-password') {
        setErrorSpanish('Debe escribir una contraseña')
      } else if (error.code === 'auth/missing-email') {
        setErrorSpanish('Debe escribir un correo')
      }
    }
  }

  console.log('error', error)

  return (
    <div className={`${bg2} flex flex-row items-center justify-center w-full h-screen`}>
      <div className="w-full max-w-xs m-auto text-black">
        {errorSpanish && <Alert message={errorSpanish} />}
        <form
          onSubmit={handleSubmit}
          className="bg-stone-300 shadow-md rounded px-8 pt-6 pb-6 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={userHandler}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ingrese su correo electrónico"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={userHandler}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ingrese su contraseña"
            />
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Registrarse
          </button>
        </form>
        <p className="my-4 text-sm flex justify-between px-3 text-gray-400">
          ¿Ya tienes una cuenta?
          <Link to="/login" className="text-blue-400 hover:text-blue-300">
            Inicie sesión aquí
          </Link>
        </p>
      </div>
    </div>
  )
}
