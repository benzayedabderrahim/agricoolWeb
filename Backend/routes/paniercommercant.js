const express = require('express');
const router = express.Router();
const { PanierCM, Produit, Commande, Sequelize } = require('../models');

PanierCM.belongsTo(Produit, { foreignKey: 'idProduit' });
PanierCM.hasMany(Commande, { foreignKey: 'idPanierCM' });

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ error: 'Paramètre userId invalide' });
    }

    const panier = await PanierCM.findAll({
      where: { idCM: userId },
      include: [
        {
          model: Produit,
          attributes: ['nomProduit', 'prix', 'photo'],
          required: true
        },
        {
          model: Commande,
          attributes: ['Quantite'],
          where: {
            idProduit: Sequelize.col('PanierCM.idProduit')
          },
          required: false
        }
      ]
    });

    if (panier.length === 0) {
      return res.status(404).json({ message: 'Pas d\'articles dans votre panier' });
    }

    res.status(200).json(panier);
  } catch (error) {
    console.error('Erreur lors de la récupération du panier :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du panier' });
  }
});

router.delete('/supprimer/:idPanierCM', async (req, res) => {
  const { idPanierCM } = req.params;

  try {
    const panierItem = await PanierCM.findByPk(idPanierCM, {
      include: [
        {
          model: Commande,
          attributes: ['Quantite'],
        },
        {
          model: Produit,
          attributes: ['idProduit', 'quantite'],
        }
      ]
    });

    if (!panierItem) {
      return res.status(404).json({ message: 'Article non trouvé dans le panier' });
    }

    const totalQuantity = panierItem.Commandes.reduce((acc, commande) => acc + commande.Quantite, 0);

    await Produit.update(
      { quantite: Sequelize.literal(`quantite + ${totalQuantity}`) },
      { where: { idProduit: panierItem.idProduit } }
    );

    await Commande.destroy({ where: { idPanierCM } });
    await PanierCM.destroy({ where: { idPanierCM } });

    res.status(200).json({ message: 'Article supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article du panier :', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'article du panier' });
  }
});

router.put('/valider/:idPanierCM/:idProduit', async (req, res) => {
  const { idPanierCM, idProduit } = req.params;

  try {
      const currentIdPanierCM = parseInt(idPanierCM);

      if (currentIdPanierCM >= 1000) {
          return res.status(400).json({ error: 'Le panier a déjà été validé' });
      }

      const newIdPanierCM = currentIdPanierCM + 1002;

      const [updated] = await PanierCM.update(
          { idPanierCM: newIdPanierCM },
          { where: { idPanierCM: currentIdPanierCM, idProduit } }
      );

      if (updated) {
          res.status(200).json({ message: 'Article validé avec succès', newIdPanierCM });
      } else {
          res.status(404).json({ error: 'Panier non trouvé' });
      }
  } catch (error) {
      console.error('Erreur lors de la validation de l\'article du panier :', error);
      res.status(500).json({ error: 'Erreur lors de la validation de l\'article du panier' });
  }
});

router.put('/modifier/:idPanierCM/:idProduit', async (req, res) => {
  const { idPanierCM, idProduit } = req.params;
  const { newQuantite } = req.body;

  try {
    // Find the correct Commande using both idPanierCM and idProduit
    const commande = await Commande.findOne({
      where: {
        idPanierCM: idPanierCM,
        idProduit: idProduit
      }
    });
    if (!commande) {
      return res.status(404).json({ error: 'Commande not found' });
    }
    const produit = await Produit.findByPk(idProduit);
    if (!produit) {
      return res.status(404).json({ error: 'Produit not found' });
    }
    if (newQuantite > produit.quantite + commande.Quantite) {
      return res.json({ error: 'La quantité souhaitée dépasse la quantité disponible' });
    }
    const quantiteDifference = commande.Quantite - newQuantite;
    await produit.increment('quantite', { by: quantiteDifference });
    await commande.update({ Quantite: newQuantite });

    res.json({ success: true, message: 'Quantité mise à jour avec succès' });
  } catch (error) {
    console.error('Erreur de mise à jour:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});


module.exports = router;
