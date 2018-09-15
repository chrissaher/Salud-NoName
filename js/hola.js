var urlParams;

// SIDEBAR
$(document).ready(function(){
  var match;
  var pl     = /\+/g;  // Regex for replacing addition symbol with a space
  var search = /([^&=]+)=?([^&]*)/g;
  var decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };
  var query  = window.location.search.substring(1);

  urlParams = {};
  while (match = search.exec(query)) {
     urlParams[decode(match[1])] = decode(match[2]);
  }

  $('#boton-logout').on('click', function(event) {
    event.preventDefault();

    // Eliminar sesion si esta definida
    if (sesion !== undefined) {
      sesion.eliminarSesion();
    }
    window.location = $(this).attr('href');
  });

  $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    }
  );
  // START OPEN
  //$('.button-collapse').sideNav('show');
    
    // MODAL ABRIR
       $('.modal').modal();
       $('select').material_select();
    
    
    $('.datepicker').pickadate({
        default: 'now',
        firstDay: true,
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year
		format: 'yyyy-mm-dd',
        vibrate: true 
      });
    
    $('.timepicker').pickatime({
        default: 'now',
        twelvehour: false, // change to 12 hour AM/PM clock from 24 hour
        donetext: 'OK',
        autoclose: false,
		//format: 'HH:MM:SS',
        vibrate: true // vibrate the device when dragging clock hand
		//submit: ''
    });

    $("input[name$='cantdosis']").click(function() {
          var cantDosis = $(this).val();
        
          $('div.timeRec').hide();
          
          for (var i= 1; i <= cantDosis; i++) {
            $('#DivRecurrencia' + i).show();
          };
        
    });
   
    
});


