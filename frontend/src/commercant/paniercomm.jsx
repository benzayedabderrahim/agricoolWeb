import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaCheck, FaEdit } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/css/paniercommercant.css';
import Navigation from './components/naviagtionbar';

function Paniercommercant() {
  const [panier, setPanier] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [newQuantite, setNewQuantite] = useState('');
  const [quantiteError, setQuantiteError] = useState(null);

  useEffect(() => {
    fetchPanier();
  }, []);

  const fetchPanier = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:3001/paniercommercant/${userId}`);
      setPanier(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération du panier :', error);
      setError('Erreur lors de la récupération du panier');
      setLoading(false);
    }
  };

  const handleDelete = async (idPanierCM) => {
    const confirmation = window.confirm('Voulez-vous supprimer cet article du panier ?');
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:3001/paniercommercant/supprimer/${idPanierCM}`);
        fetchPanier();
        console.log('Article supprimé avec succès');
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'article du panier :', error);
      }
    }
  };

  const handleValidate = async (idPanierCM, idProduit) => {
    try {
      const response = await axios.put(`http://localhost:3001/paniercommercant/valider/${idPanierCM}/${idProduit}`);
      if (response.data && response.data.newIdPanierCM) {
        fetchPanier(); // Re-fetch the cart to update the state
      }
    } catch (error) {
      console.error('Erreur lors de la validation de l\'article :', error);
      alert('Erreur lors de la validation de l\'article');
    }
  };

  const handleUpdateQuantite = async (idPanierCM, idProduit) => {
    try {
      const response = await axios.put(`http://localhost:3001/paniercommercant/modifier/${idPanierCM}/${idProduit}`, {
        newQuantite
      });
      if (response.data.success) {
        fetchPanier(); // Re-fetch the cart to update the state
        setEditingItem(null); // Exit editing mode
        setQuantiteError(null); // Clear any previous error
      } else {
        setQuantiteError(response.data.error);
      }
    } catch (error) {
      console.error('Erreur lors de la modification de la quantité :', error);
      alert('Erreur lors de la modification de la quantité');
    }
  };

  return (
    <div>
      <Navigation />
      <br /> <br />
    <div className="panier-container">
      <br /> <br /> <br />
      <h1 className="panier-title">Votre panier</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="cart-items-container row">
          {panier.length === 0 ? (
            <p>Pas d'articles dans votre panier</p>
          ) : (
            panier.map((item) => (
              <div key={item.idPanierCM} className="cart-item col-md-4">
                <div className="item-photo">
                  {item.Produit && item.Produit.photo && (
                    <img src={`http://localhost:3001/uploads/${item.Produit.photo}`} alt="Produit" />
                  )}
                </div>
                <div className="item-details">
                  <p className="item-name">{item.Produit.nomProduit}</p>
                  <p className="item-price"><strong>Prix unitaire :</strong> {item.Produit.prix} DT</p>
                  {item.Commandes.map((commande, index) => (
                    <div key={index}>
                      <p className="item-quantity"><strong>Quantité :</strong> {commande.Quantite}</p>
                      <p className="item-total-price"><strong>Prix Total :</strong> {item.Produit.prix * commande.Quantite} DT</p>
                      {editingItem === item.idPanierCM ? (
                        <div className="input-group my-3">
                          <input
                            type="number"
                            className="form-control"
                            value={newQuantite}
                            onChange={(e) => setNewQuantite(e.target.value)}
                          />
                          <div className="input-group-append">
                            <button className="btn btn-success" onClick={() => handleUpdateQuantite(item.idPanierCM, item.idProduit)}>Mettre à jour</button>
                          </div>
                        </div>
                      ) : (
                        item.idPanierCM < 1000 && ( 
                          <button className="modify-button btn btn-info" onClick={() => { setEditingItem(item.idPanierCM); setNewQuantite(commande.Quantite); }}>
                            <FaEdit />
                          </button>
                        )
                      )}
                      {quantiteError && editingItem === item.idPanierCM && <h1 className="text-danger">{quantiteError}</h1>}
                    </div>
                  ))}

                  {item.idPanierCM >= 1000 ? (
                    <h1 className="validated-status">Validé</h1>
                  ) : (
                    <button className="validate-button btn btn-primary" onClick={() => handleValidate(item.idPanierCM, item.idProduit)}>
                      <FaCheck />
                    </button>
                  )}
                </div>
                <div className="item-actions">
                  <button className="delete-button btn btn-danger" onClick={() => handleDelete(item.idPanierCM)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
    </div>
  );
}

export default Paniercommercant;
