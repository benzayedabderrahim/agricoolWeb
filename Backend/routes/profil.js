const express = require('express');
const router = express.Router();
const { Agriculteur, Commeragricole } = require('../models'); 

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    let user;
    user = await Commeragricole.findOne({ where: { idCM: userId } });
    if (!user) {
      user = await Agriculteur.findOne({ where: { idAgriculteur: userId } });
    }

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur introuvable' });
    }

    res.json({
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      numtelephone: user.numtelephone,
      photo: user.photo
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du profil utilisateur :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

module.exports = router;
