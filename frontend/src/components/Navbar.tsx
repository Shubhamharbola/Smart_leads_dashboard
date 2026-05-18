import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">Smart Leads</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600 text-sm">
          {user?.name} <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">{user?.role}</span>
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar