const express = require('express')
const app = express()
const mongoose = require('mongoose');
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true}));
// app.get('/', (req, res) => {
//   res.render('home', {msg: 'Hello World!'});
// })
// let reviews = [
//   { title: "Great Review" },
//   { title: "Next Review" },
//   { title: "This is dull" }
// ]
const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
});


app.get('/', (req, res) => {
  Review.find().then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})
 app.post('/reviews', (req,res) => {
   Review.create(req.body).then((review) =>{
     console.log(review);
     res.redirect('/');
   }).catch((err) => {
     console.log(err.message);
   })
   // res.render(reviews-new', {});
 })

app.get('/reviews/new', (req,res) => {
  res.render('reviews-new', {});
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
