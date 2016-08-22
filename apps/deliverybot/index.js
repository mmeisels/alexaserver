module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'deliverybot' );
var sf = require('node-salesforce');
var PubNub = require('pubnub');

var pn = new PubNub({
    ssl           : true,
    publishKey   : "pub-c-46d93d38-de2a-48fa-ba27-11b2d8dcff30",
    subscribeKey : "sub-c-573f0f1e-6828-11e6-8c1f-02ee2ddab7fe"
});

var conn = new sf.Connection({
  // you can change loginUrl to connect to sandbox or prerelease env.
  // loginUrl : 'https://test.salesforce.com'
});

conn.login('mmeisels@demo.trolleyapp1', 'demopassw0rd8JMXR8jIgqdyVAGpyFEA238f', function(err, userInfo) {
  if (err) { return console.error(err); }
  console.log(conn.accessToken);
  console.log(conn.instanceUrl);
  console.log("User ID: " + userInfo.id);
  console.log("Org ID: " + userInfo.organizationId);
});

app.launch(function( request, response ) {
  response.say( 'Welcome to the The Drone Machine' ).reprompt( 'This works nicely.' ).shouldEndSession( false );
});

app.intent('Land',{
    "slots":{"name":"AMAZON.US_FIRST_NAME"},
    "utterances":[
		"Land the drone",
		"Stop",
		"Sleep",
		"Go Down",
    "Land"
		]
  },
	function(request,response) {
    console.log('In Land mode');
    var landMessage = {
      "command" : "land"
    };
    console.log('Land Message Done');
    console.log('PN Starting');
    var publishConfig = {
        "channel"   : 'my_channel',
        "message"   : landMessage
    };
    console.log('PN1 Starting');
    try {
      pn.publish(publishConfig, function(status, response) {
        console.log(status, response);
      })
      response.say("Drone has landed. Thank you for your loyalty. See you next time.");
      response.send();
    } catch (e) {
      console.log(e);
    }
    console.log('Returned');
    return false;
  }
);

app.intent('TakeOff',
  {
    "slots":{"name":"AMAZON.US_FIRST_NAME"},
    "utterances":[
		"Take Off",
		"Fly",
		"Fly the drone",
		"Hover",
    "Go Up",
    "Blink",
		]
  },
	function(request,response) {
    console.log('In Take Off mode');
    var takeoffMessage = {
      "command" : "takeOff"
    };
    console.log('Take Off Message Done');
    console.log('PN Starting');
    var publishConfig = {
        "channel"   : 'my_channel',
        "message"   : takeoffMessage
    };
    console.log('PN1 Starting');
    try {
      pn.publish(publishConfig, function(status, response) {
        console.log(status, response);
      })
      response.say("Drone has taken off. Watch your heads people.");
      response.send();
    } catch (e) {
      console.log(e);
    }
    console.log('Returned');
    return false;
  }
);


app.intent('Initiate',
  {
    "slots":{"name":"AMAZON.US_FIRST_NAME"},
    "utterances":[
		"Blink",
		"Initiate Drone",
		"Initiate",
		"Start Drone",
    "Wake up",
    "Wake up Spider"
		]
  },
	function(request,response) {
    console.log('In Initiate mode');
    var initMessage = {
      "command" : "initiate"
    };
    console.log('Initiate Message Done');
    console.log('PN Starting');
    var publishConfig = {
        "channel"   : 'my_channel',
        "message"   : initMessage
    };
    console.log('PN1 Starting');
    try {
      pn.publish(publishConfig, function(status, response) {
        console.log(status, response);
      })
      response.say("Drone has Initiated. This bird is ready to go.");
      response.send();
    } catch (e) {
      console.log(e);
    }
    console.log('Returned');
    return false;
  }
);

module.exports = app;
