import React, { createContext, useState, useContext, useEffect } from 'react';
import bcrypt from 'bcryptjs';

const AuthContext = createContext(null);

// This is where you'd store the admin credentials, ideally in environment variables
const ADMIN_CREDENTIALS = {
  username: 'admin',
  passwordHash: '$2b$10$E7.WJ.8LEJPxrLVS2BpkBO8nHlCLbvzDMbspqedxhcY5cknac8FSi'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const loggedInUser = localStorage.getItem('wanzofc_auth');
    if (loggedInUser) {
      try {
        const parsedUser = JSON.parse(loggedInUser);
        // Basic validation
        if (parsedUser.username && parsedUser.role) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem('wanzofc_auth');
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('wanzofc_auth');
      }
    }
  }, []);

  const login = async (username, password) => {
    console.log("Attempting login for username:", username);

    const isUsernameMatch = ADMIN_CREDENTIALS.username === username;
    if (!isUsernameMatch) {
      console.error("Login failed: Username does not match");
      throw new Error('username atau password salah!');
    }

    const isPasswordMatch = await bcrypt.compare(password, ADMIN_CREDENTIALS.passwordHash);
    if (!isPasswordMatch) {
      console.error("Login failed: Password does not match");
      throw new Error('username atau password salah!');
    }

    console.log("Login successful for username:", username);
    const userData = { username: ADMIN_CREDENTIALS.username, role: 'admin' };
    localStorage.setItem('wanzofc_auth', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    console.log("Logging out user");
    localStorage.removeItem('wanzofc_auth');
    setUser(null);
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};