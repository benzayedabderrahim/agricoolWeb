const express = require('express');
const router = express.Router();
const { Agriculteur, Commeragricole } = require('../../models');

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const agriculteur = await Agriculteur.findByPk(userId);
    const commerAgricole = await Commeragricole.findByPk(userId);
    if (agriculteur) {
      res.json(agriculteur);
    } else if (commerAgricole) {
      res.json(commerAgricole);
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur :', error);
    res.status(500).send('Erreur Interne du Serveur');
  }
});


module.exports = router;