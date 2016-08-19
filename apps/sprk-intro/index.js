module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'sprk-intro' );
var sf = require('node-salesforce');

var conn = new sf.Connection({
  // you can change loginUrl to connect to sandbox or prerelease env.
  // loginUrl : 'https://test.salesforce.com'
});
conn.login('mmeisels@demo.trolleyapp1', 'demopassw0rd8JMXR8jIgqdyVAGpyFEA238f', function(err, userInfo) {
  if (err) { return console.error(err); }
  // Now you can get the access token and instance URL information.
  // Save them to establish connection next time.
  console.log(conn.accessToken);
  console.log(conn.instanceUrl);
  // logged in user property
  console.log("User ID: " + userInfo.id);
  console.log("Org ID: " + userInfo.organizationId);
});

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
		"say the number",
		"tell me where you are running {name}",
		"test"
		]
  },
  function(request,response) {
		var name = request.slot('name');
    var records = [];
		conn.query("SELECT Id, Name, Type, BillingState, BillingCity, BillingStreet FROM Account Where Name like '%" +name+"%'" , function(err, result) {
		  if (err) { return console.error(err); }
		  console.log("total : " + result.totalSize);
		  console.log("fetched : " + result.records.length);
		  for (var i=0; i<result.records.length; i++) {
      	var record = result.records[i];
      	console.log("Name: " + record.Name);
      	console.log("Created Date: " + record.CreatedDate);
    	}
			console.log("done ? : " + result.done);

		});
		response.say("Hi, my name is Alexa. I am running on Heroku. Thanks " + name);
  }
);

module.exports = app;
