const express = require('express');
const router = express.Router();
const { Publication, Agriculteur, Réaction, Reclamation } = require('../models');

router.get('/', async (req, res) => {
    try {
        const publications = await Publication.findAll({
            include: [
                {
                    model: Agriculteur,
                    attributes: ['nom', 'prenom', 'photo']
                },
                {
                    model: Réaction,
                    attributes: ['idReaction', 'idAgriculteur', 'idPost', 'Textréaction'], 
                    as: 'likes' // Specify alias for likes association
                },
                {
                    model: Réaction,
                    attributes: ['idReaction', 'idAgriculteur', 'idPost', 'Textréaction'],
                    as: 'comments', // Specify alias for comments association
                    include: [
                        {
                            model: Agriculteur,
                            attributes: ['nom', 'prenom', 'photo']
                        }
                    ]
                }
            ],
            attributes: ['idPost', 'titre', 'pubText', 'photo', 'video']
        });

        publications.forEach(publication => {
            publication.likes = publication.likes.filter(reaction => reaction.Textréaction === null);
            publication.comments = publication.comments.filter(reaction => reaction.Textréaction !== null);
            delete publication.likes; 
            delete publication.comments; 
        });

        res.json(publications);
    } catch (error) {
        console.error('Erreur lors de la récupération des publications :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

router.post('/signal/:postId', async (req, res) => {
    const { postId } = req.params;
    const { text, idAgriculteur } = req.body;

    try {
        if (!text || !idAgriculteur) {
            return res.status(400).json({ error: 'Données de signalement invalides' });
        }

        await Reclamation.create({
            idAgriculteur,
            idPost: postId,
            TextReclamation: text
        });

        res.status(201).json({ message: 'Signalement envoyé avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi du signalement :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});



module.exports = router;
