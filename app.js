const express = require('express')
const mongoose = require('mongoose');
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express()
const Comment = require('./models/comment')
const Review = require('./models/review')
app.use(express.static('./public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride('_method'));

const reviewRoutes = require('./controllers/reviews');
reviewRoutes(app, Review);
const commentRoutes = require('./controllers/comments');
commentRoutes(app, Comment);
// const movieRoutes = require('./controlloers/movies')
// movieRoutes(app);

const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('de629d8abe9509713535b1ecc0f4cc0f')

app.get('/', (req, res) => {
  moviedb.miscNowPlayingMovies().then(response => {
    res.render('movies-index', { movies: response.results });
  }).catch(console.error)
})

app.get('/movies/:id', (req, res) => {
  moviedb.movieInfo({ id: req.params.id }).then(movie => {
    Review.find({ movieId: req.params.id }).then(reviews => {
      // res.render('movies-show', { movie: movie, reviews: reviews });
      if (movie.video) {
        moviedb.movieVideos({ id: req.params.id }).then(videos => {
          movie.trailer_youtube_id = videos.results[0].key
          renderTemplate(movie)
        })
      } else {
        renderTemplate(movie)
      }
      function renderTemplate(movie)  {
        res.render('movies-show', { movie: movie, reviews: reviews });
      }
    })
  }).catch(console.error)
})

// SHOW
app.get('/movies/:id/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then(review => {
    Comment.find({ reviewId: req.params.id }).then(comments => {
      res.render('reviews-show', { review: review, comments: comments })
    })
  }).catch((err) => {
    // console.log("/reviews/:id")
    console.log(err.message)
  });
});
const port = process.env.PORT || 3000;
app.listen(port);
console.log(port);
module.exports = app;
