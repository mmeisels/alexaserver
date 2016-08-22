module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'deliverybot' );
var sf = require('node-salesforce');

var pubnub = require("pubnub")({
    ssl           : true,
    publish_key   : "pub-c-46d93d38-de2a-48fa-ba27-11b2d8dcff30",
    subscribe_key : "sub-c-573f0f1e-6828-11e6-8c1f-02ee2ddab7fe"
});


module.exports = app;
