import { useState, useEffect } from 'react'
import { db } from '../firebase.config'
import { collection, getDocs } from 'firebase/firestore'

function useUsers () {
  const [userName, setUserName] = useState('')
  const [allUsersData, setAllUsersData] = useState({})
  const [userData, setUserData] = useState({
    correo: '',
    direccion: '',
    nombre: '',
    password: '',
    telefono: '',
    uid: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('entré a useUsers')
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const usuariosRef = collection(db, 'usuarios')
        // Obtener los documentos de la colección "productos"
        const querySnapshot = await getDocs(usuariosRef)
        setUserData(querySnapshot)
        setAllUsersData(querySnapshot)
        setUserName('Hola')
        querySnapshot.forEach((doc) => {
          console.log('direccion', doc.direccion)
        })

        console.log('querySnapshot:', querySnapshot)
        console.log('allUsersData', allUsersData)
      } catch (error) {
        setError('Error al obtener los datos del usuario de Firestore: ' + error.message)
      } finally {
        setLoading(false)
      }
    }
    // Llamar a la función para obtener los datos cuando el componente se monte
    fetchData()
  }, []) // El array vacío como segundo argumento asegura que el efecto se ejecute solo una vez al montar el componente

  console.log('userName', userName)
  console.log('userData', userData)

  return {
    userName,
    userData,
    loading,
    error
  }
}

export default useUsers
