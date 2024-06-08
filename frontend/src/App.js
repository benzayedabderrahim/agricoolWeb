import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Home from "./pages/home.jsx";
import Addpost from './pages/createpost.jsx';
import Post from './pages/post.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';
import AjouterProduit from './pages/produits.jsx';
import ListeProduits from './pages/listedeproduits.jsx';
import Listedeterrains from './pages/listedeterrains.jsx';
import AjouterTerrain from './pages/addterrain.jsx';
import About from './pages/about.jsx';
import Profile from './pages/profile.jsx';
import Editerprofil from './pages/editerprofil.jsx';
import Gereproduits from './pages/gereproduits.jsx';
import Gereterrains from './pages/gereterrains.jsx';
import Logout from './pages/logout.jsx';
import Panieragriculteur from './pages/panieragriculteur.jsx';
import Gerepublication from './pages/gerepublication.jsx';
import Comhome from './commercant/comhome.jsx';
import Profilcommercant from './commercant/profilcommercant.jsx';
import  Paniercommercant from './commercant/paniercomm.jsx';
import Gestiondevente from './pages/gestiondevente.jsx';
import Discussion from './pages/discussions.jsx';
import AdminHome from './admin/adminHome.jsx';
import Edituser from './admin/edituser.jsx';
import Reclamation from './admin/reclamation.jsx';
import Decision from './admin/decision.jsx';
import Produitsignaler from './admin/produitsignaler.jsx';
import Terraindemander from './pages/terraindemander.jsx';
import Ges from './pages/ges.jsx';
import Terrainrec from './admin/terrainrec.jsx';
import Produitdec from './admin/produitdec.jsx';

function App() {
  const [userId, setUserId] = useState(null);
  const handleLogin = (userId) => {
    setUserId(userId);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/ajouterpost" element={<Addpost userId={userId} />} />
          <Route path="/vosproduits" element={<Gereproduits userId={userId} />} />
          <Route path="/vosterrains" element={<Gereterrains userId={userId} />} />
          <Route path="/vospublications" element={<Gerepublication userId={userId} />} />
          <Route path='/post' element={<Post />} />
          <Route path='/home' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/produit' element={<AjouterProduit userId={userId} />} />
          <Route path='/messages' element={<Discussion userId={userId} />} />
          <Route path='/tableaudeboard' element={<Ges userId={userId} />} />
          <Route path='/produitdec'element={<Gestiondevente />} />
          <Route path='/profil' element={<Profile userId={userId} />} />
          <Route path='/editerprofil' element={<Editerprofil userId={userId} />} />
          <Route path='/listedeterrains' element={<Listedeterrains />} />
          <Route path='/ajouterterrain' element={<AjouterTerrain userId={userId} />} />
          <Route path='/panier' element={<Panieragriculteur userId={userId} />} />
          <Route path='/deconnecter' element={<Logout userId={userId} />} />
          <Route path='/about' element={<About />} />
          <Route path='/terraindec' element={<Terraindemander />} />
       
         {/* Les PATH de Commerçant agricole */}
          <Route path='/listedeproduits' element={<ListeProduits />} />
          <Route path='/homepage' element={<Comhome />} />
          <Route path='/compte' element={<Profilcommercant userId={userId} />} />
          <Route path='/paniercomm' element={<Paniercommercant userId={userId} />} />

        {/* Les PATH d'admin' */}
        
        <Route path='/adminHome' element={<AdminHome />} />
        <Route path='/user/:id' element={<Edituser userId={userId} />} />
        <Route path='/rec' element={<Reclamation />} />
        <Route path='/dec/:idPost' element={<Decision />} />
        <Route path='/produitrec' element={<Produitsignaler />} />
        <Route path='/terrainrec' element={<Terrainrec />} />
        <Route path='/produitdec' element={<Produitdec />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
