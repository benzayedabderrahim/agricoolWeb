import React, { useState } from 'react';
import axios from 'axios';
import '../fichiercss/signup.css';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './pics/logo.png';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    numtelephone: '',
    userType: 'agriculteur',
    photo: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'photo') {
      setFormData({ ...formData, photo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nom', formData.nom);
      formDataToSend.append('prenom', formData.prenom);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('numtelephone', formData.numtelephone);
      formDataToSend.append('userType', formData.userType);
      formDataToSend.append('photo', formData.photo);

      const response = await axios.post('http://localhost:3001/signup', formDataToSend);
      console.log(response.data);
      
      // Show alert and redirect
      window.alert("Vous avez inscrit avec succès, vous pouvez maintenant vous connecter !");
      navigate('/');

    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error.response.data);
    }
  };

  return (
    <div className="container-xxl">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card border-0 shadow-lg">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <img src={logo} alt="Logo" style={{ width: '200px', height: 'auto' }} />
                <h1 className="h3 mt-2">Rejoignez notre famille AgriCOOL !</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Prénom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Numéro de téléphone"
                    name="numtelephone"
                    value={formData.numtelephone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="photo" className="form-label">Télécharger votre photo de profil</label>
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="userType"
                      value="agriculteur"
                      checked={formData.userType === 'agriculteur'}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="agriculteur">Agriculteur</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="userType"
                      value="commercant"
                      checked={formData.userType === 'commercant'}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="commercant">Commerçant</label>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-lg btn-block">S'inscrire</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
