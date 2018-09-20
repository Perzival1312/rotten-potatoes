const express = require('express')
const mongoose = require('mongoose');
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express()
const Comment = require('./models/comment')
const Review = require('./models/review')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride('_method'));


const reviewRoutes = require('./controllers/reviews');
reviewRoutes(app, Review);
const commentRoutes = require('./controllers/comments');
commentRoutes(app, Comment);


app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then(review => {
    Comment.find({ reviewId: req.params.id }).then(comments => {
      res.render('reviews-show', { review: review, comments: comments })
    })
  }).catch((err) => {
    console.log("/reviews/:id")
    console.log(err.message)
  });
});

  module.exports = app;
