import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../fichiercss/gereterrains.css';
import Navigation from '../components/navbar';

function Gereterrains() {
  const [terrains, setTerrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTerrain, setSelectedTerrain] = useState(null);
  const [editedTerrain, setEditedTerrain] = useState(null); 

  useEffect(() => {
    const fetchTerrains = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('ID utilisateur non trouvé dans le stockage local');
        }

        const response = await axios.get(`http://localhost:3001/gereterrains/${userId}`);
        setTerrains(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données des terrains :', error.message);
        setLoading(false);
      }
    };

    fetchTerrains();
  }, []);

  const handleEdit = (terrain) => {
    setSelectedTerrain(terrain);
    setEditedTerrain({ ...terrain }); 
  };

  const handleDelete = async (terrainId) => {
    const confirmDelete = window.confirm('Voulez-vous vraiment supprimer ce terrain ?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/gereterrains/${terrainId}`);
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:3001/gereterrains/${userId}`);
        setTerrains(response.data);
      } catch (error) {
        console.error('Erreur lors de la suppression du terrain :', error.message);
      }
    }
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:3001/gereterrains/${editedTerrain.idTerrain}`, editedTerrain);
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:3001/gereterrains/${userId}`);
      setTerrains(response.data);
      setSelectedTerrain(null);
      setEditedTerrain(null);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données du terrain :', error.message);
    }
  };

  const handleCancelEdit = () => {
    setSelectedTerrain(null);
    setEditedTerrain(null);
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <Navigation />
    <div className="terrain-list-container">
      <h2>Voici votre liste de terrains</h2>
      {terrains.length === 0 ? (
        <div>
          <p>Vous n'avez pas d'offres de terrains.</p> <br /> <br />
          <a href="/ajouterterrain" class="bn3">Ajouter une offre de terrain maintenant !</a> <br /> <br />
        </div>
      ) : (
        <table className="terrain-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Titre du Terrain</th>
              <th>Prix</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {terrains.map((terrain) => (
              <React.Fragment key={terrain.idTerrain}>
                <tr>
                  <td><img src={`http://localhost:3001/uploads/${terrain.photo1}`} alt="Terrain" /></td>
                  <td>{selectedTerrain === terrain ? <input value={editedTerrain.titreTerrain} onChange={(e) => setEditedTerrain({ ...editedTerrain, titreTerrain: e.target.value })} /> : terrain.titreTerrain}</td>
                  <td>{selectedTerrain === terrain ? <input value={editedTerrain.prixTerrain} onChange={(e) => setEditedTerrain({ ...editedTerrain, prixTerrain: e.target.value })} /> : terrain.prixTerrain}</td>
                  <td className="actions">
                    {selectedTerrain === terrain ? (
                      <>
                        <button onClick={handleSaveEdit}>Enregistrer</button>
                        <button onClick={handleCancelEdit}>Annuler</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(terrain)}><FaEdit className="action-icon" /></button>
                        <button onClick={() => handleDelete(terrain.idTerrain)}><FaTrash className="action-icon" /></button>
                      </>
                    )}
                  </td>
                </tr>
                {selectedTerrain === terrain && (
                  <tr>
                    <td colSpan="4">
                      <div>
                        <label>À vendre</label>
                        <input type="radio" value="à vendre" checked={editedTerrain.titreTerrain === 'à vendre'} onChange={() => setEditedTerrain({ ...editedTerrain, titreTerrain: 'à vendre' })} />
                      </div>
                      <div>
                        <label>À louer</label>
                        <input type="radio" value="à louer" checked={editedTerrain.titreTerrain === 'à louer'} onChange={() => setEditedTerrain({ ...editedTerrain, titreTerrain: 'à louer' })} />
                      </div>
                    
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
}

export default Gereterrains;
