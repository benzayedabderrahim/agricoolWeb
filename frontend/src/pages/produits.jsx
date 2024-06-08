import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import '../fichiercss/ajouterproduit.css';
import Navigation from '../components/navbar';

function AjouterProduit() {
    const userId = localStorage.getItem('userId');
    const [productName, setProductName] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [productType, setProductType] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productq, setProductq] = useState('');
    const [productPhoto, setProductPhoto] = useState(null);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('nomProduit', productName);
            formData.append('description', productDesc);
            formData.append('marque', productType);
            formData.append('prix', parseInt(productPrice));
            formData.append('idAgriculteur', userId);
            formData.append('photo', productPhoto);
            formData.append('quantite', productq);
            
            const response = await axios.post('http://localhost:3001/ajouterproduit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Produit ajouté avec succès', response.data);
            navigate('/vosproduits');
        } catch (error) {
            console.error('Erreur lors de l\'ajout du produit :', error);
        }
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        setProductPhoto(file);
    };

    return (
        <div>
        <Navigation />
        <div className="container-xl">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card-body p-5">
                        <div className="text-center mb-4"></div>
                        <form onSubmit={handleSubmit} className="product-form">
                            <h1>Ajouter un nouveau produit</h1>
                            <br />
                            <br />
                            <label>Nom du produit:
                                <input
                                    required
                                    placeholder='Ajouter le nom du produit'
                                    type='text'
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </label>
                            <br />
                            <label>Description :
                                <textarea
                                    required
                                    placeholder='Ajouter la description de ce produit'
                                    value={productDesc}
                                    onChange={(e) => setProductDesc(e.target.value)}
                                />
                            </label>
                            <br />
                            <label>Marque :
                                <input
                                    required
                                    placeholder='Ajouter la marque/type de ce produit'
                                    type='text'
                                    value={productType}
                                    onChange={(e) => setProductType(e.target.value)}
                                />
                            </label>
                            <br />
                            <label>Quantite en KG/Litre :
                                <input
                                    required
                                    placeholder='Ajouter la quantite de ce produit (en KG/Litre)'
                                    type='number'
                                    value={productq}
                                    onChange={(e) => setProductq(e.target.value)}
                                />
                            </label>
                            <br />
                            <label>Prix :
                                <input
                                    required
                                    placeholder='Ajouter le prix de ce produit'
                                    type='number'
                                    value={productPrice}
                                    onChange={(e) => setProductPrice(e.target.value)}
                                />
                            </label>
                            <br />
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
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit" className="submit-button">Ajouter le produit</button>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default AjouterProduit;
