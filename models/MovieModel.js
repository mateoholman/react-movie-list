const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  director: {
    type: String,
    required: true,
  },

  poster: {
    type: String,
    required: true,
  },

  plot: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Movie', movieSchema);
