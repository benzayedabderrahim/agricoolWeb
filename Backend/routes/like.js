const express = require('express');
const router = express.Router();
const { Réaction } = require('../models');

router.post('/toggle', async (req, res) => {
  const { idAgriculteur, idPub } = req.body;
  try {
    const existingLike = await Réaction.findOne({
      where: {
        idAgriculteur,
        idPost: idPub,
        Textréaction: null,
      },
    });

    if (existingLike) {
      await existingLike.destroy();
      res.json({ message: 'Like removed' });
    } else {
      await Réaction.create({
        idAgriculteur,
        idPost: idPub,
      });
      res.json({ message: 'Like added' });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ error: 'Error toggling like' });
  }
});

module.exports = router;
