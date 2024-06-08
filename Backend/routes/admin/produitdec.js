const express = require('express');
const router = express.Router();
const { SignalerProduit, Commeragricole, Produit } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const signalerProduits = await SignalerProduit.find().populate('idProduit').populate('idCM');
    const result = signalerProduits.map(item => ({
      text: item.text,
      photo: item.idProduit.photo,
      nom: item.idCM.nom,
      prenom: item.idCM.prenom
    }));
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
