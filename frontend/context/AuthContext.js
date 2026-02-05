import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    if (token) {
      checkUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const checkUser = async (token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
        config
      );
      setUser(data);
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      { email, password }
    );
    localStorage.setItem('token', data.token);
    setUser(data);
    return data;
  };

  const register = async (username, email, password) => {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      { username, email, password }
    );
    localStorage.setItem('token', data.token);
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
