module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'sprk-intro' );


app.launch( function( request, response ) {
	response.say( 'Welcome to the Salesforce Intro' ).reprompt( 'This works nicely.' ).shouldEndSession( false );
} );


app.error = function( exception, request, response ) {
	console.log(exception)
	console.log(request);
	console.log(response);
	response.say( 'Sorry an error occured ' + error.message);
};

app.intent('sayHeroku',
  {
    "slots":{"name":"AMAZON.US_FIRST_NAME"}
	,"utterances":[
		"tell me where you are running {name}"
		]
  },
  function(request,response) {
    var name = request.slot('name');
    response.say("Hi, my name is Alexa. I am running on Heroku. Thanks " + name);
  }
);

module.exports = app;
