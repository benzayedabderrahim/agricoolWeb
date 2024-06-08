import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './components/css/profilcom.css';
import Navigation from './components/naviagtionbar';

function Profilcommerçant() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('Identifiant utilisateur introuvable dans le stockage local');
        }
        const response = await axios.get(`http://localhost:3001/profile/${userId}`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!userData) {
    return <div>Erreur : Impossible de récupérer les données utilisateur</div>;
  }

  return (
    <>
      <Navigation />
      <br /> <br />
      <div className="profile-container">
        <h2>Profil de {userData.prenom}</h2>
        <a href="/editerprofil" className="edit-icon"><i className="fas fa-edit"></i></a>
        <div className="user-info">
          <div className="user-avatar">
            <img
              src={`http://localhost:3001/uploads/${userData.photo}`}
              alt="Utilisateur"
              className="avatar-image" 
            />
          </div>
          <div className="user-details">
            <h2>Nom : {userData.nom}</h2>
            <h2>Prénom : {userData.prenom}</h2>
            <h2>Email : {userData.email}</h2>
            <h2>Numéro de téléphone : {userData.numtelephone}</h2>
          </div>
        </div>
      </div>
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
    </>
  );
}

export default Profilcommerçant;
