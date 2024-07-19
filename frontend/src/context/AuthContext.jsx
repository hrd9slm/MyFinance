import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Add prop validation for 'children'
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
  });

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setAuth((prevState) => ({
          ...prevState,
          token,
        }));

        console.log('Token found in localStorage:', token);

        try {
          console.log('Sending token in headers:', token);
          const res = await axios.get('http://localhost:5000/api/auth/user', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          setAuth({
            token,
            isAuthenticated: true,
            loading: false,
            user: res.data,
          });
        } catch (err) {
          console.error('Error fetching user:', err);
          localStorage.removeItem('token');
          setAuth({
            token: null,
            isAuthenticated: false,
            loading: false,
            user: null,
          });
        }
      } else {
        setAuth({
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
        });
      }
    };

    loadUser();
  }, []);

  const register = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      console.log('Token set in localStorage after register:', res.data.token);
      setAuth((prevState) => ({
        ...prevState,
        token: res.data.token,
        isAuthenticated: true,
        loading: false,
        user: res.data.user,
      }));
    } catch (err) {
      console.error('Error during registration:', err.response.data);
      setAuth({
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      });
    }
  };

  const navigate = useNavigate();

  const login = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      console.log('Token set in localStorage after login:', res.data.token);
      setAuth((prevState) => ({
        ...prevState,
        token: res.data.token,
        isAuthenticated: true,
        loading: false,
        user: res.data.user,
      }));
      navigate('/');
    } catch (err) {
      console.error('Error during login:', err.response.data);
      setAuth({
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({
      token: null,
      isAuthenticated: false,
      loading: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };