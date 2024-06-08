const express = require('express');
const router = express.Router();
const { Produit, Commande, Agriculteur, PanierCM, SignalerProduit } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
    try {
        const produits = await Produit.findAll({
            include: [{
                model: Agriculteur,
                as: 'Agriculteur',
                attributes: ['nom', 'prenom', 'photo', 'numtelephone']
            }],
            attributes: ['idProduit', 'nomProduit', 'description', 'prix', 'quantite', 'photo', 'marque']
        });
        res.json(produits);
    } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

router.post('/ajouteraupanier', async (req, res) => {
    try {
        const { idProduit, quantite, userId } = req.body;

        if (!idProduit || !quantite || isNaN(quantite) || quantite <= 0 || !userId) {
            return res.status(400).json({ error: 'Données invalides fournies' });
        }

        const produit = await Produit.findByPk(idProduit);
        if (!produit) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }

        const lastPanier = await PanierCM.findOne({
            where: { idPanierCM: { [Op.lt]: 1000 } },
            order: [['idPanierCM', 'DESC']],
        });

        const nextIdPanierCM = lastPanier ? lastPanier.idPanierCM + 1 : 1;

        const newPanierCM = await PanierCM.create({
            idCM: userId,
            idProduit: idProduit,
            idPanierCM: nextIdPanierCM
        });
        const commande = await Commande.create({
            Quantite: quantite,
            idProduit: idProduit,
            idPanierCM: newPanierCM.idPanierCM
        });

        await produit.decrement('quantite', { by: quantite });

        res.status(201).json({ success: true, message: 'Produit ajouté au panier avec succès', idPanierCM: newPanierCM.idPanierCM });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du produit au panier :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

router.post('/signal', async (req, res) => {
    try {
        const { idProduit, userId, text } = req.body;
        if (!idProduit || !userId || !text) {
            return res.status(400).json({ error: 'Données invalides fournies' });
        }
        await SignalerProduit.create({
            idCM: userId,
            idProduit: idProduit,
            text: text
        });
        res.status(201).json({ success: true, message: 'Produit signalé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la signalisation du produit :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

module.exports = router;
