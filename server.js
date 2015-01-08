var express = require('express')
var path = require('path')
var application_root = __dirname
var db_url = 'mongodb://localhost:27017/bmx-canejan'

var bodyParser = require('body-parser')


var mong_client = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID
var ws = express()

//files for HTML pages
ws.use(express.static(path.join(application_root, './app')));
ws.use(bodyParser.json()); // to support JSON-encoded bodies
ws.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));


//304 error !!! I don't really understand
ws.disable('etag');

mong_client.connect(db_url, function(err, db) {
    if (err) res.send(err);

    else {
        //return all events
        ws.get('/events', function(req, res) {
            db.collection("events", function(err, events_col) {
                if (err) res.send(err);
                else if (('from' in req.query) && ('to' in req.query)) { //This route is for Calendar
                    var req_from = parseInt(req.query.from)
                    var req_to = parseInt(req.query.to)
                    var results = {}
                    results.success = 1
                    results.result = []
                        //console.log("from: "+from+" to: "+to)
                        //start end
                    events_col.find()
                        .toArray(function(err, events) {
                            if (!err) {
                                for (var i = events.length - 1; i >= 0; i--) {
                                    events[i].start = new Date(events[i].du).getTime()
                                    events[i].end = new Date(events[i].au).getTime()
                                    events[i].title= events[i].titre
                                };
                                results.result = events
                                res.send(JSON.stringify(results))
                            } else res.send(err);
                        })
                } else if ('inscription' in req.query) { //This route gets only event with open inscription
                    //console.log("inscription")
                    var today = new Date()
                    events_col.find({
                        'inscription': true
                    }).toArray(function(err, events) {
                        if (!err) {
                            var result = []
                            for (var i = events.length - 1; i >= 0; i--) {
                                var date = new Date(events[i].date_inscription)
                                if (today <= date) {
                                    result.push(events[i])
                                }
                            };
                            res.send(JSON.stringify(result))
                        } else res.send(err);
                    })
                } else {
                    events_col.find().toArray(function(err, events) {
                        if (!err) res.send(JSON.stringify(events))
                        else res.send(err);
                    })
                }
            })
        }).get('/events/:id', function(req, res) {
            db.collection("events", function(err, events_col) {
                if (err) {
                    res.send(err);
                } else {
                    events_col.find({
                        id: req.params.id
                    }).toArray(function(err, evt) {
                        if (!err) res.send(JSON.stringify(evt))
                        else res.send(err);
                    })
                }
            })
        }).post('/events', function(req, res) {
            db.collection("events", function(err, events_col) {
                if (err) {
                    res.send(err);
                }
                var mongoID = new ObjectID(req.body._id);
                events_col.findOne({
                    "_id": mongoID
                }, function(err, fevt) {
                    if (err) res.send(err);
                    if (fevt) {
                        console.log("found one")
                        console.log(req.body)
                        events_col.findOneAndReplace({
                            "_id": mongoID
                        }, {
                            "titre": req.body.titre,
                            "du": req.body.du,
                            "au": req.body.au,
                            "inscription": req.body.inscription,
                            "date_inscription": req.body.date_inscription,
                            "url": req.body.url
                        }, function(err, evt) {
                            if (!err) res.send(evt)
                            else res.send(err);
                        })
                    } else {
                        console.log("new one")
                        events_col.insert({
                            "titre": req.body.titre,
                            "du": req.body.du,
                            "au": req.body.au,
                            "inscription": req.body.inscription,
                            "date_inscription": req.body.date_inscription,
                            "url": req.body.url
                        }, function(err, evt) {
                            if (!err) res.send(req.body)
                            else res.send(err);
                        })
                    }
                })
            })
        }).delete('/events', function(req, res) {
            db.collection("events", function(err, events_col) {
                if (err) {
                    res.send(err);
                }

                //TODO Login Password
                events_col.findAndRemove({
                    "_id": new ObjectID(req.query._id)
                }, [ 
                    ['_id', 1]
                ], function(err, evt) {
                    if (!err) {
                        res.send({})
                    } else res.send(err);
                })
            })
        }).get('/inscriptions', function(req, res) {
            db.collection("inscriptions", function(err, inscriptions_col) {
                if (err) {
                    res.send(err);
                }

                if ('event_id' in req.query) { //This route return inscription for an event
                    inscriptions_col.find({
                        event_id: req.query.event_id
                    }).toArray(function(err, inscriptions) {
                        if (!err) res.send(JSON.stringify(inscriptions))
                        else res.send(err);
                    })
                } else {
                    inscriptions_col.find().toArray(function(err, inscriptions) {
                        if (!err) {
                            res.send(JSON.stringify(inscriptions))
                        } else res.send(err);
                    })
                }
            })
        }).post('/inscriptions', function(req, res) {
            db.collection("inscriptions", function(err, inscriptions_col) {
                if (err) {
                    res.send(err);
                }

                //TODO Login Password
                var req_event_id = req.body.event_id
                var req_nom = req.body.nom
                var req_prenom = req.body.prenom

                inscriptions_col.find({
                    event_id: req_event_id,
                    nom: req_nom,
                    prenom: req_prenom,
                }).toArray(
                    function(err, existing) {
                        if (!err) {
                            if (existing.length === 0) {
                                inscriptions_col.insert(req.body, function(err, evt) {
                                    if (!err) res.send({
                                            result: 1
                                        }) //OK
                                    else res.send(err); //KO
                                })
                            } else {
                                res.send({
                                    result: 2
                                }); //already in base
                            }
                        } else {
                            res.send(err);
                        }
                    })
            })
        })
    }
})




//Start server
var port = 8080;
ws.listen(port, function() {
    'use strict'
    console.log('Express server listening on port %d in %s mode', port, ws.settings.env)
});
