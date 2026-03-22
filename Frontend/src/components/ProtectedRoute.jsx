import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('eyescreen_user') || 'null')
  if (!user) return <Navigate to="/patient-login" replace />
  return children
}
