import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBsyc_kDwn7C6AGnGcqvNCPRjAsQ6kL9yQ',
  authDomain: 'ecommercesmb-a3ae7.firebaseapp.com',
  projectId: 'ecommercesmb-a3ae7',
  storageBucket: 'ecommercesmb-a3ae7.appspot.com',
  messagingSenderId: '229679312767',
  appId: '1:229679312767:web:078a412f8b1470b784344a'
}

// Initialize Firebase app
export const app = initializeApp(firebaseConfig)

// Get Firestore instance
export const db = getFirestore(app)

// Get Auth instance
export const auth = getAuth(app)

// Get Storage instance
export const storage = getStorage(app)
