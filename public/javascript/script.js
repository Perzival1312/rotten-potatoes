// alert("hello world");
const axios = require('axios');
console.log("hello")

// Make a request to the color api
axios.get('http://www.thecolorapi.com/id?hex=24B1E0')
// alert("Hello World!")
  .then(function (response) {
    // handle success
    // alert("Hello World!")
    console.log("hello")
    alert(response.hex.clean);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
