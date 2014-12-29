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

	db.collection("events", function(err, events_col) {
		if (err) {
			console.log("events collection cannot be fetched nor created")
			throw err
		}
		else console.log("events collection is ok")

		//return all events
		ws.get('/events', function(req, res) {
			console.log("get events")
			events_col.find().toArray(function (err, events) {
				if (!err) {
					console.log("find events is ok")
					res.send(JSON.stringify(events))
				}
				else res.send(err)
			})
		})

		//return event with id
		ws.get('/events/:id', function(req, res) {
			events_col.find({id:req.params.id}).toArray(function (err, evt) {
				if (!err) res.send(JSON.stringify(evt))
				else res.send(err)
			})
		})

		//post a new event
		ws.post('/events',function(req,res) {
			//TODO Login Password
			console.log("post")
			console.log("event:"+req.body)
			console.log("event:"+JSON.stringify(req.body))
			events_col.insert(req.body, function(err,evt) {
				if (!err) res.send(evt)
				else res.send(err)
			})
		})
	})

	db.collection("inscriptions", function(err, inscriptions_col) {
		if (err) {
			console.log("inscriptions collection cannot be fetched nor created")
			throw err
		}
		else console.log("inscriptions collection is ok")

		//return all events
		ws.get('/inscriptions', function(req, res) {
			console.log("get inscriptions")
			inscriptions_col.find().toArray(function (err, inscriptions) {
				if (!err) {
					console.log("find inscriptions is ok")
					res.send(JSON.stringify(inscriptions))
				}
				else res.send(err)
			})
		})

		//return event with id
		ws.get('/inscriptions/:event_id', function(req, res) {
			inscriptions_col.find({event_id:req.params.event_id}).toArray(function (err, inscriptions) {
				if (!err) res.send(JSON.stringify(inscriptions))
				else res.send(err)
			})
		})

		//post a new event
		ws.post('/inscriptions',function(req,res) {
			//TODO Login Password
			console.log("post")
			console.log("inscriptions:"+req.body)
			console.log("inscriptions:"+JSON.stringify(req.body))
			inscriptions_col.insert(req.body, function(err,evt) {
				if (!err) res.send(evt)
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

