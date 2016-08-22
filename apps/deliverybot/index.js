module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'deliverybot' );
var sf = require('node-salesforce');
var pubnub = require("pubnub");
var conn = new sf.Connection({
  // you can change loginUrl to connect to sandbox or prerelease env.
  // loginUrl : 'https://test.salesforce.com'
});

var pn = pubnub({
    ssl           : true,
    publish_key   : "pub-c-46d93d38-de2a-48fa-ba27-11b2d8dcff30",
    subscribe_key : "sub-c-573f0f1e-6828-11e6-8c1f-02ee2ddab7fe"
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
      command : 'land'
    };
    console.log('Land Message Done');
    var message = { "Hello" : "World!" };
    pn.publish({
        channel   : 'hello_world',
        message   : message,
        callback  : function(e) { console.log( "SUCCESS!", e ); },
        error     : function(e) { console.log( "FAILED! RETRY PUBLISH!", e ); }
    });
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
    var takeOffmessage = {
             "command" : "takeOff",
             "sessionId" : session.sessionId
    };
    console.log(pubnub.get_version());
    pn.publish({
         channel   : 'my_channel',
         message   : takeOffmessage,
         callback  : function(e) {
              console.log( "SUCCESS!", e );
              response.say("Drone is flying");
              response.send();
         },
         error     : function(e) {
              response.say("Could not connect to Drone");
              response.send();
             console.log( "FAILED! RETRY PUBLISH!", e ); }
     });
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
    var initiateMessage = {
            "command" : "initiate",
            "sessionId" : session.sessionId
        };
        console.log('In Initiate Message mode');
        console.log(pubnub.get_version());
        pn.publish({
          channel   : 'my_channel',
          message   : initiateMessage,
          callback  : function(e) {
          console.log( "SUCCESS!", e );
          response.say("Drone is ready to fly");
          response.send();
        },
        error     : function(e) {
          response.say("Could not connect to Drone");
          response.send();
          console.log( "FAILED! RETRY PUBLISH!", e );
        }
    });
		return false;
  }
);

module.exports = app;
