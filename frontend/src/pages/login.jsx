import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../fichiercss/login.css';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './pics/logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      if (response.status === 200 && response.data.message === "Login successful") {
        const { userId, userType } = response.data;
        localStorage.setItem('userId', userId);
        if (userType === 'commeragricole') {
          navigate("/homepage");
        } else if (userType === 'agriculteur') {
          navigate("/home");
        } else if (userType === 'admin') { 
          navigate("/adminHome");
        }
      } else {
        setLoginError(true);
        alert(response.data.message); 
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginError(true);
    }
  };
  
  return (
      <div className="container-xl"> 
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <a href="/about" title="About Us">
                    <img src={logo} alt="Logo" style={{ width: '200px', height: 'auto' }} /> 
                  </a>
                </div>
                <h2 className="text-center mb-4">Connexion</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input type="email" className="form-control form-control-lg" style={{ width: '100%' }} placeholder="Adresse e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="mb-4">
                    <input type="password" className="form-control form-control-lg" style={{ width: '100%' }} placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg btn-block">Se connecter</button>
                  {loginError && <p className="text-danger mt-3">Email ou mot de passe incorrect</p>}
                </form>
                <p className="text-center mt-4 mb-0">Vous n'avez pas de compte ? <a href="/signup" style={{ color: 'green' }}>Inscrivez-vous ici</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Login;
