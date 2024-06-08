import { NavLink } from 'react-router-dom';
import { FaHome, FaComments, FaUserCircle, FaShoppingCart, FaSignOutAlt, FaStore } from 'react-icons/fa';
import './navbar.css';

function Navigation() {
  return (
    <div className="code-nav">
      <nav>
        <ul>
          <li><NavLink to="/home"><FaHome /> Accueil</NavLink></li>
          <li><NavLink to="/listedeproduits"><FaStore /> Offres des produits</NavLink></li>
          <li><NavLink to="/paniercomm"><FaShoppingCart /> Panier</NavLink></li>
          <li><NavLink to="/compte"><FaUserCircle />Profil</NavLink></li>
          <li><NavLink to="/deconnecter"><FaSignOutAlt /> Déconnexion</NavLink></li>
          <li><NavLink to="/messagest"><FaComments /> Discussion</NavLink></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
