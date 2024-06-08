const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Produit } = require("../models");
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${uuidv4()}.${file.originalname.split('.').pop()}`;
        cb(null, uniqueSuffix);
    }
});

const upload = multer({ storage });

router.post('/', upload.single('photo'), async (req, res) => {
    try {
        const { nomProduit, description, marque, prix, quantite, idAgriculteur } = req.body;
        const photo = req.file ? req.file.filename : null;

        const newProduct = await Produit.create({
            nomProduit,
            description,
            marque,
            prix,
            quantite,
            photo,
            idAgriculteur
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Erreur lors de l\'ajout du produit :', error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});

module.exports = router;