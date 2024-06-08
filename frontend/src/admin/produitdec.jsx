import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Produitdec.css'; // For styling the table

function Produitdec() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/produitrec/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <div>
      <h1>Produit Information</h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Text</th>
            <th>Photo</th>
            <th>Nom</th>
            <th>Prenom</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.text}</td>
              <td><img src={item.photo} alt="Produit" /></td>
              <td>{item.nom}</td>
              <td>{item.prenom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Produitdec;

