import { useState } from 'react';
import AuthContext from './auth-context.jsx';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) return null;

    try {
      return JSON.parse(savedUser);
    } catch {
      localStorage.removeItem('user');
      return null;
    }
  });

  const login = (role = 'buyer') => {
    const mockUser = {
      id: 'user123',
      name: 'Nitin Sharma',
      email: 'nitin@example.com',
      role,
      avatar: 'https://picsum.photos/id/64/200/200',
    };

    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoggedIn: !!user,
        isBuyer: user?.role === 'buyer',
        isSeller: user?.role === 'seller',
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
