const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Publication } = require("../models");
const { v4: uuidv4 } = require('uuid');

// Define storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const uniqueFilename = uuidv4(); 
        cb(null, uniqueFilename); 
    }
});

const upload = multer({ storage });

router.post('/', upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
    try {
        const { titre, pubText } = req.body;
        const photo = req.files['photo'] ? req.files['photo'][0].path : null;
        const video = req.files['video'] ? req.files['video'][0].path : null;

        const newPost = await Publication.create({
            titre,
            pubText,
            photo,
            video,
            idAgriculteur: req.body.idAgriculteur 
        });

        res.status(201).json(newPost);
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la publication:', error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});

module.exports = router;
