import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Register';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import './App.css';

const App = () => {
  return (
    <Router>
      
        <AuthProvider>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </AuthProvider>
      
    </Router>
  );
};

export default App;