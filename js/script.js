$(document).ready(function() {
  var url = 'https://api.themoviedb.org/3/search/movie';
  var query = 'Il gladiatore';
  // var userInput = $('input').val();
  // console.log(userInput);
  $.ajax(
    {
      url: url,
      method: 'GET',
      data: {
        api_key: 'c0810927127de0abbc728e88cbc79828',
        query: query
      },
      success: function (data) {
        console.log(data);
      },
      error: function (request, state, errors) {
        alert('errore');
      }
    }
  );
});


// handlebars
// var source = document.getElementById("entry-template").innerHTML;
// var template = Handlebars.compile(source);
// var context = { title: "My New Post", body: "This is my first post!" };
// var html = template(context);





// MY API KEY
// c0810927127de0abbc728e88cbc79828
