const express = require('express');
const Oceans = require('./models/ocean');

const router = express.Router();
const fetch = require("node-fetch");

////////////////////////// /ocean ENDPOINT ROUTERS //////////////////////////
// Creating an Ocean
// Deleting an Ocean
// Posting to an Ocean
// Fetch Request for creating tags

//create an ocean
router.post("/ocean", (req, res) => {
    //let user = JSON.parse(req.get("X-User"));
    // check if user is an admin

    //fetch request for get user by id to double check it's it's type

    Oceans.create({
        name: req.body.name
    }).then(ocean => {
        //insert rabbitMQ stuff
        ocean.save().then(() => {
            res.setHeader("Content-Type", "application/json");
            res.status(201).send(ocean);
        }).catch(err => {
            console.log(err);
        });

    }).catch(err => {
        console.log(err);
    });
}).catch(err => {
    res.status(400).send({error : "couldn't create a ocean " + err});
});

// get all oceans
router.get("/ocean", (req, res) => {
    Oceans.find({}).exec().then(ocean => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(ocean);
    }).catch(err => {
        res.send(500).send({error: "couldn't get all the existing oceans: " + err});
    });
});

// get everything inside a specific ocean
router.get("/ocean/:name", (req, res) => {
    Oceans.find({"name" : req.params.name}).exec().then(ocean => {
        
        // no tags included
        //if (!req.body.tags && req.body.tags.length == 0) {
            res.setHeader("Content-Type", "application/json");
            res.status(200).send(ocean.bottles);
        //} else { //tags included
            // have it so the tags check by AND
            
        
       // }

    }).catch(err => {
        res.send(404).send({error: "no ocean was found with the name " + req.params.name + ": " + err});
    })
});

//delete an ocean
router.delete("/ocean/:name", (req, res) => {
    //let user = JSON.parse(req.get("X-User"));
    //if (user.type == "admin") { //only be able to delete if if person is the admin
        Oceans.findOneAndDelete({"name" : req.params.name, }, (err, response) => {

        }).then(res => {
            return res.json();
        }).catch(err => {
            console.log(err);
        });
        res.status(200).send({message: "ocean " + req.params.name + " was sucessfully deleted"});
    //} else {
    //  res.status(400).send({error : "You are not authorized to delete"});    
    //}

}).catch(err => {
    res.status(400).send({error: "couldn't delete ocean named " + req.params.name })
});


module.exports = router;