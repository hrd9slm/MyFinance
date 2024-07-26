import { createContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
  });

  

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get("http://localhost:5000/api/auth/user", {
            headers: {
              "Authorization": `Bearer ${token}`, 
            },
          });
          setAuth({
            token,
            isAuthenticated: true,
            loading: false,
            user: res.data,
          });
        } catch (err) {
           localStorage.removeItem("token");
           setAuth({
             token: null,
             isAuthenticated: false,
             loading: false,
             user: null,
           });
          console.log("err http://localhost:5000/api/auth/user")
          console.log(err);
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
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      localStorage.setItem("token", res.data.token);
      setAuth((prevState) => ({
        ...prevState,
        token: res.data.token,
        isAuthenticated: true,
        loading: false,
        user: res.data.user,
      }));
      navigate("/profile");
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
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      console.log("Token after login:", res.data.token);
      localStorage.setItem("token", res.data.token);
      setAuth((prevState) => ({
        ...prevState,
        token: res.data.token,
        isAuthenticated: true,
        loading: false,
        user: res.data.user,
      }));
      navigate("/");
      console.log("Logged in");
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
    localStorage.removeItem("token");
    setAuth({
      token: null,
      isAuthenticated: false,
      loading: false,
      user: null,
    });
  };

  useEffect(() => {
    // Log the current state of 'auth' and 'localStorage' token
    console.log("Auth state after refresh:", auth);
    console.log("Token in localStorage:", localStorage.getItem("token"));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };