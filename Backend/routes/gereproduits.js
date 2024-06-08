const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Produit } = require('../models');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

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
        const products = await Produit.findAll({ where: { idAgriculteur: userId } });

        if (products.length === 0) {
            return res.status(404).json({ error: 'Produits non trouvés' });
        }

        res.json(products);
    } catch (error) {
        console.error('Erreur lors de la récupération des données des produits :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

router.put('/:productId', upload.single('photo'), async (req, res) => {
    try {
      const productId = req.params.productId;
      const updatedProductData = req.body;
  
      if (req.file) {
        updatedProductData.photo = req.file.filename;
      }
  
      const [rowsAffected] = await Produit.update(updatedProductData, { where: { idProduit: productId } });
  
      if (rowsAffected === 0) {
        return res.status(404).json({ error: 'Produit non trouvé' });
      }
  
      res.json({ message: 'Produit mis à jour avec succès' });
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données du produit :', error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  });
  

router.delete('/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const deletedProduct = await Produit.destroy({ where: { idProduit: productId } });

        if (deletedProduct === 0) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }

        res.json({ message: 'Produit supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression du produit :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

module.exports = router;
