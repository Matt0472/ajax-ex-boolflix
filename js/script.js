$(document).ready(function() {
  alert('Ciao porco!:D');


  // $.ajax(
  //   {
  //     url: 'https://flynn.boolean.careers/exercises/api/holidays',
  //     method: 'GET',
  //     data: {
  //       year: month.year(),
  //       month: month.month()
  //     },
  //     success: function (data) {
  //       var holidays = data.response;
  //       for (var i = 0; i < holidays.length; i++) {
  //         var thisHoliday = holidays[i];
  //         var thisHolidayData = thisHoliday.date;
  //         $('li[data-date-complete="'+ thisHolidayData  +'"]').addClass('holiday');
  //         $('li[data-date-complete="'+ thisHolidayData  +'"]').find('.nome-festivita').append('-' +  ' ' + thisHoliday.name);
  //       }
  //     },
  //     error: function () {
  //       alert('errore');
  //     }
  //   }
  // );
});
