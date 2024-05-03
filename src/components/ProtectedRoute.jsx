import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute () {
  // const { user, loading } = useAuth()
  const { user } = useAuth()
  console.log('usuario', user)
  // if (loading) return <h1>Loading</h1>;

  return (
    <> { user?.uid ? <Outlet/> : <Navigate to="/login" />}</>
  )
}

// src/components/ProtectedRoute.jsx

// ProtectedRoute.jsx
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// export default function ProtectedRoute({ element, ...rest }) {
//   const { user, loading } = useAuth();

//   if (loading) return <h1>Loading</h1>;

//   if (!user) return <Navigate to="/login" />;

//   return <Route {...rest} element={element} />;
// }
