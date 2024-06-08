import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import '../fichiercss/terrainDem.css';
import Navigation from '../components/navbar';

function Terraindemander() {
  const [terrains, setTerrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTerrains();
  }, []);

  const fetchTerrains = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('ID utilisateur non trouvé dans le stockage local');
      }
      const response = await axios.get(`http://localhost:3001/terraindemander?userId=${userId}`);
      setTerrains(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des terrains et des demandeurs d\'offres:', error);
      setError('Erreur lors de la récupération des terrains et des demandeurs d\'offres. Veuillez réessayer.');
      setLoading(false);
    }
  };

  const handleAccept = async (idPanieragriculteur, idTerrain) => {
    try {
      const response = await axios.put(`http://localhost:3001/terraindemander/accepter/${idPanieragriculteur}/${idTerrain}`);
      alert(response.data.message);
      fetchTerrains(); // Re-fetch the terrains to update the state
    } catch (error) {
      console.error('Erreur lors de l\'acceptation du demandeur:', error);
    }
  };

  const handleDelete = async (idPanieragriculteur) => {
    try {
      await axios.delete(`http://localhost:3001/terraindemander/${idPanieragriculteur}`);
      fetchTerrains(); // Re-fetch the terrains to update the state
    } catch (error) {
      console.error('Erreur lors de la suppression du demandeur:', error);
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
      <Navigation />
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col">
            <h1 className="text-center mb-5">Liste des demandeurs d'offre</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Numéro de terrain</th>
                    <th>Nom demandeur</th>
                    <th>Prénom demandeur</th>
                    <th>Photo demandeur</th>
                    <th>Décision</th> 
                  </tr>
                </thead>
                <tbody>
                  {terrains.map(terrain => (
                    <React.Fragment key={terrain.idTerrain}>
                      {terrain.demandeursOffres && terrain.demandeursOffres.length > 0 ? (
                        terrain.demandeursOffres.map(demandeur => (
                          <tr key={demandeur.idPanieragriculteur}>
                            <td>{terrain.idTerrain}</td>
                            <td>{demandeur.Agriculteur && demandeur.Agriculteur.nom}</td>
                            <td>{demandeur.Agriculteur && demandeur.Agriculteur.prenom}</td>
                            <td>
                              {demandeur.Agriculteur && (
                                <img src={`http://localhost:3001/uploads/${demandeur.Agriculteur.photo}`} alt={`${demandeur.Agriculteur.nom} ${demandeur.Agriculteur.prenom}`} className="img-fluid smaller-photo" />
                              )}
                            </td>
                            <td>
                              <i
                                className="bi bi-check-circle-fill text-success me-2"
                                onClick={() => handleAccept(demandeur.idPanieragriculteur, terrain.idTerrain)}
                                style={{ cursor: 'pointer' }}
                              ></i> 
                              <i
                                className="bi bi-x-circle-fill text-danger"
                                onClick={() => handleDelete(demandeur.idPanieragriculteur)}
                                style={{ cursor: 'pointer' }}
                              ></i> 
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td>{terrain.idTerrain}</td>
                          <td colSpan="4" className="text-center">Pas des demandeurs d'offres</td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terraindemander;
