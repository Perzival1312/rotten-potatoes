const express = require('express')
const mongoose = require('mongoose');
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express()
const Comment = require('./models/comment')
const Review = require('./models/review')

mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride('_method'));


const reviewRoutes = require('./controllers/reviews');
reviewRoutes(app, Review);
const commentRoutes = require('./controllers/comments');
commentRoutes(app, Comment);

app.post('/reviews/comments', (req, res) => {
  Comment.create(req.body).then(comment => {
    res.redirect(`/reviews/${comment.reviewId}`)
  }).catch((err) => {
    console.log(err.message)
  })
})

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

app.delete('/reviews/comments/:id', function (req, res) {
  console.log("DELETE comment")
  Comment.findByIdAndRemove(req.params.id).then((comment) => {
    res.redirect(`/reviews/${comment.reviewId}`);
  }).catch((err) => {
    console.log(err.message);
  })
})

app.get('/', (req, res) => {
  Review.find().then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    }).catch(err => {
      console.log(err);
    })
});
// CREATE
app.post('/reviews', (req,res) => {
  Review.create(req.body).then((review) =>{
    console.log(review);
    res.redirect(`/reviews/${review._id}`);
  }).catch((err) => {
    console.log(err.message);
  })
});

// EDIT
  app.get('/reviews/:id/edit', function (req,res) {
    Review.findById(req.params.id, function(err, review){
      res.render('reviews-edit', {review: review});
    })
  })
// NEW
  // app.get('/reviews/new', (req,res) => {
  //   res.render('reviews-new', {});
  // });
// UPDATE
  app.put('/reviews/:id', (req,res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    }).catch(err => {
      console.log(err.message)
    })
  })
// DESTROY
  app.delete('/reviews/:id', function (req,res) {
    console.log("DELETE review");
    Review.findByIdAndRemove(req.params.id).then((review) => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
    })
  })

  // app.listen(3000, () => {
  //   console.log('App listening on port 3000!')
  // });

  module.exports = app;
