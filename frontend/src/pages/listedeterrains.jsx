import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../fichiercss/listedeterrains.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaExclamationTriangle } from 'react-icons/fa';
import Navigation from '../components/navbar';

function Listedeterrains() {
    const [terrains, setTerrains] = useState([]);
    const [userId, setUserId] = useState(null);
    const [reclamationTerrainId, setReclamationTerrainId] = useState(null);
    const [reclamationText, setReclamationText] = useState("");

    useEffect(() => {
        const fetchUserId = () => {
            const storedUserId = localStorage.getItem('userId');
            if (storedUserId) {
                setUserId(storedUserId);
            }
        };

        const fetchTerrains = async () => {
            try {
                const response = await axios.get('http://localhost:3001/listeterrain');
                console.log('Terrains :', response.data);
                setTerrains(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des terrains :', error);
            }
        };

        fetchUserId();
        fetchTerrains();
    }, []);

    const addToCart = async (idTerrain, idAgriculteur) => {
        try {
            const storedUserId = localStorage.getItem('userId');
            console.log('User ID:', storedUserId);
            console.log('Terrain Agricultor ID:', idAgriculteur);

            if (!storedUserId) {
                console.error('ID utilisateur introuvable dans localStorage');
                return;
            }

            if (storedUserId === String(idAgriculteur)) {
                alert("Impossible d'ajouter votre propre terrain au panier !");
                return;
            }

            const response = await axios.post('http://localhost:3001/listeterrain/ajouterAuPanier', { userId: storedUserId, idTerrain, idAgriculteur });
            console.log('Response:', response.data);

            if (response.data.exists) {
                alert(response.data.message);
            } else {
                console.log('Terrain ajouté au panier :', response.data);
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout du terrain au panier :', error);
        }
    };

    const handleReclamation = (idTerrain) => {
        setReclamationTerrainId(idTerrain);
    };

    const handleSendReclamation = async () => {
        try {
            const storedUserId = localStorage.getItem('userId');
            if (!storedUserId || !reclamationTerrainId || !reclamationText) {
                alert("Veuillez remplir tous les champs !");
                return;
            }

            const response = await axios.post('http://localhost:3001/listeterrain/reclamation', {
                idAgriculteur: storedUserId,
                idTerrain: reclamationTerrainId,
                objet: reclamationText
            });

            console.log('Réclamation envoyée :', response.data);
            alert("Votre réclamation a été envoyée avec succès");
            setReclamationTerrainId(null);
            setReclamationText("");
        } catch (error) {
            console.error('Erreur lors de l\'envoi de la réclamation :', error);
        }
    };

    const handleCancelReclamation = () => {
        setReclamationTerrainId(null);
        setReclamationText("");
    };

    return (
        <div>
            <Navigation />
            <br />
        <div className="terrain-list-container">
            <h1 style={{fontFamily:'Arial, sans-serif;'}}>Offres des Terrains</h1>
            <br />
            <div className="terrain-list">
                {terrains.map((terrain, index) => (
                    <div className="terrain-item" key={index}>
                        <FaExclamationTriangle
                            className={`report-icon ${userId === String(terrain.idAgriculteur) ? 'disabled' : ''}`}
                            title="Signaler cette offre"
                            onClick={() => handleReclamation(terrain.idTerrain)}
                            style={{ cursor: userId === String(terrain.idAgriculteur) ? 'not-allowed' : 'pointer' }}
                        />
                        <p className="terrain-owner">
                            <img 
                                src={`http://localhost:3001/uploads/${terrain.Agriculteur.photo}`}
                                alt="Utilisateur"
                                className="avatarimage" 
                            />
                            {terrain.Agriculteur.nom} {terrain.Agriculteur.prenom}
                        </p>
                        <h2 className="terrain-title">{terrain.titreTerrain}</h2>
                        <p className="terrain-description">{terrain.description}</p>
                        <p className="terrain-phone">Numéro de téléphone : {terrain.Agriculteur.numtelephone}</p>
                        <p className="terrain-price">Prix: {terrain.prixTerrain} dt</p>
                        <div className="terrain-images">
                            <img src={`http://localhost:3001/uploads/${terrain.photo1}`} alt="Terrain" className="terrain-image" />
                            <img src={`http://localhost:3001/uploads/${terrain.photo2}`} alt="Terrain" className="terrain-image" />
                        </div>
                        <button className="add-to-cart-button" onClick={() => addToCart(terrain.idTerrain, terrain.idAgriculteur)}>Ajouter au panier</button>
                        <hr className="terrain-divider" />
                        {reclamationTerrainId === terrain.idTerrain && (
                            <div className="reclamation-form">
                                <textarea value={reclamationText} onChange={(e) => setReclamationText(e.target.value)} placeholder="Décrivez votre réclamation" className="form-control mb-2"></textarea>
                                <button onClick={handleSendReclamation} className="btn btn-primary mr-2">Envoyer</button>
                                <button onClick={handleCancelReclamation} className="btn btn-secondary">Annuler</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}

export default Listedeterrains;
