const express = require('express');
const router = express.Router();
const { Reclamation, Publication, Agriculteur } = require('../../models');

router.get('/reclamations', async (req, res) => {
  try {
    const reclamations = await Reclamation.findAll({
      include: [
        {
          model: Publication,
          attributes: ['photo'], 
        },
        {
          model: Agriculteur,
          attributes: ['nom','prenom'], 
        },
      ],
    });
    res.json(reclamations);
  } catch (error) {
    console.error('Erreur lors de la récupération des réclamations :', error);
    res.status(500).send('Erreur Interne du Serveur');
  }
});

router.get('/reclamations/publication/:idPost', async (req, res) => {
  const postId = req.params.idPost;

  try {
    const reclamation = await Reclamation.findOne({
      where: { idPost: postId },
    });

    if (!reclamation) {
      return res.status(404).send('Réclamation introuvable');
    }

    const publication = await Publication.findOne({
      where: { idPost: postId },
      attributes: ['titre', 'pubText', 'photo', 'video', 'idAgriculteur'],
    });

    if (!publication) {
      return res.status(404).send('Publication introuvable');
    }

    const agriculteur = await Agriculteur.findByPk(publication.idAgriculteur, {
      attributes: ['nom', 'prenom'],
    });

    if (!agriculteur) {
      return res.status(404).send('Agriculteur introuvable');
    }

    res.json({
      idPost: reclamation.idPost,
      texte: reclamation.TextReclamation,
      publicationData: {
        titre: publication.titre,
        pubText: publication.pubText,
        photo: publication.photo,
        video: publication.video,
        idAgriculteur: publication.idAgriculteur
      },
      agriculteurData: {
        nom: agriculteur.nom,
        prenom: agriculteur.prenom
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des données de la réclamation :', error);
    res.status(500).send('Erreur Interne du Serveur');
  }
});

router.post('/send-alert/:idAgriculteur', async (req, res) => {
  const agriculteurId = req.params.idAgriculteur;

  try {
    const agriculteur = await Agriculteur.findByPk(agriculteurId);
    if (!agriculteur) {
      return res.status(404).send('Agriculteur introuvable');
    }
    agriculteur.nombrealertes += 1;
    await agriculteur.save();

    // Send success response
    res.status(200).json({ message: `Alerte envoyée avec succès à ${agriculteur.nom} ${agriculteur.prenom}` });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'alerte :', error);
    res.status(500).send('Erreur Interne du Serveur');
  }
});



module.exports = router;
