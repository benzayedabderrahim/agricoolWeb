import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Discussion() {
  const [comMessage, setComMessage] = useState('');
  const [agrMessage, setAgrMessage] = useState('');
  const [discussions, setDiscussions] = useState([]);
  const [commeragricoles, setCommerAgricoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState('');

  useEffect(() => {
    fetchDiscussions();
    fetchCommerAgricoles();
    setUserType(localStorage.getItem('userType')); // Assuming you store userType in localStorage
  }, []);

  const fetchDiscussions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/messages/discussions');
      setDiscussions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des discussions:', error);
      setError('Erreur lors de la récupération des discussions. Veuillez réessayer.');
      setLoading(false);
    }
  };

  const fetchCommerAgricoles = async () => {
    try {
      const response = await axios.get('http://localhost:3001/messages/commeragricoles');
      setCommerAgricoles(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des commerçants agricoles:', error);
      setError('Erreur lors de la récupération des commerçants agricoles. Veuillez réessayer.');
    }
  };

  const handleConversationStart = async (commerId) => {
    try {
      // Logique pour démarrer une conversation avec le commerçant agricole sélectionné
    } catch (error) {
      console.error('Erreur lors du démarrage de la conversation:', error);
      setError('Erreur lors du démarrage de la conversation. Veuillez réessayer.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/messages/discussion', {
        message: userType === 'agriculteur' ? comMessage : agrMessage
      });
      console.log(response.data);
      // Rafraîchir les discussions après avoir soumis une nouvelle discussion
      fetchDiscussions();
    } catch (error) {
      console.error('Erreur lors de la création de la discussion:', error);
      setError('Erreur lors de la création de la discussion. Veuillez réessayer.');
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div>
      <h1>Page de discussion</h1>
      <form onSubmit={handleSubmit}>
        {userType === 'agriculteur' ? (
          <label>
            Message Com :
            <input type="text" value={comMessage} onChange={(e) => setComMessage(e.target.value)} />
          </label>
        ) : (
          <label>
            Message Agr :
            <input type="text" value={agrMessage} onChange={(e) => setAgrMessage(e.target.value)} />
          </label>
        )}
        <br />
        <button type="submit">Soumettre</button>
      </form>

      <h2>Commerçants agricoles :</h2>
      <ul>
        {commeragricoles.map((commer) => (
          <li key={commer.idCM} onClick={() => handleConversationStart(commer.idCM)}>
            Nom : {commer.nom}<br />
            Prénom : {commer.prenom}<br />
            <img src={`http://localhost:3001/uploads/${commer.photo}`} alt={commer.nom} />
          </li>
        ))}
      </ul>

      <h2>Discussions :</h2>
      <ul>
        {discussions.map((discussion) => (
          <li key={discussion.idConver}>
            ID utilisateur : {discussion.userId}<br />
            Message : {userType === 'agriculteur' ? discussion.comMessage : discussion.agrMessage}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Discussion;
