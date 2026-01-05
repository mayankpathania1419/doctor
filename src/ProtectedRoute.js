import {Navigate, Outlet} from 'react-router-dom'


const ProtectedRoute=()=>{
const token=localStorage.getItem('usertoken')

if (!token) {
    return <Navigate to="/" replace />; // Redirect to login
  }

  return <Outlet />; // Render children routes
};

export default ProtectedRoute;