const express = require('express');
const router = express.Router();
const { Terrain, PanierAgriculteur, Agriculteur, DemandeTerrain } = require("../models");
const { Op } = require("sequelize");

// Get all terrains with demandeurs
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId;
    const terrains = await Terrain.findAll({
      where: { idAgriculteur: userId },
      attributes: ['idTerrain'],
    });

    const terrainsAvecDemandeurs = [];

    for (const terrain of terrains) {
      const demandeursOffres = await PanierAgriculteur.findAll({
        where: {
          idTerrain: terrain.idTerrain,
          idAgriculteur: { [Op.ne]: userId }
        },
        include: [
          {
            model: Agriculteur,
            attributes: ['nom', 'prenom', 'photo'],
          }
        ]
      });

      terrainsAvecDemandeurs.push({
        idTerrain: terrain.idTerrain,
        demandeursOffres
      });
    }

    res.json(terrainsAvecDemandeurs);
  } catch (error) {
    console.error('Erreur lors de la récupération des terrains et des demandeurs d\'offres:', error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Accept a demandeur and insert into demandeTerrain table
router.put('/accepter/:idPanieragriculteur/:idTerrain', async (req, res) => {
  const { idPanieragriculteur, idTerrain } = req.params;

  try {
    const demandeTerrain = await DemandeTerrain.create({
      idPanieragriculteur: parseInt(idPanieragriculteur),
      idTerrain: parseInt(idTerrain)
    });

    if (demandeTerrain) {
      res.status(200).json({ message: 'Vous avez accepté cette offre' });
    } else {
      res.status(404).json({ error: 'Erreur lors de l\'acceptation de l\'offre' });
    }
  } catch (error) {
    console.error('Erreur lors de l\'acceptation de l\'offre:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

router.delete('/:idPanierAgriculteur', async (req, res) => {
  try {
    const { idPanierAgriculteur } = req.params;
    await PanierAgriculteur.destroy({
      where: { idPanieragriculteur: idPanierAgriculteur }
    });
    res.status(200).json({ message: 'Demandeur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du demandeur:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

module.exports = router;
