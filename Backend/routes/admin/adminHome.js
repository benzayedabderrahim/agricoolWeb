const express = require('express');
const router = express.Router();
const { Agriculteur, Commeragricole, Publication, Réaction, Terrain,TerrainRéclamer,PanierAgriculteur, Produit, Reclamation, PanierCM, SignalerProduit, Commande } = require('../../models');

router.get('/agriculteurs', async (req, res) => {
  try {
    const agriculteurs = await Agriculteur.findAll();
    res.json(agriculteurs);
  } catch (error) {
    console.error('Erreur lors de la récupération des Agriculteurs :', error);
    res.status(500).send('Erreur Interne du Serveur');
  }
});
router.get('/commeragricoles', async (req, res) => {
  try {
    const commerAgricoles = await Commeragricole.findAll();
    res.json(commerAgricoles);
  } catch (error) {
    console.error('Erreur lors de la récupération des CommerAgricoles :', error);
    res.status(500).send('Erreur Interne du Serveur');
  }
});
router.delete('/agriculteurs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Promise.all([
      Produit.destroy({ where: { idAgriculteur: id } }),
      Publication.destroy({ where: { idAgriculteur: id } }),
      Réaction.destroy({ where: { idAgriculteur: id } }),
      Reclamation.destroy({ where: { idAgriculteur: id } }),
      Terrain.destroy({ where: { idAgriculteur: id } }),
      PanierAgriculteur.destroy({ where: { idAgriculteur: id } }),
      TerrainRéclamer.destroy({ where: { idAgriculteur: id } }),
    ]);

    await Agriculteur.destroy({ where: { idAgriculteur: id } });

    res.json({ message: 'Agriculteur and all associated data deleted successfully' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'agriculteur :', error);
    res.status(500).send('Erreur Interne du Serveur');
  }
});

router.delete('/commeragricoles/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Commeragricole.destroy({ where: { idCM: id } });
    await Promise.all([
      PanierCM.destroy({ where: { idCM: id } }),
      SignalerProduit.destroy({ where: { idCM: id } })
    ]);

    res.json({ message: 'Commeragricole and related data deleted successfully' });
  } catch (error) {
    console.error('Erreur lors de la suppression du commeragricole et des données associées :', error);
    res.status(500).send('Erreur Interne du Serveur');
  }
});

router.delete('/publication/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Publication.destroy({ where: { idAgriculteur: id } });
    res.json({ message: 'Publications deleted successfully' });
  } catch (error) {
    console.error('Erreur lors de la suppression des publications :', error);
    res.status(500).send('Erreur Interne du Serveur');
  }
});
router.delete('/reaction/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Réaction.destroy({ where: { idAgriculteur: id } });
    res.json({ message: 'Reactions deleted successfully' });
  } catch (error) {
    console.error('Erreur lors de la suppression des réactions :', error);
    res.status(500).send('Erreur Interne du Serveur');
  }
});
router.delete('/terrain/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Terrain.destroy({ where: { idAgriculteur: id } });
    res.json({ message: 'Terrains deleted successfully' });
  } catch (error) {
    console.error('Erreur lors de la suppression des terrains :', error);
    res.status(500).send('Erreur Interne du Serveur');
  }
});
router.delete('/produit/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Produit.destroy({ where: { idAgriculteur: id } });
    res.json({ message: 'Produits deleted successfully' });
  } catch (error) {
    console.error('Erreur lors de la suppression des produits :', error);
    res.status(500).send('Erreur Interne du Serveur');
  }
});
router.delete('/reclamation/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Reclamation.destroy({ where: { idAgriculteur: id } });
    res.json({ message: 'Réclamations deleted successfully' });
  } catch (error) {
    console.error('Erreur lors de la suppression des réclamations :', error);
    res.status(500).send('Erreur Interne du Serveur');
  }
});

module.exports = router;
