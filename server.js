var express= require('express')
var path = require('path')
var application_root = __dirname
var db_url= 'mongodb://localhost:27017/bmx-canejan'

var bodyParser = require('body-parser')


var mong_client= require('mongodb').MongoClient
var ws= express()

//files for HTML pages
ws.use(express.static(path.join(application_root ,'./app')));
ws.use( bodyParser.json() );       // to support JSON-encoded bodies
ws.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

mong_client.connect(db_url, function(err, db){
	if (err) throw err;

	db.collection("messages", function(err, msg_col) {
		if (err) {
			console.log("messages collection cannot be fetched nor created")
			throw err
		}
		else console.log("collection is ok")

		//return all messages
		ws.get('/messages', function(req, res) {
			console.log("get messages")
			msg_col.find().toArray(function (err, msg) {
				if (!err) {
					console.log("find is ok")
					res.send(JSON.stringify(msg))
				}
				else res.send(err)
			})
		})

		//return messages of a specific kind
		ws.get('/messages/:kind', function(req, res) {
			msg_col.find({kind:req.params.kind}).toArray(function (err, msg) {
				if (!err) res.send(JSON.stringify(msg))
				else res.send(err)
			})
		})

		//post a new message
		ws.post('/messages',function(req,res) {
			console.log("post")
			console.log("msg:"+req.body)
			console.log("msg:"+JSON.stringify(req.body))
			msg_col.insert(req.body, function(err,imsg) {
				if (!err) res.send(imsg)
				else res.send(err)
			})
		})
	})

})



//Start server
var port = 4711;
ws.listen(port, function () {
    'use strict'
    console.log('Express server listening on port %d in %s mode', port, ws.settings.env)
});

