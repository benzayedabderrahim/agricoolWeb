const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Publication,Réaction } = require('../models');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const reaction = require('../models/reaction');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads')); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${uuidv4()}.${file.originalname.split('.').pop()}`;
        cb(null, uniqueSuffix);
    }
});

const upload = multer({ storage: storage });

router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const pubs = await Publication.findAll({ where: { idAgriculteur: userId } });

        if (pubs.length === 0) {
            return res.status(404).json({ error: 'Publications non trouvées' });
        }

        res.json(pubs);
    } catch (error) {
        console.error('Erreur lors de la récupération des données des publications :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

router.put('/:idPost', upload.single('photo'), async (req, res) => {
    try {
        const postId = req.params.idPost;
        const updatedPhotoData = req.body;

        if (req.file) {
            updatedPhotoData.photo = req.file.filename;
        }

        const [rowsAffected] = await Publication.update(updatedPhotoData, { where: { idPost: postId } });

        if (rowsAffected === 0) {
            return res.status(404).json({ error: 'Publication non trouvée' });
        }

        res.json({ message: 'Publication mise à jour avec succès' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour des données de publication :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

router.delete('/:idPost', async (req, res) => {
    try {
        const idPost = req.params.idPost;
        await Réaction.destroy({ where: { idPost: idPost } });
        const deletedPost = await Publication.destroy({ where: { idPost: idPost } });

        if (deletedPost === 0) {
            return res.status(404).json({ error: 'Publication non trouvée' }); 
        }

        res.json({ message: 'Publication supprimée avec succès' }); 
    } catch (error) {
        console.error('Erreur lors de la suppression de la publication :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

module.exports = router;
