import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../fichiercss/editprofil.css';

function Editerprofil() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    numtelephone: '',
    password: '',
    photo: null
  });
  const [photoFile, setPhotoFile] = useState(null); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('ID utilisateur non trouvé dans le stockage local');
        }
        const response = await axios.get(`http://localhost:3001/profile/${userId}`);
        setUserData(response.data);
        setFormData({
          nom: response.data.nom,
          prenom: response.data.prenom,
          email: response.data.email,
          numtelephone: response.data.numtelephone,
          password: '',
          photo: null
        });
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prevFormData => ({
          ...prevFormData,
          photo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        photo: null
      }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('ID utilisateur non trouvé dans le stockage local');
      }
      const formDataWithPhoto = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataWithPhoto.append(key, value);
      });
      if (photoFile) {
        formDataWithPhoto.append('photo', photoFile);
      }

      await axios.put(`http://localhost:3001/editprofil/${userId}`, formDataWithPhoto);
      navigate('/profil');
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données utilisateur:', error);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!userData) {
    return <div>Erreur : Impossible de récupérer les données utilisateur</div>;
  }

  return (
    <div className="update-profile">
      <h1>Editer Profil</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <br /><br />
          <label htmlFor="photo">Photo :</label>
          <input type="file" id="photo" name="photo" onChange={handlePhotoChange} />
          {userData.photo && (
            <div className="current-photo">
              <img src={`http://localhost:3001/uploads/${userData.photo}`} alt="Utilisateur actuel" />
              <span>Photo actuelle</span>
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="nom">Nom :</label>
          <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="prenom">Prénom :</label>
          <input type="text" id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="numtelephone">Numéro de téléphone :</label>
          <input type="tel" id="numtelephone" name="numtelephone" value={formData.numtelephone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe :</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
}

export default Editerprofil;
