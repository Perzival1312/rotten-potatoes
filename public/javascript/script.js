axios.get('http://www.thecolorapi.com/id?hex=24B1E0')
  .then(function (response) {
    console.log(response.data.hex.clean)
  }).catch(function (error) {
    if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx

    } else if (error.request) {
      alert(error.request);
    } else {
      alert('Error', error.message);
    }
    alert(error.config);
  }).catch(function (error) {
    console.log(error);
});

document.getElementById("new-comment").addEventListener("submit", e => {
    // prevent the default form behavior
    e.preventDefault();

    // serialize the form data into an object
    let comment = {};
    const inputs = document.getElementsByClassName('form-control');
    for (var i = 0; i < inputs.length; i++) {
      comment[inputs[i].name] = inputs[i].value;
    }

    // use axios to initialize a post request and send in the form data

    axios.post('/reviews/comments', comment)
      .then(function (response) {
        // wait for the success response from the server
        console.log(response);
        // remove the information from the form
        // display the data as a new comment on the page
      })
      .catch(function (error) {
        console.log(error);
        // handle any errors
        alert('There was a problem saving your comment. Please try again.')
      });
});

axios.post('/user', comment)
     .then(function (response) {
       // wait for the success response from the server
       console.log(response);
       // remove the information from the form
       this.reset();
       // display the data as a new comment on the page
       document.getElementById('comments').prepend(
         `
          <div class="card">
            <div class="card-block">
              <h4 class="card-title">${response.title}</h4>
              <p class="card-text">${response.content}</p>
              <p>
                 <form method="POST" action="/reviews/comments/${response._id}?_method=DELETE">
                   <button class="btn btn-link" type="submit">Delete</button>
                 </form>
              </p>
            </div>
          </div>
         `
       );
     })
