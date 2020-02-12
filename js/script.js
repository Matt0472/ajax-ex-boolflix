$(document).ready(function () {
  $(document).on('click', '#search_btn', function() {
    var query = $('#search_movies').val();
    resetSearch();
    printSingleMovie(query);
    printSingleSerie(query);
  });
  $('#search_movies').keypress(function(event) {
    if (event.which == 13) {
      var query = $('#search_movies').val();
      resetSearch();
      printSingleMovie(query);
      printSingleSerie(query);
    }
  });
  // printCastMovie();
  // printCastSerie();
});

// ----------------------------->FUNCTION<----------------------------------//

// FUNZIONE PER IL RESET DELLA BARRA DI RICERCA E PER I CONTENITORI
function resetSearch() {
  $('.movies_list_container').html('');
  $('.series_list_container').html('');
  $('#search_movies').val('');
}
// FUNZIONE PER LA STAMPA DEI FILM
function printSingleMovie(string) {
  var api_key = 'c0810927127de0abbc728e88cbc79828';
  var url = 'https://api.themoviedb.org/3/search/movie';

  $.ajax({
    url: url,
    method: 'GET',
    data: {
      api_key: api_key,
      query: string,
      language: 'it-IT'
    },
    success: function(data) {
      if(data.total_results > 0) {
        var films = data.results;
        printResult('film', films);
        for (var i = 0; i < films.length; i++) {
          var thisMovie = data.results[i].id;
          // console.log(thisMovie);
          printCastMovie(thisMovie);
        }
      } else {
        printNoResult($('.movies_list_container'));
      }

    },
    error: function (request, state, errors) {
      console.log(errors);
    }
  });

}
// FUNZIONE PER LA STAMPA DELLE SERIE
function printSingleSerie(string) {
  var api_key = 'c0810927127de0abbc728e88cbc79828';
  var url = 'https://api.themoviedb.org/3/search/tv';

  $.ajax({
    url: url,
    method: 'GET',
    data: {
      api_key: api_key,
      query: string,
      language: 'it-IT'
    },
    success: function(data) {
      if(data.total_results > 0) {
        var tv = data.results;
        printResult('tv', tv);
      } else {
        printNoResult($('.series_list_container'));
      }

    },
    error: function (request, state, errors) {
      console.log(errors);
    }
  });

}
// FUNZIONE PER LA STAMPA DELLE STELLE
function printStars (num) {
  num = Math.ceil(num / 2);
  var string = '';

  for (var i = 1; i <= 5; i++) {
    if(i <= num ) {
      string += '<i class="fas fa-star"></i>';
    } else {
      string += '<i class="far fa-star"></i>';
    }
  }

  return string
}
// FUNZIONE PER LA STAMPA DELLE BANDIERE DELLE LINGUE
function printLanguage(string) {
  var availableLangs = [
    'en',
    'it',
    'fr',
    'de',
    'pt',
    'zh',
    'es',
    'cs',
    'ja'
  ];

  if(availableLangs.includes(string)) {
    string = '<img class="lang" src="img/flag-of-' + string + '.png" alt="language">';
  }

  return string;
}
// FUNZIONE PER LA STAMPA DEI RISULTATI CHE CAMBIA IN BASE A SE TROVA UN FILM O UNA SERIETV
function printResult(type, results) {
  var source = $('#film-series-template').html();
  var template = Handlebars.compile(source);
  var title;
  var originalTitle;

  for (var i = 0; i < results.length; i++) {
    var thisResult = results[i];

    if(type == 'film') {
      originalTitle = thisResult.original_title;
      title = thisResult.title;
      var container = $('.movies_list_container');
    } else if (type == 'tv'){
      originalTitle = thisResult.original_name;
      title = thisResult.name;
      var container = $('.series_list_container');
    }

    var context = {
      type: type,
      title: title,
      original_title: originalTitle,
      original_language: printLanguage(thisResult.original_language),
      vote_average: printStars(thisResult.vote_average),
      poster_path: printPoster(thisResult.poster_path),
      overview: printOverview(thisResult.overview)
    };

    var html = template(context);

    container.append(html);
  }
}
// FUNZIONE PER LA STAMPA SE NON CI SONO RISULTATI
function printNoResult(container) {
  var source = $('#noresult-template').html();
  var template = Handlebars.compile(source);
  var html = template();
  container.append(html);
}
// FUNZIONE PER LA STAMPA DELLE COPERTINE
function printPoster(poster) {
  var url = 'https://image.tmdb.org/t/p/w342';
  if (poster != null) {
    url += poster;
  } else {
    url = 'img/not_found_2.jpg';
  }
  return url;
}
// FUNZIONE PER LA STAMPA DELLE OVERVIEW
function printOverview(overview) {
  if (overview == '') {
    overview = 'Nessuna trama disponibile!'
  }
  return overview;
}
//FUNZIONE PER LA CHIAMATA DEL CAST DEI FILM
function printCastMovie(id) {
  $.ajax({
    url: 'https://api.themoviedb.org/3/movie/'+ id +'/credits',
    method: 'GET',
    data: {
      api_key: 'c0810927127de0abbc728e88cbc79828',
      language: 'it-IT'
    },
    success: function(data) {
      console.log(data);
    },
    error: function (request, state, errors) {
      console.log(errors);
    }
  });
}
//FUNZIONE PER LA CHIAMATA DEL CAST DEI DELLE SERIE
function printCastSerie(id) {
  $.ajax({
    url: 'https://api.themoviedb.org/3/tv/'+ id +'/credits',
    method: 'GET',
    data: {
      api_key: 'c0810927127de0abbc728e88cbc79828',
      language: 'it-IT'
    },
    success: function(data) {
      console.log(data);
    },
    error: function (request, state, errors) {
      console.log(errors);
    }
  });
}
