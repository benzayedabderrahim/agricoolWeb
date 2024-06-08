const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const db = require('../models');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueFilename = uuidv4();
    cb(null, uniqueFilename);
  }
});

const upload = multer({ storage: storage });

router.put('/:userId', upload.single('photo'), async (req, res) => {
  try {
    const userId = req.params.userId;
    const { nom, prenom, email, numtelephone, password } = req.body;
    let photoFileName = '';
    if (req.file) {
      photoFileName = req.file.filename;
    }
    const agriculteur = await db.Agriculteur.findByPk(userId);
    let table;
    let userType;

    if (agriculteur) {
      table = db.Agriculteur;
      userType = 'agriculteur';
    } else {
      const commeragricole = await db.Commeragricole.findByPk(userId);
      if (commeragricole) {
        table = db.Commeragricole;
        userType = 'commeragricole';
      } else {
        throw new Error('Utilisateur non trouvé');
      }
    }
    const updatedUser = await table.update({
      nom,
      prenom,
      email,
      numtelephone,
      photo: photoFileName,
      password: password ? await bcrypt.hash(password, 10) : undefined
    }, {
      where: { [userType === 'agriculteur' ? 'idAgriculteur' : 'idCM']: userId },
      returning: true,
      plain: true 
    });
    res.status(200).json({ message: 'Profil utilisateur mis à jour avec succès', user: updatedUser });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil utilisateur :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

module.exports = router;
