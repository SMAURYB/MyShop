import { useAuth } from '../context/AuthContext'
// import { useNavigate } from 'react-router-dom'

export default function Home () {
  const { logout } = useAuth()
  // const navigate = useNavigate()

  // console.log(user);
  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div className="w-full max-w-xs m-auto text-black bg-[#2e2]">
      <h1>Este es el home</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* <p className="text-xl mb-4">welcome {user.displayName || user.email}</p> */}
        <button
          className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black"
          onClick={handleLogout}
        >
          logout
        </button>
      </div>
    </div>
  )
}
