import { NavLink } from 'react-router-dom';
import { FaHome, FaPlus, FaLandmark, FaComments, FaBell, FaUsers, FaUserCircle, FaShoppingCart, FaSignOutAlt, FaTasks } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './navbar.css'; 

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-green"> 
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="/home">AgriCOOLWeb</a>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/home"><FaHome /> Accueil</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to=""><FaBell /> Notifications</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/produit"><FaPlus /> Ajouter des produits</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/ajouterterrain"><FaPlus /> Ajouter Terrain</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/listedeterrains"><FaLandmark /> Terrains</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/messagest"><FaComments /> Discussion</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/post"><FaUsers /> Expériences et orientations</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/profil"><FaUserCircle /> Compte</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/panier"><FaShoppingCart /> Panier</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/tableaudeboard"><FaTasks /> Gestion de vente</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/deconnecter"><FaSignOutAlt /> Déconnexion</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
