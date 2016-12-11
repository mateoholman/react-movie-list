const MovieModel = require('../models/MovieModel');

module.exports = {
  list(req, res, next) {
    MovieModel.find().exec()
      .then(movies => res.json(movies))
      .catch(next);
  },

  show(req, res, next) {
    MovieModel.findById(req.params.id).exec()
      .then(movie => res.json(movie))
      .catch(next);
  },

  create(req, res, next) {
    const { title, director, poster, plot } = req.body;
    const movie = new MovieModel({ title, director, poster, plot }).save()
      .then(movie => res.json(movie))
      .catch(next);
  },

  update(req, res, next) {
    const { title, director, poster, plot } = req.body;

    MovieModel.findOneAndUpdate(
      { _id: req.params.id },
      { title, director, poster, plot },
      { new: true, runValidators: true }
    ).exec()
      .then(movie => res.json(movie))
      .catch(next);
  },

  remove(req, res, next) {
    MovieModel.findOneAndRemove({ _id: req.params.id }).exec()
      .then(movie => res.json(movie))
      .catch(next);
  }
};
