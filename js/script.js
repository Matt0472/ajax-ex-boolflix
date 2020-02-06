$(document).ready(function() {
  var url = 'https://api.themoviedb.org/3/search/movie';
  $(document).on('click', '.search_btn', function () {
    $('.movies_list_container').html('');
    var userInput = $('.search_movies').val().toLowerCase();
    if (userInput == '') {
      return;
    }
      $.ajax(
        {
          url: url,
          method: 'GET',
          data: {
            api_key: 'c0810927127de0abbc728e88cbc79828',
            query: userInput,
            language: 'it-IT'
          },
          success: function (data) {
            var movies = data.results;
            printSingleMovie(movies);
          },
          error: function (request, state, errors) {
            alert('errore');
          }
        }
      );
      var userInput = $('.search_movies').val('');
  });
});





//----------------------------->FUNCTION<-------------------------------------//
function printSingleMovie(array) {
  var source = $('#entry-template').html();
  var template = Handlebars.compile(source);
  if (array.length == 0) {
    alert('Siamo spiacenti, nessun titolo trovato')
  } else {
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
}
