import { useState, useEffect } from 'react'
import { db } from '../firebase.config'
import { collection, getDocs } from 'firebase/firestore'

function useUsers () {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [usersData, setUsersData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const usuariosRef = collection(db, 'usuarios')
        const querySnapshot = await getDocs(usuariosRef)
        setUsersData(querySnapshot)
        const userDataArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
        setUsersData(userDataArray)
      } catch (error) {
        setError('Error al obtener los datos de los usuarios de Firestore: ' + error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  console.log('usersData', usersData)

  return {
    usersData,
    loading,
    error
  }
}

export default useUsers
