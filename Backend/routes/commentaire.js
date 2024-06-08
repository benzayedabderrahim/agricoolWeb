const express = require('express');
const router = express.Router();
const { Réaction } = require('../models');

router.post('/create', async (req, res) => {
    const { idAgriculteur, idPub, textComm } = req.body;
    try {
        await Réaction.create({
            idAgriculteur,
            idPost: idPub,
            Textréaction: textComm
        });
        res.json({ message: 'Commentaire ajouté' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire :', error);
        res.status(500).json({ error: 'Erreur lors de l\'ajout du commentaire' });
    }
});

router.delete('/delete/:commentId', async (req, res) => {
    const { commentId } = req.params;
    try {
        console.log(`Tentative de suppression du commentaire avec l'ID : ${commentId}`);
        const deletedComment = await Réaction.destroy({ where: { idReaction: commentId } });
        if (deletedComment) {
            res.json({ message: 'Commentaire supprimé' });
        } else {
            res.status(404).json({ error: 'Commentaire non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du commentaire :', error);
        res.status(500).json({ error: 'Erreur lors de la suppression du commentaire' });
    }
});

module.exports = router;
