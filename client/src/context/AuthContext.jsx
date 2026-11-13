import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Pre-load authenticated user or default client
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("lomaraa_auth_user");
    return saved
      ? JSON.parse(saved)
      : {
          id: "usr-001",
          name: "Aarav Sharma",
          email: "aarav@lomaraa.com",
          phone: "+91 98200 12345",
          role: "admin", // defaults to admin so user can freely inspect both customer and admin screens!
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          memberSince: "January 2026",
          tier: "Atelier Privé VIP"
        };
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem("lomaraa_auth_token")) || true;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("lomaraa_auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("lomaraa_auth_user");
    }
  }, [user]);

  const login = (email, _password) => {
    // Check if admin login credentials
    const isAdmin = email.toLowerCase().includes("admin");
    const loggedUser = {
      id: `usr-${Date.now()}`,
      name: isAdmin ? "Lomaraa Administrator" : "Aarav Sharma",
      email: email,
      phone: "+91 98200 12345",
      role: isAdmin ? "admin" : "customer",
      memberSince: "2026",
      tier: "Lomaraa Privé"
    };

    setUser(loggedUser);
    setIsAuthenticated(true);
    localStorage.setItem("lomaraa_auth_token", "jwt_mock_token_lomaraa_signature");
    return { success: true, user: loggedUser };
  };

  const register = (userData) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone || "+91 98000 00000",
      role: "customer",
      memberSince: "2026",
      tier: "New Patron"
    };

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem("lomaraa_auth_token", "jwt_mock_token_lomaraa_signature");
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("lomaraa_auth_token");
    localStorage.removeItem("lomaraa_auth_user");
  };

  const updateProfile = (updatedFields) => {
    setUser((prev) => ({ ...prev, ...updatedFields }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin: user?.role === "admin",
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
