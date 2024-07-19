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
      if (localStorage.token) {
        setAuth((prevState) => ({
          ...prevState,
          token: localStorage.token,
        }));

        try {
          const res = await axios.get('http://localhost:5000/api/auth/user', {
            headers: {
              'x-auth-token': localStorage.token,
            },
          });
          setAuth({
            token: localStorage.token,
            isAuthenticated: true,
            loading: false,
            user: res.data,
          });
        } catch (err) {
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
      setAuth((prevState) => ({
        ...prevState,
        ...res.data,
        isAuthenticated: true,
        loading: false,
      }));
    } catch (err) {
      console.error(err.response.data);
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
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      setAuth((prevState) => ({
        ...prevState,
        ...res.data,
        isAuthenticated: true,
        loading: false,
      }));
      navigate('/');
      console.log('Logged in');
    } catch (err) {
      console.error(err.response.data);
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
