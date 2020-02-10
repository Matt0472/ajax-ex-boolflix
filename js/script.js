$(document).ready(function() {
  var urlMovies = 'https://api.themoviedb.org/3/search/movie';
  var urlSeries = 'https://api.themoviedb.org/3/search/tv';
  $(document).on('click', '.search_btn', function () {
    $('.movies_list_container').html('');
    var userInput = $('.search_movies').val().toLowerCase();
    if (userInput == '') {
      return;
    }
      $.ajax(
        {
          url: urlMovies,
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
      $.ajax(
        {
          url: urlSeries,
          method: 'GET',
          data: {
            api_key: 'c0810927127de0abbc728e88cbc79828',
            query: userInput,
            language: 'it-IT'
          },
          success: function (data) {
            var series = data.results;
            printSingleSerie(series);
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
    alert('Siamo spiacenti, nessun film trovato')
  } else {
    for (var i = 0; i < array.length; i++) {
      var thisFilm = array[i];

      var context = {
        title: thisFilm.title,
        original_title: thisFilm.original_title,
        original_language: 'img/flag-of-' + thisFilm.original_language + '.png',
        vote_average: printStars(thisFilm.vote_average),
        poster_path: thisFilm.poster_path
      };
      var html = template(context);
      $('.movies_list_container').append(html);
    }
  }
}
function printSingleSerie(array) {
  var source = $('#entry-template-series').html();
  var template = Handlebars.compile(source);
  if (array.length == 0) {
    alert('Siamo spiacenti, nessuna serieTv trovata')
  } else {
    for (var i = 0; i < array.length; i++) {
      var thisSerie = array[i];

      var context = {
        name: thisSerie.name,
        original_name: thisSerie.original_name,
        original_language: 'img/flag-of-' + thisSerie.original_language + '.png',
        vote_average: printStars(thisSerie.vote_average),
        poster_path: thisSerie.poster_path
      };
      var html = template(context);
      $('.movies_list_container').append(html);
    }
  }
}

function printStars(vote) {
  var vote = Math.round(vote / 2);
  var stars = '';
  for (var i = 1; i <= 5; i++) {
    if (i <= vote) {
      var singleStar = '<i class="fas fa-star"></i>';
    } else {
      var singleStar = '<i class="far fa-star"></i>';
    }
    stars += singleStar;
  }
  return stars;
}

// function printImage(string) {
//   $.ajax(
//     {
//       url: 'https://image.tmdb.org/t/p/w185' + string,
//       method: 'GET',
//       success: function (data) {
//         console.log(data);
//       },
//       error: function (request, state, errors) {
//         alert('errore');
//       }
//     }
//   );
// }
