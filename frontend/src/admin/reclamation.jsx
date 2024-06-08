import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Reclamation() {
  const [reclamations, setReclamations] = useState([]);

  useEffect(() => {
    const fetchReclamations = async () => {
      try {
        const response = await axios.get('http://localhost:3001/rec/reclamations');
        setReclamations(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des réclamations :', error);
      }
    };

    fetchReclamations();
  }, []);

  return (
    <div>
      <h1>Réclamations</h1>
      <br /> <br />
      <table>
        <thead>
          <tr>
            <th>Photo de publication</th>
            <th>Objet</th>
            <th>Nom d'Agriculteur</th>
            <th>Prénom d'Agriculteur</th>
          </tr>
        </thead>
        <tbody>
          {reclamations.map((reclamation) => (
            <tr key={reclamation.idPost}>
              <td>
                {reclamation.Publication && reclamation.Publication.photo && (
                  <img src={`http://localhost:3001/${reclamation.Publication.photo}`} alt="Publication" style={{ maxWidth: '100px' }} />
                )}
              </td>
              <td>{reclamation.TextReclamation}</td>
              <td>
                {reclamation.Agriculteur ? reclamation.Agriculteur.nom : 'Agriculteur inconnu'}
              </td>
              <td>
                {reclamation.Agriculteur ? reclamation.Agriculteur.prenom : 'Prénom inconnu'}
              </td>
              <td>
              <Link to={`/dec/${reclamation.idPost}`}>
                  <FaSearch />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reclamation;
