import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = !!user;
  const isBuyer = user?.role === 'buyer';
  const isSeller = user?.role === 'seller';
  const isAdmin = user?.role === 'admin';
  const [selectedRole, setSelectedRole] = useState('buyer');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleGoogleLogin = () => {
    dispatch(login(selectedRole));
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-blue-600">RealtyProperties</div>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? 'X' : 'Menu'}
        </button>

        <div className="hidden sm:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>

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
                  onClick={() => dispatch(logout())}
                  className="px-4 py-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <select
                  value={selectedRole}
                  onChange={(event) => setSelectedRole(event.target.value)}
                  className="bg-white border border-gray-300 px-3 py-2 rounded-xl text-sm"
                  aria-label="Select mock user role"
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </select>

                <button
                  onClick={handleGoogleLogin}
                  className="flex items-center gap-2 bg-white border border-gray-300 px-5 py-2 rounded-xl hover:bg-gray-50 font-medium"
                >
                  <span>Key</span> Sign in with Google (Mock)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-4">
          <div className="flex flex-col gap-3 text-sm font-medium">
            <Link to="/" className="hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>

            {isLoggedIn && isBuyer && (
              <Link to="/dashboard" className="hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
                Dashboard
              </Link>
            )}
            {isLoggedIn && isSeller && (
              <Link to="/seller-dashboard" className="hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
                Seller Dashboard
              </Link>
            )}
            {isLoggedIn && isAdmin && (
              <Link to="/admin" className="hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
                Admin Panel
              </Link>
            )}
          </div>

          <div className="pt-3 border-t border-gray-100">
            {isLoggedIn ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">({user.role})</p>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(logout())}
                  className="w-full px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <select
                  value={selectedRole}
                  onChange={(event) => setSelectedRole(event.target.value)}
                  className="w-full bg-white border border-gray-300 px-3 py-2 rounded-xl text-sm"
                  aria-label="Select mock user role"
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 px-5 py-2 rounded-xl hover:bg-gray-50 font-medium text-sm"
                >
                  <span>Key</span> Sign in with Google (Mock)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

