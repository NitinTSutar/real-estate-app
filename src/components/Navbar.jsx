import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth.jsx';

const Navbar = () => {
  const { user, login, logout, isLoggedIn, isBuyer, isSeller, isAdmin } = useAuth();

  const handleGoogleLogin = () => {
    const role = prompt("Login as: buyer / seller / admin", "buyer");
    if (role) login(role.toLowerCase());
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-blue-600">🏠 RealtyHub</div>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/property/1" className="hover:text-blue-600">Properties</Link>

          {isLoggedIn && (
            <>
              {isBuyer && <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>}
              {isSeller && <Link to="/seller-dashboard" className="hover:text-blue-600">Seller Dashboard</Link>}
              {isAdmin && <Link to="/admin" className="hover:text-blue-600">Admin Panel</Link>}
            </>
          )}

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">({user.role})</p>
                </div>
                <button 
                  onClick={logout}
                  className="px-4 py-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={handleGoogleLogin}
                className="flex items-center gap-2 bg-white border border-gray-300 px-5 py-2 rounded-xl hover:bg-gray-50 font-medium"
              >
                <span>🔑</span> Sign in with Google (Mock)
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
