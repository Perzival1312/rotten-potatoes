// URL	      HTTP VERB	  ACTION	   WHAT IT DOES
// /movies	      GET	    index	     See all movies
// /movies/:id	  GET	    show	     See one movie

const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('de629d8abe9509713535b1ecc0f4cc0f')
module.exports = function(app) {


  app.get('/', (req, res) => {
    moviedb.miscNowPlayingMovies().then(response => {
      res.render('movies-index', { movies: response.results });
    }).catch(console.error)
  });
  app.get('/movies', (req, res) => {

  }).catch(err) => {
    console.log(err.message)
  }
}
// // SHOW
// app.get('/movies/:id', (req, res) => {
//   moviedb.movieInfo({ id: req.params.id }).then(movie => {
//     if (movie.video) {
//       moviedb.movieVideos({ id: req.params.id }).then(videos => {
//         movie.trailer_youtube_id = videos.results[0].key
//         renderTemplate(movie)
//       })
//     } else {
//       renderTemplate(movie)
//     }
//
//     function renderTemplate(movie)  {
//       res.render('movies-show', { movie: movie });
//     }
//
//   }).catch(console.error)
// })
