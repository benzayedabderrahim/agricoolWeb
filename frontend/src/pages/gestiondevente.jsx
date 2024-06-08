import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaEnvelope } from 'react-icons/fa';
import '../fichiercss/gestiondevente.css';

function Gestiondevente() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:3001/gestiondeventes/produits?userId=${userId}`);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits :', error);
      setError('Erreur lors de la récupération des produits. Veuillez réessayer.');
      setLoading(false);
    }
  };

  const handleDelete = async (productId, commerId) => {
    try {
      await axios.delete(`http://localhost:3001/gestiondeventes/panier/${productId}/${commerId}`);
      fetchProducts();
    } catch (error) {
      console.error('Erreur lors de la suppression du produit du panier :', error);
    }
  };

  const handleAccept = async (productId, commerId) => {
    try {
      await axios.put(`http://localhost:3001/gestiondeventes/panier/${productId}/${commerId}`);
      fetchProducts();
    } catch (error) {
      console.error('Erreur lors de l\'acceptation du produit :', error);
    }
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="gestion-de-vente">
      <br />
      <br />
      <h1>Gestion de vente</h1>
      <br />
      <br />
      {Array.isArray(products.produits) && products.produits.map(product => (
        <div key={product.idProduit} className="product-table">
          <table>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Nom Produit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><img style={{ height: '100%' }} src={`http://localhost:3001/uploads/${product.photo}`} alt={product.nomProduit} /></td>
                <td>{product.nomProduit}</td>
              </tr>
              <tr>
                <td colSpan="2">
                  <br />
                  <br />
                  <h3 style={{ textAlign: 'center' }}>Acheteurs</h3>
                  {Array.isArray(products.panierCommercantsProducts) &&
                    products.panierCommercantsProducts
                      .filter(commer => commer.idProduit === product.idProduit)
                      .map(commer => (
                        <div key={commer.idCM} className="commeragricole-info">
                          {commer.Commeragricole && (
                            <>
                              <img style={{ width: '100%' }} src={`http://localhost:3001/uploads/${commer.Commeragricole.photo}`} alt={`${commer.Commeragricole.nom} ${commer.Commeragricole.prenom}`} />
                              <div className='nom'><strong>Nom:</strong> {commer.Commeragricole.nom}</div>
                              <div className='prenom'><strong>Prénom:</strong> {commer.Commeragricole.prenom}</div>
                              <div className='quantite'><strong>Quantité:</strong> {commer.Commandes && commer.Commandes.find(cmd => cmd.idProduit === product.idProduit && cmd.idPanierCM === commer.idPanierCM)?.Quantite}</div>
                            </>
                          )}
                          <div className="button-container">
                            <button className="delete-button" onClick={() => handleDelete(product.idProduit, commer.idCM)}><FaTrashAlt /></button>
                            <button className="accept-button" title="Démarrer une conversation" onClick={() => handleAccept(product.idProduit, commer.idCM)}><FaEnvelope /></button>
                          </div>
                        </div>
                      ))}
                  {Array.isArray(products.panierCommercantsProducts) && products.panierCommercantsProducts.filter(commer => commer.idProduit === product.idProduit).length === 0 && (
                    <> <br /> <h4 style={{ textAlign: 'center' }}>Pas d'acheteurs pour ce produit</h4> <br /></>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default Gestiondevente;
