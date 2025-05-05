const express = require('express');
const Game = require('../models/Game');
const router = express.Router();

// Obtener todos los juegos
router.get('/games', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los juegos' });
  }
});

// Agregar un nuevo juego
// Agregar un nuevo juego (solo admin)
router.post('/games', async (req, res) => {
    const {
      adminKey,
      title,
      description,
      developer,
      genre,
      platform,
      minRequirements,
      recommendedRequirements,
      downloadLink,
      imageUrl,
    } = req.body;
  
    // Verificar clave de admin
    if (adminKey !== process.env.ADMIN_KEY) {
      return res.status(403).json({ message: 'Clave de administrador incorrecta' });
    }
  
    try {
      const newGame = new Game({
        title,
        description,
        developer,
        genre,
        platform,
        minRequirements,
        recommendedRequirements,
        downloadLink,
        imageUrl,
      });
  
      await newGame.save();
      res.status(201).json(newGame);
    } catch (err) {
      res.status(500).json({ message: 'Error al agregar el juego' });
    }
  });
// Obtener un juego por ID
router.get('/games/:id', async (req, res) => {
    try {
      const game = await Game.findById(req.params.id);
      if (!game) return res.status(404).json({ message: 'Juego no encontrado' });
      res.json(game);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener el juego' });
    }
  });
  


module.exports = router;
