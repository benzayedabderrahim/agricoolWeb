import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/nav.css'; 

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-green"> 
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#">AgriCOOLWeb</a>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/adminHome"> Accueil</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/rec"> Réclamations des publications</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/produitdec"> Réclamations des produits</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/terrainrec"> Réclamations des Terrains</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/deconnecter"> Déconnexion</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
