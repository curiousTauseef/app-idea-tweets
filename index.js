var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var mongo = require('mongodb');
var Twit = require('twit'); 
var io = require('socket.io').listen(server);  
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

server.listen(3000, function() {
  console.log("The server is running.");
});

// You won't need the index.html. THis is built so you can see the Tweet stream as it updates
//thanks to Socket.io
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

// Your keywords to search within the Tweet Stream
var watchlist = ['startup ideas, problems, i want an app, new app, startup'];

// Twitter API credentials
var T = new Twit({
	consumer_key:'[ your Twitter API Consumer key ]',
	consumer_secret:'[ your Twitter API Consumer secret ]',
	access_token:'[ your Twitter API access token ]',
	access_token_secret:'[ your Twitter Access token secret ]',
});

//Sockets.io connection
io.sockets.on('connection', function (socket) {

	var stream = T.stream('statuses/filter', { track: watchlist }); 

	stream.on('tweet', function (tweet) { 
    // when a new Tweet pops into the stream, we get some data from the Tweet object. More information 
    // about the object keys you can use can be found at https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/tweet-object
		io.sockets.emit('stream', tweet.user.profile_image_url + "," 
			+ tweet.created_at + "," + tweet.id + "," + tweet.text 
			+ ", @" + tweet.user.screen_name);   

		//enter in ability to enter in text to database 
		MongoClient.connect(url, function(err, db) {
          if (err) throw err;

          var dbo = db.db("twitterfeed");
          var myobj = { 
        	    tweet_id: tweet.id, 
         	    tweet: tweet.text, 
              twitter_handle_image: tweet.user.profile_image_url,
              twitter_handle: tweet.user.screen_name, 
              created_at: tweet.created_at,
           };
          dbo.collection("tweets").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
          });
        }); 
	});
  
}); 