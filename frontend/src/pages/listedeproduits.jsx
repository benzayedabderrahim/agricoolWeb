import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../fichiercss/listeproduit.css';
import { FaExclamationTriangle } from 'react-icons/fa';
import Navigation from '../../src/commercant/components/naviagtionbar';

function ListeProduits() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showQuantityInput, setShowQuantityInput] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantityToAdd, setQuantityToAdd] = useState(1);
    const [isQuantityExceeded, setIsQuantityExceeded] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showSignalInput, setShowSignalInput] = useState(false);
    const [signalText, setSignalText] = useState('');
    const [showAddToCartInput, setShowAddToCartInput] = useState(false); // Nouvel état pour contrôler l'affichage du champ de saisie pour "Ajouter au panier"

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3001/listeproduit');
            const filteredProducts = response.data.filter(product => product.quantite > 0);
            setProducts(filteredProducts);
        } catch (error) {
            console.error('Erreur lors de la récupération des produits :', error);
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        setQuantityToAdd(value >= 1 ? value : 1); // Ensure quantity is at least 1
        setIsQuantityExceeded(value > selectedProduct.quantite);
    };

    const handleReportProduct = (product) => {
        setSelectedProduct(product);
        setShowSignalInput(true);
    };

    const handleAddToCart = (product) => { // Nouvelle fonction pour afficher le champ de saisie "Ajouter au panier"
        setSelectedProduct(product);
        setShowAddToCartInput(true);
    };

    const addToCart = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('ID utilisateur introuvable dans localStorage');
                return;
            }
    
            await axios.post('http://localhost:3001/listeproduit/ajouteraupanier', {
                idProduit: selectedProduct.idProduit,
                quantite: quantityToAdd,
                userId: userId 
            });
    
            setAlertMessage('Produit ajouté au panier avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'ajout du produit au panier :', error);
        }
    };

    const handleSignalInputChange = (e) => {
        setSignalText(e.target.value);
    };

    const sendSignal = async () => {
        try {
            await axios.post('http://localhost:3001/listeproduit/signal', {
                idProduit: selectedProduct.idProduit,
                userId: localStorage.getItem('userId'),
                text: signalText
            });
            setShowSignalInput(false);
            setSignalText('');
        } catch (error) {
            console.error('Erreur lors de l\'envoi de la signalisation :', error);
        }
    };

    useEffect(() => {
        if (alertMessage) {
            alert(alertMessage);
            setAlertMessage('');
            window.location.reload(); 
        }
    }, [alertMessage]);

    if (loading) {
        return <div>Chargement en cours...</div>;
    }

    if (products.length === 0) {
        return <div>Aucun produit disponible.</div>;
    }

    return (
        <div>
            <Navigation />
            <br /> <br />
            <div className="product-list-container">
                <h1>Produits</h1>
                <br /><br />
                <div className="product-grid">
                    {products.map((product, index) => (
                        <div className="product-card" key={index}>
                            <FaExclamationTriangle className="report-icon" title="Signaler cette offre" onClick={() => handleReportProduct(product)} />
                            <div className="product-header">
                                <img
                                    src={`http://localhost:3001/uploads/${product.Agriculteur.photo}`}
                                    alt="Utilisateur"
                                    className="avatar-image"
                                />
                                <div className="agriculteur-info">
                                    <span>{product.Agriculteur.nom} {product.Agriculteur.prenom}</span>
                                </div>
                            </div>
                            <div className="product-body">
                                <h2>{product.nomProduit}</h2>
                                <p>{product.description}</p>
                                <p id='marque'>Marque: {product.marque}</p>
                                <p id='marque'>Quantité disponible: {product.quantite} KG/Litre</p>
                                <p id='prix'>Prix: {product.prix}  Dinar tunisien /L'unité</p>
                                <img
                                    src={`http://localhost:3001/uploads/${product.photo}`}
                                    alt="Produit"
                                    className="product-image"
                                />
                            </div> <br />
                            {!showSignalInput && ( // Contrôle de l'affichage du bouton "Ajouter au panier"
                                <button 
                                    className="button"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Ajouter au panier
                                </button>
                                )}
                                {showSignalInput && selectedProduct === product && (
                                    <div className="signal-input">
                                        <input
                                            type="text"
                                            value={signalText}
                                            onChange={handleSignalInputChange}
                                        />
                                        <button onClick={sendSignal}>Envoyer</button>
                                        <button onClick={() => setShowSignalInput(false)}>Annuler</button>
                                    </div>
                                )}
                                {showAddToCartInput && selectedProduct === product && ( // Affichage du champ de saisie "Ajouter au panier"
                                    <div className="quantity-input">
                                        <input
                                            type="number"
                                            value={quantityToAdd}
                                            onChange={handleQuantityChange}
                                        />  <br />  <br />
                                        <button 
                                            onClick={addToCart} 
                                            disabled={isQuantityExceeded || !selectedProduct} 
                                        >
                                            Ajouter
                                        </button>
                                        <br />  <br />
                                        <button onClick={() => setShowAddToCartInput(false)}>Annuler</button>
                                        <br />  <br />   
                                        {isQuantityExceeded && (
                                            <h3 style={{ color: 'red' }}>La quantité dépasse la quantité disponible</h3>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
                                    
    export default ListeProduits;
                               
