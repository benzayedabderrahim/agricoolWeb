import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/navbar';

function Ges() {
  return (
    <div>
      <Navigation />
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <Link to="/produitdec" className="btn btn-primary btn-lg btn-block">Vente des produits</Link>
          </div>
          <div className="col">
            <Link to="/terraindec" className="btn btn-secondary btn-lg btn-block">Vente/location des terrains</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ges;
