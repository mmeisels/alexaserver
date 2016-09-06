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
  response.say( 'Welcome to the real Salesforce One. Good Morning Mr President.' ).reprompt( 'This works nicely.' ).shouldEndSession( false );
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

app.intent('Dance',
  {
    "slots":{"name":"AMAZON.US_FIRST_NAME"},
    "utterances":[
		"Dance",
		"Music",
    "Blink",
		]
  },
	function(request,response) {
    console.log('In Dance mode');
    var takeoffMessage = {
      "command" : "dance"
    };
    console.log('Dance Message Done');
    console.log('Dance Starting');
    var publishConfig = {
        "channel"   : 'my_channel',
        "message"   : takeoffMessage
    };
    console.log('Dance Starting');
    try {
      pn.publish(publishConfig, function(status, response) {
        console.log(status, response);
      })
      console.log('1+\<audio src="https:\/\/dronemusic.herokuapp.com\/drone.mp3" \/\>');
      response.say('Drone has started to Dance. Lets get down people and boogie. <audio src="https://dronemusic.herokuapp.com/drone.mp3" />');
      response.send();
    } catch (e) {
      console.log(e);
    }
    console.log('Dance Finished Logging .');
    return false;
  }
);

app.intent('Forward',
  {
    "slots":{"steps":"NUMBER","speed":"NUMBER"},
    "utterances":[
		"Foward"
		]
  },
	function(request,response) {
    var steps = request.slot('steps');
    var speed = request.slot('speed');

    console.log('Moving Forward');
    var takeoffMessage = {
      "command" : "forward",
      "steps" : steps,
      "speed": speed
    };
    console.log('Moving Forward Done');
    var publishConfig = {
        "channel"   : 'my_channel',
        "message"   : takeoffMessage
    };
    try {
      pn.publish(publishConfig, function(status, response) {
        console.log(status, response);
      })
      response.say("Drone is moving forward " + steps + " with a speed of " + speed );
      response.send();
    } catch (e) {
      response.say("Drone has errored");
      response.send();
    }
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


app.intent('North',
  {
    "slots":{"steps":"NUMBER"},
    "utterances":[
		"north"
		]
  },
	function(request,response) {
    var steps = request.slot('steps');

    console.log('Moving Forward');
    var moveMessage = {
      "command" : "north",
      "steps" : steps
    };
    console.log('Moving North Done');
    console.log(moveMessage);
    var publishConfig = {
        "channel"   : 'my_channel',
        "message"   : moveMessage
    };
    try {
      pn.publish(publishConfig, function(status, response) {
        console.log(status, response);
      })
      response.say("Drone is moving " + steps);
      response.send();
    } catch (e) {
      response.say("Drone has errored on Forward");
      console.log(e);
      response.send();
    }
    return false;
  }
);

app.intent('South',
  {
    "slots":{"steps":"NUMBER"},
    "utterances":[
		"south"
		]
  },
	function(request,response) {
    var steps = request.slot('steps');

    console.log('Moving South');
    var moveMessage = {
      "command" : "south",
      "steps" : steps
    };
    console.log('Moving South Done');
    var publishConfig = {
        "channel"   : 'my_channel',
        "message"   : moveMessage
    };
    try {
      pn.publish(publishConfig, function(status, response) {
        console.log(status, response);
      })
      response.say("Drone is moving " + steps);
      response.send();
    } catch (e) {
      response.say("Drone has errored on Forward");
      response.send();
    }
    return false;
  }
);


app.intent('East',
  {
    "slots":{"steps":"NUMBER"},
    "utterances":[
		"east"
		]
  },
	function(request,response) {
    var steps = request.slot('steps');

    console.log('Moving East');
    var moveMessage = {
      "command" : "east",
      "steps" : steps
    };
    console.log('Moving East Done');
    var publishConfig = {
        "channel"   : 'my_channel',
        "message"   : moveMessage
    };
    try {
      pn.publish(publishConfig, function(status, response) {
        console.log(status, response);
      })
      response.say("Drone is moving " + steps);
      response.send();
    } catch (e) {
      response.say("Drone has errored on Forward");
      response.send();
    }
    return false;
  }
);

app.intent('West',
  {
    "slots":{"steps":"NUMBER"},
    "utterances":[
		"west"
		]
  },
	function(request,response) {
    var steps = request.slot('steps');

    console.log('Moving West');
    var moveMessage = {
      "command" : "west",
      "steps" : steps
    };
    console.log('Moving West Done');
    var publishConfig = {
        "channel"   : 'my_channel',
        "message"   : moveMessage
    };
    try {
      pn.publish(publishConfig, function(status, response) {
        console.log(status, response);
      })
      response.say("Drone is moving " + steps);
      response.send();
    } catch (e) {
      response.say("Drone has errored on Forward");
      response.send();
    }
    return false;
  }
);

module.exports = app;
