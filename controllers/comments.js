module.exports = function (app, Comment) {

  app.delete('/reviews/comments/:id', function (req, res) {
    console.log("DELETE comment")
    Comment.findByIdAndRemove(req.params.id).then((comment) => {
      res.redirect(`/reviews/${comment.reviewId}`);
    }).catch((err) => {
      console.log(err.message);
    })
  })
  // NEW Comment
  // app.post('/reviews/comments', (req, res) => {
  //   console.log("recieved comment")
  //   Comment.create(req.body).then(comment => {
  //     res.redirect(`/reviews/${comment.reviewId}`);
  //   }).catch((err) => {
  //     console.log(err.message);
  //   });
  // });

  // CREATE Comment
app.post('/reviews/comments', (req, res) => {
  Comment.create(req.body).then(comment => {
    res.status(200).send({ comment: comment });
  }).catch((err) => {
    res.status(400).send({ err: err })
  })
})
}
