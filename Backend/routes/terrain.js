const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Terrain } = require('../models');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueFilename = uuidv4();
        cb(null, uniqueFilename);
    }
});

const upload = multer({ storage });

router.post('/', upload.fields([{ name: 'photo1', maxCount: 1 }, { name: 'photo2', maxCount: 1 }]), async (req, res) => {
    try {
        const { titreTerrain, description, prixTerrain, idAgriculteur } = req.body;
        const photo1 = req.files['photo1'][0].filename;
        const photo2 = req.files['photo2'][0].filename; 

        const nouveauTerrain = await Terrain.create({
            titreTerrain,
            description,
            prixTerrain,
            photo1,
            photo2, 
            idAgriculteur
        });

        res.status(201).json(nouveauTerrain);
    } catch (erreur) {
        console.error('Erreur lors de l\'ajout du terrain :', erreur);
        res.status(500).json({ erreur: 'Erreur interne du serveur' });
    }
});

module.exports = router;
