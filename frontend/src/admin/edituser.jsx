import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/edituser.css';

function Edituser() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/editerutilisateur/${id}`);
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des données de l\'utilisateur :', error);
      setError('Erreur lors de la récupération des données de l\'utilisateur. Veuillez réessayer.');
      setLoading(false);
    }
  };


  const handleCancel = () => {
    navigate(-1); 
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  const { nom, prenom, email, numtelephone, photo, isSuspend } = userData;
  const isAgriculteur = userData.hasOwnProperty('isSuspend'); // Check if the user is agriculteur

  return (
    <>
      <br />
      <div className="edit-user-container">
        <h1>Informations Utilisateur</h1> <br />
        <div className="user-details">
          <img src={`http://localhost:3001/uploads/${photo}`} alt={`${nom} ${prenom}`} />
          <div className="info-group">
            <label style={{fontFamily:"Arial"}}>Nom:</label>
            <div style={{fontFamily:"Arial"}}>{nom}</div>
          </div>
          <div className="info-group">
            <label style={{fontFamily:"Arial"}}>Prénom:</label>
            <div style={{fontFamily:"Arial"}}>{prenom}</div>
          </div>
          <div className="info-group">
            <label style={{fontFamily:"Arial"}}>Email:</label>
            <div style={{fontFamily:"Arial"}}>{email}</div>
          </div>
          <div className="info-group">
            <label style={{fontFamily:"Arial"}}>Numéro de téléphone:</label>
            <div style={{fontFamily:"Arial"}}>{numtelephone}</div>
          </div>
          {isAgriculteur && (
            <div className="info-group">
              <label style={{fontFamily:"Arial"}}>Statut:</label>
              <div style={{fontFamily:"Arial"}}>{isSuspend ? 'Suspendu' : 'Non Suspendu'}</div>
            </div>
          )}
          <div className="button-group">
            <button onClick={handleCancel}>Retour</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Edituser;
