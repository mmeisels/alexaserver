module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'deliverbot' );
var sf = require('node-salesforce');
var async = require('async');

var conn = new sf.Connection({
  // you can change loginUrl to connect to sandbox or prerelease env.
  // loginUrl : 'https://test.salesforce.com'
});

var pubnub = require("pubnub")({
    ssl           : true,
    publish_key   : "pub-c-46d93d38-de2a-48fa-ba27-11b2d8dcff30",
    subscribe_key : "sub-c-573f0f1e-6828-11e6-8c1f-02ee2ddab7fe"
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
  console.log("Echo Bot onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
  var speechOutput = "Welcom to Echo Bot, Please initiate connection to drone";
  response.say(speechOutput);
});


module.exports = app;
