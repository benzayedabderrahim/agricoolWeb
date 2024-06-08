import React, { useState } from 'react';
import axios from 'axios';
import '../fichiercss/ajouterpublication.css';
import Navigation from '../components/navbar';

function Addpost() {
    const userId = localStorage.getItem('userId');
    const [titre, setTitre] = useState('');
    const [pubText, setPubText] = useState('');
    const [photo, setPhoto] = useState(null);
    const [video, setVideo] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('titre', titre);
            formData.append('pubText', pubText);
            formData.append('idAgriculteur', userId);
            formData.append('photo', photo);
            formData.append('video', video);

            const response = await axios.post('http://localhost:3001/ajouterpublication', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Article ajouté avec succès', response.data);
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'article:', error);
        }
    };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleVideoChange = (e) => {
        setVideo(e.target.files[0]);
    };

    return (
        <div>
            <Navigation />
        <div className="form-container"> 
            <form onSubmit={handleSubmit} className="post-form">
            <br /> <br />
                <h1 className="form-title">Ajouter une publication</h1>
                <label className="form-label">Titre de publication:
                    <input
                        required
                        className="form-input"
                        placeholder='Ajouter le titre de publication'
                        type='text'
                        value={titre}
                        onChange={(e) => setTitre(e.target.value)}
                    />
                </label> <br />
                <label className="form-label">Texte de publication :
                    <textarea
                        required
                        className="form-textarea"
                        placeholder='Ajouter le texte de la publication'
                        value={pubText}
                        onChange={(e) => setPubText(e.target.value)}
                    />
                </label> <br />
                <div className="login__field">
                    <label htmlFor="photo" className="file-input-label">
                        <i className="fas fa-upload"></i> Télécharger une photo
                    </label>
                    <input
                        type="file"
                        id="photo"
                        name="photo"
                        accept="image/*"
                        className="file-input"
                        onChange={handlePhotoChange}
                    />
                </div> <br /> <h5>Et/Ou </h5>
                <div className="login__field">
                    <label htmlFor="video" className="file-input-label">
                        <i className="fas fa-upload"></i> Télécharger une vidéo
                    </label>
                    <input
                        type="file"
                        id="video"
                        name="video"
                        accept="video/*"
                        className="file-input"
                        onChange={handleVideoChange}
                    />
                </div> 
                <button type="submit" className="form-submit-btn">Ajouter la publication</button> 
            </form>
        </div>
        </div>
    );
}

export default Addpost;
