import { createSlice } from '@reduxjs/toolkit';

const registeredUsers = [
  {
    id: 'buyer1',
    name: 'Nitin Sutar',
    email: 'buyer@example.com',
    role: 'buyer',
  },
  {
    id: 'seller1',
    name: 'Riya Builder',
    email: 'seller@example.com',
    role: 'seller',
  },
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
  },
];

const getInitialUser = () => {
  const savedUser = localStorage.getItem('user');
  if (!savedUser) return null;

  try {
    return JSON.parse(savedUser);
  } catch {
    localStorage.removeItem('user');
    return null;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getInitialUser(),
    registeredUsers,
  },
  reducers: {
    login(state, action) {
      const role = action.payload || 'buyer';
      const roleProfiles = {
        buyer: state.registeredUsers.find((user) => user.role === 'buyer'),
        seller: state.registeredUsers.find((user) => user.role === 'seller'),
        admin: state.registeredUsers.find((user) => user.role === 'admin'),
      };
      const profile = roleProfiles[role] ?? roleProfiles.buyer;

      state.user = {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        role,
        avatar:
          'https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg',
      };
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
