const express = require('express');
const router = express.Router();
const { PanierAgriculteur, Terrain, DemandeTerrain , Sequelize } = require("../models");
const { Op } = require("sequelize");

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const panier = await PanierAgriculteur.findAll({
      where: { 
        idAgriculteur: userId, 
        idPanieragriculteur: { 
          [Op.in]: Sequelize.literal('(SELECT idPanieragriculteur FROM demandeTerrain)') 
        } 
      },
      include: [{
        model: Terrain,
        attributes: ['titreTerrain', 'description', 'prixTerrain', 'photo1'],
        required: true
      }]
    });

    if (panier.length === 0) {
      return res.status(404).json({ error: 'Panier introuvable' });
    }

    res.json(panier);
  } catch (error) {
    console.error('Erreur lors de la récupération du panier agriculteur :', error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

router.put('/:idPanierAgriculteur', async (req, res) => {
  try {
    const idPanierAgriculteur = req.params.idPanierAgriculteur;

    await PanierAgriculteur.update({ validated: true }, {
      where: { idPanierAgriculteur }
    });

    res.json({ message: 'Article validé avec succès dans le panier agriculteur' });
  } catch (error) {
    console.error('Erreur lors de la validation de l\'article dans le panier agriculteur :', error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

router.delete('/:idPanierAgriculteur', async (req, res) => {
  try {
    const idPanierAgriculteur = req.params.idPanierAgriculteur;

    await PanierAgriculteur.destroy({ where: { idPanierAgriculteur } });

    res.json({ message: 'Article supprimé avec succès du panier agriculteur' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article du panier agriculteur :', error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

module.exports = router;
