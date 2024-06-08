import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../fichiercss/gerepub.css';
import Navigation from '../components/navbar';

function Gerepublication() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('ID utilisateur non trouvé dans le stockage local');
        }
        const response = await axios.get(`http://localhost:3001/gerepublication/${userId}`);
        setPublications(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données des publications:', error);
        setLoading(false);
      }
    };
    fetchPublications();
  }, []);

  const handleEdit = (publication) => {
    setSelectedPublication(publication);
  };

  const handleDelete = async (idPost) => {
    try {
      await axios.delete(`http://localhost:3001/gerepublication/${idPost}`);
      setPublications(publications.filter(publication => publication.idPost !== idPost));
    } catch (error) {
      console.error('Erreur lors de la suppression de la publication:', error);
    }
  };

  const confirmDelete = (idPost) => {
    const confirmDelete = window.confirm("Voulez-vous supprimer cette publication ?");
    if (confirmDelete) {
      handleDelete(idPost);
    }
  };

  const handleCancelEdit = () => {
    setSelectedPublication(null);
  };

  const handleSaveEdit = async (updatedPublication) => {
    try {
      const formData = new FormData();
      formData.append('titre', updatedPublication.titre);
      formData.append('pubText', updatedPublication.pubText);
      if (photoFile) {
        formData.append('photo', photoFile); 
      }

      await axios.put(`http://localhost:3001/gerepublication/${updatedPublication.idPost}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' 
        }
      });

      const response = await axios.get(`http://localhost:3001/gerepublication/${updatedPublication.idAgriculteur}`);
      setPublications(response.data);
      setSelectedPublication(null);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données de la publication:', error);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedPublication({
          ...selectedPublication,
          photo: reader.result 
        });
      };
      reader.readAsDataURL(file); 
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <Navigation />
    <div className="publication-list-container">
      <h2>Votre liste de publications</h2>
      <table className="publication-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Titre</th>
            <th>Texte</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {publications.map((publication) => (
            <tr key={publication.idPost}>
              <td>
                {publication.photo ? (
                  <img src={`http://localhost:3001/${publication.photo}`} alt="Publication" />
                ) : (
                  <div className="photo-icon">
                    <i className="fas fa-photo"></i>
                  </div>
                )}
              </td>
              <td>{publication.titre}</td>
              <td>{publication.pubText}</td>
              <td className="actions">
                <button onClick={() => handleEdit(publication)}><FaEdit className="action-icon" /></button>
                <button onClick={() => confirmDelete(publication.idPost)}><FaTrash className="action-icon" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPublication && (
        <div className="edit-publication">
          <h3>Modifier la publication</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSaveEdit(selectedPublication);
          }}>
            <div className="form-field">
              <label htmlFor="titre">Titre :</label>
              <input type="text" id="titre" name="titre" value={selectedPublication.titre} onChange={(e) => setSelectedPublication({ ...selectedPublication, titre: e.target.value })} />
            </div>
            <div className="form-field">
              <label htmlFor="pubText">Texte :</label>
              <textarea id="pubText" name="pubText" value={selectedPublication.pubText} onChange={(e) => setSelectedPublication({ ...selectedPublication, pubText: e.target.value })}></textarea>
            </div>
            <div className="form-field">
              <label htmlFor="photo" className="file-input-label">
                <i className="fas fa-upload"></i> Télécharger une nouvelle photo
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                className="file-input"
                onChange={handlePhotoChange} 
              />
            </div>
            <div className="form-buttons">
              <button type="submit">Enregistrer</button>
              <button onClick={handleCancelEdit}>Annuler</button>
            </div>
          </form>
        </div>
      )}
    </div>
    </div>
  );
}

export default Gerepublication;
