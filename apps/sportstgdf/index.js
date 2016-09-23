module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'sportstg' );


app.launch( function( request, response ) {
	response.say( 'Welcome to the Keynote' ).reprompt( '' ).shouldEndSession( false );
} );


app.error = function( exception, request, response ) {
	console.log(exception)
	console.log(request);
	console.log(response);
	response.say( 'Sorry an error occured ' + error.message);
};

app.intent('sayNumber',
  {
		"utterances":[
			"tell me my next game",]
  },
  function(request,response) {
    response.say("Hi Glen. Your next game will be in 3 hours time. The game is against Tullamarine. Have a look at the Sports TG app for directions. Good luck with the game, Glen. ");
  }
);

module.exports = app;
