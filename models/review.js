const mongoose = require('mongoose')

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  movieId: { type: String, required: true }
});

module.exports = Review
