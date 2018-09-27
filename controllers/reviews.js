// const Review = require('./models/review');
module.exports = function (app, Review) {
  // app.get('/', (req, res) => {
  //   Review.find().then(reviews => {
  //       res.render('reviews-index', { reviews: reviews });
  //     }).catch(err => {
  //       console.log(err);
  //     })
  // });
  // NEW
    app.get('/movies/:movieId/reviews/new', (req,res) => {
      res.render('reviews-new', { movieId: req.params.movieId })
    });
// CREATE
  app.post('/movies/:movieId/reviews', (req,res) => {
    Review.create(req.body).then((review) =>{
      console.log(review);
      res.redirect(`/movies/:movieId/reviews/${review._id}`);
    }).catch((err) => {
      console.log("here");
      console.log(err.message);
    })
  });
// EDIT
  app.get('/movies/:movieId/reviews/:id/edit', function (req,res) {
    Review.findById(req.params.id, function(err, review){
      res.render('reviews-edit', {review: review});
    })
  })
// UPDATE
  app.put('/movies/:movieId/reviews/:id', (req,res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/movies/${review.movieId}`)
      // res.redirect(`/reviews/${review._id}`)
    }).catch(err => {
      console.log(err.message)
    })
  })
// DESTROY
  app.delete('/movies/:movieId/reviews/:id', function (req,res) {
    console.log("DELETE review");
    Review.findByIdAndRemove(req.params.id).then((review) => {
      res.redirect(`/movies/${review.movieId}`);
    }).catch((err) => {
      console.log(err.message);
    })
  })
// start
  app.listen(3000, () => {
    console.log('App listening on port 3000!')
  });
}
