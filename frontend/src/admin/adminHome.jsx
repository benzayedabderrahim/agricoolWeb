import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './css/home.css';
import Navigation from './comp/navbar';

function AdminHome() {
  const [agriculteurs, setAgriculteurs] = useState([]);
  const [commerAgricoles, setCommerAgricoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const agriculteursResponse = await axios.get('http://localhost:3001/adminHome/agriculteurs');
      const commerAgricolesResponse = await axios.get('http://localhost:3001/adminHome/commeragricoles');

      setAgriculteurs(agriculteursResponse.data);
      setCommerAgricoles(commerAgricolesResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
      setError('Erreur lors de la récupération des données. Veuillez réessayer.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/adminHome/agriculteurs/${id}`);
      fetchData(); 
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    }
  };

  const handleDeleteCom = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/adminHome/commeragricoles/${id}`);
      fetchData(); 
    } catch (error) {
      console.error('Erreur lors de la suppression du commeragricole :', error);
    }
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error) {
    return <div className="error">Erreur : {error}</div>;
  }

  return (
    <div>
      <Navigation />
      <div className="dashboard-container">
        <br /> <br />
        <h1 className="dashboard-title">Tableau de Bord</h1>
        <br /> <br /> <br />
        <div className="dashboard-section">
          <h2 className="text-center">
            <button type="button" className="btn btn-info btn-lg">Agriculteurs ({agriculteurs.length})</button>
          </h2>
          <br />
          <table className="data-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {agriculteurs.map(agriculteur => (
                <tr key={agriculteur.idAgriculteur}>
                  <td><img src={`http://localhost:3001/uploads/${agriculteur.photo}`} alt={agriculteur.nom} className="avatar" /></td>
                  <td>{agriculteur.nom}</td>
                  <td>{agriculteur.prenom}</td>
                  <td>
                    <Link to={`/user/${agriculteur.idAgriculteur}`} className="action-button edit-button">
                      <FaEye className="action-icon" />
                    </Link>
                    <button onClick={() => handleDelete(agriculteur.idAgriculteur)} className="action-button delete-button">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br /> <br /> <br />
        <div className="dashboard-section">
          <h2 className="section-title">Commerçants Agricoles ({commerAgricoles.length})</h2>
          <br />
          <table className="data-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {commerAgricoles.map(commer => (
                <tr key={commer.idCM}>
                  <td><img src={`http://localhost:3001/uploads/${commer.photo}`} alt={commer.nom} className="avatar" /></td>
                  <td>{commer.nom}</td>
                  <td>{commer.prenom}</td>
                  <td>
                    <Link to={`/user/${commer.idCM}`} className="action-button edit-button">
                      <FaEye className="action-icon" />
                    </Link>
                    <button onClick={() => handleDeleteCom(commer.idCM)} className="action-button delete-button">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
