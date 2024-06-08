import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap'; 
import './css/decision.css';

function Decision() {
  const [reclamation, setReclamation] = useState(null);
  const location = useLocation();
  const idPost = location.pathname.split('/').pop(); // Extracting idPost from URL

  useEffect(() => {
    const fetchReclamationData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/rec/reclamations/publication/${idPost}`);
        const reclamationData = response.data;

        setReclamation(reclamationData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de la réclamation :', error);
      }
    };

    if (idPost) {
      fetchReclamationData();
    }
  }, [idPost]);

  const handleAlert = async () => {
    try {
      await axios.post(`http://localhost:3001/rec/send-alert/${reclamation.publicationData.idAgriculteur}`);
      alert(`Alerte envoyée avec succès à ${reclamation.agriculteurData.prenom} ${reclamation.agriculteurData.nom}`);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'alerte :', error);
      alert('Erreur lors de l\'envoi de l\'alerte. Veuillez réessayer.');
    }
  };
  const handleDelete = () => {
    console.log('Réclamation supprimée');
  };

  if (!reclamation) {
    return <div className="decision-container">Chargement...</div>;
  }

  return (
    <div className="decision-container">
      <h1 className="decision-title">Réclamation</h1>
      <div className="decision-section">
        <h2>Texte de la réclamation :</h2>
        <p>{reclamation.texte}</p>
      </div>
      <div className="decision-section">
        <h2>Publication associée :</h2>
        <p>ID de la publication : {reclamation.idPost}</p>
        <p>Titre de la publication : {reclamation.publicationData.titre}</p>
        <p>Texte de la publication : {reclamation.publicationData.pubText}</p>
        {reclamation.publicationData.photo && <p>Photo de la publication : <br />
         <img src={`http://localhost:3001/${reclamation.publicationData.photo}`} alt="Publication" /></p>}
        {reclamation.publicationData.video && <p>Vidéo de la publication : <video src={reclamation.publicationData.video} controls></video></p>}
        <p>Nom de l'agriculteur : {reclamation.agriculteurData.nom}</p>
        <p>Prénom de l'agriculteur : {reclamation.agriculteurData.prenom}</p>
      </div>
      <div className="decision-button-container">
        <Button className="decision-button" onClick={handleAlert}>Envoyer alerte à {reclamation.agriculteurData.prenom}</Button>
        <Button className="decision-button" variant="danger" onClick={handleDelete}>Supprimer</Button>
        <Button className="decision-button" variant="secondary">Retour</Button>
      </div>
    </div>
  );
}

export default Decision;
