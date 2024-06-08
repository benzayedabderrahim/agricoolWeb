const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/home', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../../frontend/public', 'index.html'));
    } catch (error) {
        console.error('Erreur lors de la fourniture de la page d\'accueil :', error);
        res.status(500).send('Erreur interne du serveur');
    }
});

module.exports = router;
