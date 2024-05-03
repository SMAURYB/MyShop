import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth'

import { auth, db } from '../firebase.config'

// Se importan las funciones específicas de Firestore necesarias
// import { doc, setDoc } from "firebase/firestore"

// Se crea un contexto para manejar la autenticación
export const authContext = createContext()

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => {
  const context = useContext(authContext)
  if (!context) throw new Error('No AuthProvider found')
  return context
}

// Componente que provee el contexto de autenticación a la aplicación
export default function AuthProvider ({ children }) {
  const [user, setUser] = useState(null) // Estado para almacenar el usuario autenticado
  const [uid, setUid] = useState(null)
  const [loading, setLoading] = useState(true) // Estado para indicar si se está cargando la autenticación

  // Función para guardar el usuario en el almacenamiento local
  const saveUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
  }

  // Función para obtener el usuario desde el almacenamiento local
  const getUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  }

  // Función para registrarse con email y contraseña
  const signup = async (email, password) => {
    try {
    // Crear el usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log('userCredential', userCredential)
      // Almacenar datos adicionales del usuario en Firestore
      // const userDocRef = doc(db, "userinformation", userCredential.user.uid);
      // await setDoc(userDocRef, { email, username });

      // Actualizar el estado local del usuario
      setUser(userCredential?.user)
      setUid(userCredential?.user?.uid)
      console.log('uid in authcontext', user?.uid)
      saveUserToLocalStorage(userCredential.user)

      // Notificar al usuario que se ha registrado correctamente
      alert('¡Registro exitoso!')

      return userCredential.user
    } catch (error) {
      console.error('Error durante el registro:', error)
      throw error
    }
  }

  // Función para iniciar sesión con email y contraseña
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setUser(userCredential.user)
      saveUserToLocalStorage(userCredential.user)
    } catch (error) {
      console.error('Error during login:', error)
      throw error
    }
  }

  // Función para iniciar sesión con Google
  const loginWithGoogle = async () => {
    try {
      const googleProvider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, googleProvider)
      setUser(userCredential.user)
      saveUserToLocalStorage(userCredential.user)
    } catch (error) {
      console.error('Error during login with Google:', error)
      throw error
    }
  }

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth)
      // setUser(null);
      setUser({
        email: '',
        password: ''
      })
      localStorage.removeItem('user')
    } catch (error) {
      console.error('Error during logout:', error)
      throw error
    }
  }

  // Función para enviar un correo electrónico para restablecer la contraseña
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      console.error('Error during password reset:', error)
      throw error
    }
  }

  // Efecto para manejar el cambio de estado de autenticación
  useEffect(() => {
    const storedUser = getUserFromLocalStorage()
    if (storedUser) {
      setUser(storedUser)
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log({ currentUser });
      setUser(currentUser)
      setLoading(false)
      if (currentUser) {
        saveUserToLocalStorage(currentUser)
      } else {
        localStorage.removeItem('user')
      }
    })
    return () => unsubscribe()
  }, [])

  // Se provee el contexto de autenticación a los componentes hijos
  // console.log("user del AuthContext", user)

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        uid,
        logout,
        loading,
        loginWithGoogle,
        resetPassword,
        db,

        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged,
        GoogleAuthProvider,
        signInWithPopup,
        sendPasswordResetEmail
      }}
    >
      {children}
    </authContext.Provider>
  )
}
