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
    const roleProfiles = {
      buyer: { id: 'buyer1', name: 'Nitin Sharma', email: 'buyer@example.com' },
      seller: { id: 'seller1', name: 'Riya Builder', email: 'seller@example.com' },
      admin: { id: 'admin1', name: 'Admin User', email: 'admin@example.com' },
    };
    const profile = roleProfiles[role] ?? roleProfiles.buyer;

    const mockUser = {
      id: profile.id,
      name: profile.name,
      email: profile.email,
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
