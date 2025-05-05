const mongoose = require('mongoose');

// Subesquema para los requisitos del sistema
const requirementsSchema = new mongoose.Schema({
  os: String,
  processor: String,
  ram: String,
  gpu: String,
  storage: String,
  internet: { type: String, default: "" }, // Opcional
}, { _id: false });

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  developer: { type: String, required: true },
  genre: { type: String, required: true },
  platform: { type: String, required: true },
  minRequirements: { type: requirementsSchema, required: true },
  recommendedRequirements: { type: requirementsSchema, required: true },
  downloadLink: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
