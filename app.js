/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
//var assert = require('assert');
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');




var MongoClient = require('./node_modules/mongodb').MongoClient;
// create a new express server
var app = express();


var pvp = 0;
var pve = 0;
var url = 'mongodb://admin:GUBDQEQPNICZVOET@sl-us-dal-9-portal.3.dblayer.com:17399,sl-us-dal-9-portal.0.dblayer.com:17399/admin?ssl=true';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});

app.get('/pvp', function(req, res) {
	
	pvp++;
	MongoClient.connect(url, function(err, db) {
  	assert.equal(null, err);
	  insertDocumentpvp(db, function() {
	      db.close();
	  });
});
});

app.get('/pve', function(req, res) {
	
	pve++;
	MongoClient.connect(url, function(err, db) {
  	assert.equal(null, err);
  	insertDocumentpve(db, function() {
      db.close();
  });
});
});

var insertDocumentpvp = function(db, callback) {
   db.collection('fiar').insertOne( {
      "optionpvp":pvp
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback();
  });
};

var insertDocumentpve = function(db, callback) {
   db.collection('fiar').insertOne( {
      "optionpve":pve
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback();
  });
};






// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
