const express = require('express');
const router = express.Router();
const { Terrain, PanierAgriculteur, Agriculteur, TerrainRéclamer } = require('../models');

router.get('/', async (req, res) => {
    try {
        const terrains = await Terrain.findAll({
            include: [
                {
                    model: Agriculteur,
                    attributes: ['nom', 'prenom', 'photo', 'numtelephone']
                }
            ],
            attributes: ['idTerrain', 'titreTerrain', 'description', 'prixTerrain', 'photo1', 'photo2', 'idAgriculteur']
        });

        res.json(terrains);
    } catch (error) {
        console.error('Erreur lors de la récupération des terrains :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

router.post('/ajouterAuPanier', async (req, res) => {
    try {
        const { userId, idTerrain, idAgriculteur } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'Identifiant utilisateur non fourni' });
        }

        if (!idTerrain || !idAgriculteur) {
            return res.status(400).json({ error: 'Identifiant de terrain ou d\'agriculteur non fourni' });
        }

        const terrainExists = await PanierAgriculteur.findOne({
            where: { idTerrain, idAgriculteur: userId } // Check if the user already has the terrain in their cart
        });

        if (terrainExists) {
            return res.status(200).json({ exists: true, message: 'Vous avez déjà passé une demande pour cette offre' });
        }

        const itemPanier = await PanierAgriculteur.create({
            idTerrain,
            idAgriculteur: userId
        });

        res.status(201).json({ exists: false, itemPanier });
    } catch (error) {
        console.error('Erreur lors de l\'ajout d\'un article au panier :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

router.post('/reclamation', async (req, res) => {
    try {
        const { idAgriculteur, idTerrain, objet } = req.body;

        if (!idAgriculteur || !idTerrain || !objet) {
            return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
        }

        const reclamation = await TerrainRéclamer.create({
            idAgriculteur,
            idTerrain,
            objet
        });

        res.status(201).json(reclamation);
    } catch (error) {
        console.error('Erreur lors de la création de la réclamation :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

module.exports = router;
