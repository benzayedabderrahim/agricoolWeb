const express = require('express');
const router = express.Router();
const { Produit, PanierCM, Commande, Commeragricole, sequelize, Sequelize } = require("../models");

router.get('/produits', async (req, res) => {
  try {
    const userId = req.query.userId;
    const produits = await Produit.findAll({
      where: { idAgriculteur: userId },
      attributes: ['idProduit', 'nomProduit', 'description', 'marque', 'prix', 'photo'],
    });
    const panierCommercantsProducts = await PanierCM.findAll({
      where: {
        idPanierCM: { [Sequelize.Op.gt]: 1000 }, 
      },
      include: [
        {
          model: Produit,
          attributes: ['idProduit'],
          required: true,
        },
        {
          model: Commande,
          attributes: ['idProduit', 'idPanierCM', 'Quantite'],
          required: true,
        },
        {
          model: Commeragricole,
          attributes: ['nom', 'prenom', 'photo'],
          required: true,
        }
      ]
    });

    res.json({ produits, panierCommercantsProducts });
  } catch (error) {
    console.error('Erreur lors de la récupération des produits :', error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

router.delete('/panier/:productId/:commerId', async (req, res) => {
  const { productId, commerId } = req.params;
  try {
    await sequelize.transaction(async (t) => {
      await Commande.destroy({
        where: {
          idProduit: productId
        },
        transaction: t
      });
      await PanierCM.destroy({
        where: {
          idProduit: productId,
          idCM: commerId
        },
        transaction: t
      });
    });

    res.json({ message: 'Product and associated orders removed from panier successfully' });
  } catch (error) {
    console.error('Erreur lors de la suppression du produit et des commandes du panier :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

module.exports = router;
