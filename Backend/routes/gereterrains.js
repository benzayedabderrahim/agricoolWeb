const express = require('express');
const router = express.Router();
const { Terrain } = require('../models'); 

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const terrains = await Terrain.findAll({ where: { idAgriculteur: userId } });

    if (terrains.length === 0) {
      return res.status(404).json({ error: 'Terrains introuvables' });
    }

    res.json(terrains);
  } catch (error) {
    console.error('Erreur lors de la récupération des données des terrains :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

router.put('/:terrainId', async (req, res) => {
  try {
    const terrainId = req.params.terrainId;
    const updatedTerrainData = req.body;

    const [rowsAffected] = await Terrain.update(updatedTerrainData, { where: { idTerrain: terrainId } });

    if (rowsAffected === 0) {
      return res.status(404).json({ error: 'Terrain introuvable' });
    }

    res.json({ message: 'Terrain mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour des données du terrain :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

router.delete('/:terrainId', async (req, res) => {
  try {
    const terrainId = req.params.terrainId;
    const deletedTerrain = await Terrain.destroy({ where: { idTerrain: terrainId } });

    if (!deletedTerrain) {
      return res.status(404).json({ error: 'Terrain introuvable' });
    }

    res.json({ message: 'Terrain supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du terrain :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

module.exports = router;
