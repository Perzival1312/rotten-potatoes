// const Review = require('./models/review');
module.exports = function (app, Review) {
  app.get('/', (req, res) => {
    Review.find().then(reviews => {
        res.render('reviews-index', { reviews: reviews });
      }).catch(err => {
        console.log(err);
      })
  });
  // NEW
    app.get('/reviews/new', (req,res) => {
      res.render('reviews-new', {});
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
// start
  app.listen(3000, () => {
    console.log('App listening on port 3000!')
  });
}
