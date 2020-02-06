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
        var films = data.results;
        console.log(films);
      },
      error: function (request, state, errors) {
        alert('errore');
      }
    }
  );
});

function printSingleFilm(array) {
  var source = $('#entry-template').html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < array.length; i++) {
    var thisFilm = array[i];
    var context = {
      title: thisFilm.title,
      original_title: thisFilm.original_title,
      original_language: thisFilm.original_language,
      vote_average: thisFilm.vote_average
    };
    var html = template(context);
    $('.movies_list_container').append(html);
  }
}
// handlebars
// var source = document.getElementById("entry-template").innerHTML;
// var template = Handlebars.compile(source);
// var context = { title: "My New Post", body: "This is my first post!" };
// var html = template(context);





// MY API KEY
// c0810927127de0abbc728e88cbc79828
