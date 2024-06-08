import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaCheck } from 'react-icons/fa';
import '../fichiercss/panieragriculteur.css';
import Navigation from '../components/navbar';

function Panieragriculteur() {
  const [panier, setPanier] = useState([]);

  useEffect(() => {
    fetchPanier();
  }, []);

  const fetchPanier = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:3001/panier/${userId}`);
      const panierData = response.data.map(item => ({
        idPanieragriculteur: item.idPanieragriculteur,
        terrain: item.Terrain ? {
          photo1: item.Terrain.photo1 ? `http://localhost:3001/uploads/${item.Terrain.photo1}` : null,
          prixTerrain: item.Terrain.prixTerrain,
          titreTerrain: item.Terrain.titreTerrain
        } : null
      }));

      setPanier(panierData);
    } catch (error) {
      console.error('Erreur lors de la récupération du panier :', error);
    }
  };

  const handleDelete = async (idPanieragriculteur) => {
    const confirmation = window.confirm('Voulez-vous supprimer ce terrain du panier ?');
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:3001/panier/${idPanieragriculteur}`);
        fetchPanier();
        console.log('Terrain supprimé avec succès');
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'élément du panier :', error);
      }
    }
  };

  const handleValidate = async (idPanieragriculteur) => {
    try {
      await axios.put(`http://localhost:3001/panier/${idPanieragriculteur}`);
      fetchPanier(); 
    } catch (error) {
      console.error('Erreur lors de la validation de l\'élément du panier :', error);
    }
  };

  return (
    <div>
      <Navigation />
      <br /> <br />
    <div> <br /> <br />
      <h1>Votre panier</h1> <br /> <br />
      <div className="cart-container">
        <div className="cart-items">
          {panier.length === 0 ? (
            <div className="empty-cart-container">
            <p className="empty-cart-message">Pas d'éléments dans votre panier</p>
            <a href='/listedeterrains' className='browse-offers-button'>Consulter les offres des terrains</a>
          </div>
          ) : (
            panier.map((item) => (
              <div key={item.idPanieragriculteur} className="cart-item">
                <div className="item-photo">
                  {item.terrain && item.terrain.photo1 && <img src={item.terrain.photo1} alt="Terrain" />}
                </div>
                <div className="item-details">
                  <p className="item-name">{item.terrain && item.terrain.titreTerrain}</p>
                  <p className="item-price">{item.terrain && item.terrain.prixTerrain} DT</p>
                </div>
                <div className="item-actions">
                  <button className="delete-button" onClick={() => handleDelete(item.idPanieragriculteur)}><FaTrash /></button>
                  <button className="validate-button" onClick={() => handleValidate(item.idPanieragriculteur)}><FaCheck /></button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Panieragriculteur;
