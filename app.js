const express = require('express')
const app = express()
const mongoose = require('mongoose');
var exphbs = require('express-handlebars');

mongoose.connect('mongodb://localhost/rotten-potatoes');
const Review = mongoose.model('Review', {
  title: String
});
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// app.get('/', (req, res) => {
//   res.render('home', {msg: 'Hello World!'});
// })
// let reviews = [
//   { title: "Great Review" },
//   { title: "Next Review" },
//   { title: "This is dull" }
// ]

// INDEX
app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
