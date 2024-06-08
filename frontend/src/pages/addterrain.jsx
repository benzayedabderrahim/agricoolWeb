import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../fichiercss/addterrain.css';
import Navigation from '../components/navbar';

function AjouterTerrain() {
    const [titreTerrain, setTitreTerrain] = useState('');
    const [description, setDescription] = useState('');
    const [prixTerrain, setPrixTerrain] = useState('');
    const [photo1, setPhoto1] = useState(null);
    const [photo2, setPhoto2] = useState(null);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('titreTerrain', titreTerrain);
        formData.append('description', description);
        formData.append('prixTerrain', prixTerrain);
        formData.append('photo1', photo1);
        formData.append('photo2', photo2);
        formData.append('idAgriculteur', userId);

        try {
            const response = await axios.post('http://localhost:3001/ajouterterrain', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Terrain ajouté avec succès :', response.data);
            navigate('/vosterrains');
            setTitreTerrain('');
            setDescription('');
            setPrixTerrain('');
            setPhoto1(null);
            setPhoto2(null);
        } catch (error) {
            console.error('Erreur lors de l\'ajout du terrain :', error);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === 'photo1') {
            setPhoto1(e.target.files[0]);
        } else if (e.target.name === 'photo2') {
            setPhoto2(e.target.files[0]);
        }
    };

    return (
        <div>
            <Navigation />
        <div className="card">
            <div className="card-header">
                <h2>Ajouter un nouveau terrain</h2>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Titre du terrain :</label>
                        <div className="radio-group">
                            <label><input type="radio" value="à vendre" name="titreTerrain" onChange={(e) => setTitreTerrain(e.target.value)} required /> À vendre</label>
                            <label><input type="radio" value="à louer" name="titreTerrain" onChange={(e) => setTitreTerrain(e.target.value)} required /> À louer</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Description :</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required /> </div>
                    <div className="form-group">
                        <label>Prix :</label>
                        <input type="number" value={prixTerrain} onChange={(e) => setPrixTerrain(e.target.value)} required />
                    </div>
                    <div className="form-group login__field">
                        <label htmlFor="photo1" className="file-input-label">
                            <i className="fas fa-upload"></i> Télécharger votre photo 1
                        </label>
                        <input type="file" id="photo1" name="photo1" accept="image/*" className="file-input" onChange={handleChange}  />
                    </div>
                    <div className="form-group login__field">
                        <label htmlFor="photo2" className="file-input-label">
                            <i className="fas fa-upload"></i> Télécharger votre photo 2
                        </label>
                        <input type="file" id="photo2" name="photo2" accept="image/*" className="file-input" onChange={handleChange} />
                    </div>
                    <button type="submit">Ajouter Terrain</button>
                </form>
            </div>
        </div>
        </div>
    );
}

export default AjouterTerrain;
