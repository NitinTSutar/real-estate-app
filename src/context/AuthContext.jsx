import { useState } from "react";
import AuthContext from "./auth-context.jsx";

const registeredUsers = [
  {
    id: "buyer1",
    name: "Nitin Sutar",
    email: "buyer@example.com",
    role: "buyer",
  },
  {
    id: "seller1",
    name: "Riya Builder",
    email: "seller@example.com",
    role: "seller",
  },
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) return null;

    try {
      return JSON.parse(savedUser);
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const login = (role = "buyer") => {
    const roleProfiles = {
      buyer: registeredUsers.find((user) => user.role === "buyer"),
      seller: registeredUsers.find((user) => user.role === "seller"),
      admin: registeredUsers.find((user) => user.role === "admin"),
    };
    const profile = roleProfiles[role] ?? roleProfiles.buyer;

    const mockUser = {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      role,
      avatar:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg",
    };

    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoggedIn: !!user,
        isBuyer: user?.role === "buyer",
        isSeller: user?.role === "seller",
        isAdmin: user?.role === "admin",
        registeredUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
