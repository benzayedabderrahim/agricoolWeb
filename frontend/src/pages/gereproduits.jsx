import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../fichiercss/gereproduit.css';
import Navigation from '../components/navbar';

function Gereproduits() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('ID utilisateur non trouvé dans le stockage local');
        }
        const response = await axios.get(`http://localhost:3001/gereproduits/${userId}`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données des produits:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:3001/gereproduits/${productId}`);
      setProducts(products.filter(product => product.idProduit !== productId));
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
    }
  };

  const confirmDelete = (productId) => {
    const confirmDelete = window.confirm("Voulez-vous supprimer ce produit ?");
    if (confirmDelete) {
      handleDelete(productId);
    }
  };

  const handleCancelEdit = () => {
    setSelectedProduct(null);
  };

  const handleSaveEdit = async (updatedProduct) => {
    try {
      const formData = new FormData();
      formData.append('nomProduit', updatedProduct.nomProduit);
      formData.append('description', updatedProduct.description);
      formData.append('marque', updatedProduct.marque);
      formData.append('prix', updatedProduct.prix);
      formData.append('quantite', updatedProduct.quantite);
      if (photoFile) {
        formData.append('photo', photoFile);
      }

      await axios.put(`http://localhost:3001/gereproduits/${updatedProduct.idProduit}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const response = await axios.get(`http://localhost:3001/gereproduits/${updatedProduct.idAgriculteur}`);
      setProducts(response.data);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données du produit:', error);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedProduct({
          ...selectedProduct,
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
      <div className="product-list-container">
        <h2>Voici votre liste d'offres</h2>
        <table className="product-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Nom du Produit</th>
              <th>Prix</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.idProduit}>
                <td><img src={`http://localhost:3001/uploads/${product.photo}`} alt="Product" /></td>
                <td>{product.nomProduit}</td>
                <td>{product.prix}</td>
                <td className="actions">
                  <button onClick={() => handleEdit(product)}><FaEdit className="action-icon" /></button>
                  <button onClick={() => confirmDelete(product.idProduit)}><FaTrash className="action-icon" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedProduct && (
          <div className="edit-product">
            <h3>Modifier Produit</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSaveEdit(selectedProduct);
            }}>
              <div>
                <label htmlFor="nomProduit">Nom du Produit:</label>
                <input type="text" id="nomProduit" name="nomProduit" value={selectedProduct.nomProduit} onChange={(e) => setSelectedProduct({ ...selectedProduct, nomProduit: e.target.value })} />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={selectedProduct.description} onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })} />
              </div>
              <div>
                <label htmlFor="marque">Marque:</label>
                <input type="text" id="marque" name="marque" value={selectedProduct.marque} onChange={(e) => setSelectedProduct({ ...selectedProduct, marque: e.target.value })} />
              </div>
              <div>
                <label htmlFor="prix">Prix:</label>
                <input type="number" id="prix" name="prix" value={selectedProduct.prix} onChange={(e) => setSelectedProduct({ ...selectedProduct, prix: parseInt(e.target.value) || 0 })} />
              </div>
              <div>
                <label htmlFor="quantite">Quantité:</label>
                <input type="number" id="quantite" name="quantite" value={selectedProduct.quantite} onChange={(e) => setSelectedProduct({ ...selectedProduct, quantite: parseInt(e.target.value) || 0 })} />
              </div>
              <div>
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
              <div>
                <button type="submit">Enregistrer</button> <br />
                <button type="reset" onClick={handleCancelEdit}>Annuler</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Gereproduits;
