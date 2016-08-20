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
		var accountName;
		var accountId;
		var opptyAmount=0;
    var records = [];
		conn.query("SELECT Id, Name, Type, BillingState, BillingCity, BillingStreet FROM Account Where Name like '%" +name+"%'" , function(err, result) {
		  if (err) { return console.error(err); }
		  console.log("total : " + result.totalSize);
		  console.log("fetched : " + result.records.length);
		  for (var i=0; i<result.records.length; i++) {
      	var record = result.records[i];
      	console.log("Name: " + record.Name);
				accountName = record.Name;
				accountId = record.Id;
				conn.query("SELECT Id, Amount FROM Opportunity Where Account.Id = '" +accountId + "'", function(err1, result1) {
					if (err1) { return console.error(err1); }
					console.log("Oppty total : " + result1.totalSize);
					for (var j=0; j<result1.records.length; j++) {
						var record1 = result1.records[j];
	      		opptyAmount = opptyAmount + record1.Amount;
					}
					console.log("Oppty Amount Total : " + opptyAmount);
				});
				console.log("done with speech ? : " + result.done);
				response.say("Hi, my name is Alexa. I am running on Heroku. We have found a record for Account Name " + accountName + ".  "+ accountName + " has total Opportunity Amount value of " + opptyAmount +".");
    	}
		});
  }
);

module.exports = app;
