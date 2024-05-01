import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import mercado from '../assets/mercado.png'
import { useTheme } from '../context/ThemeContext'
import useUsers from '../hooks/useUsers'

export default function Dashboard ({ isAuthenticated }) {
  const { getUserDataByEmail, userName } = useUsers()
  const authContext = useAuth()
  const location = useLocation()
  const message = location.state?.message
  const submessage = location.state?.submessage
  const navigate = useNavigate()
  const { bg2 } = useTheme()
  const userEmail = authContext?.user?.email

  const handleContinueClick = () => {
    navigate('/store')
  }

  const handleExitClick = async () => {
    try {
      await authContext.logout()
      navigate('/login')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  useEffect(() => {
    getUserDataByEmail(userEmail)
  }, [])

  return (
    <div className={`${bg2} flex flex-row items-center justify-center w-full h-screen`}>
      <div className={`flex flex-col items-center justify-center ${bg2} pt-5 pb-2 gap-y-3`}>
        <p className='text-[24px] text-[#8599cf]'>{userName}</p>
        <p className='text-[24px] text-[#c8d2ee]'>{message}</p>

        <img src={mercado} className='w-[500px] opacity-80'/>
        <div className='flex flex-row gap-16'>
          <button
            onClick={handleExitClick}
            className='text-[20px] text-[#c8d2ee] hover:text-white hover:scale-[105%]'
          >
              ¿Quieres salir?
          </button>
          {/* Condiciona la renderización del botón de continuar según isAuthenticated */}
          {isAuthenticated && (
            <button
              onClick={handleContinueClick}
              className='text-[20px] text-[#c8d2ee] hover:text-white hover:scale-[105%]'
            >
                ¿Deseas continuar?
            </button>
          )}
        </div>
        <button
          onClick={() => { navigate(-1) }}
          className='text-[20px] text-[#c8d2ee] hover:text-white hover:scale-[105%]'
        >
          {submessage}
        </button>
      </div>
    </div>
  )
}
