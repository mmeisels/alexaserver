module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'sprk-intro' );
var sf = require('nforce');


app.launch( function( request, response ) {
	var org = nforce.createConnection({
			clientId: '3MVG9ZL0ppGP5UrD7bdKrIeH_G8yN3HCU9hsbJF9bXFVV.rk6__dE8YqktR8.4Um42rx1HI3WTzrrJCsK00uA',
			clientSecret: '5774826133130504419',
			redirectUri: 'https://alexaserver1.herokuapp.com/alexa/sprk-intro',
			mode: 'single'

			org.authenticate(req.query, function(err) {
				console.log('Connected Fine');
				if (!err) {
					org.query({ query: 'SELECT id, name, type, industry, rating FROM Account' }, function(err, results) {
						if (!err) {
							console.log('Results Fine');
						}
						else {
							console.log('Error Results');
						}
					});
				}
				else {
					if (err.message.indexOf('invalid_grant') >= 0) {
						console.log('Error Connect');
					}
					else {
						console.log('Error MEssage ' + err.message);
					}
				}
			});
	});
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
		"say the number",
		"tell me where you are running {name}",
		"test"
		]
  },
  function(request,response) {
		var name = request.slot('name');
    var records = [];

    response.say("Hi, my name is Alexa. I am running on Heroku. Thanks " + name);
  }
);

module.exports = app;
