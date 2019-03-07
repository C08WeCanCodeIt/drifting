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
        res.status(400).send({ error: "couldn't create a ocean " + err });
    });
});


// get all oceans
router.get("/ocean", (req, res) => {
    Oceans.find({}).exec().then(ocean => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(ocean);
    }).catch(err => {
        res.send(500).send({ error: "couldn't get all the existing oceans: " + err });
    });
});

// get everything inside a specific ocean
router.get("/ocean/:name", (req, res) => {
    Oceans.find({ "name": req.params.name }).exec().then(ocean => {
        currBottles = ocean.bottles; //TODO: figure out how to limit the number of messages

        // if tags included in the search
        // otherwise will return EVERYTHING
        if (req.body.tags || req.body.tags.length != 0) {

            // filter the tags
            let searchTags = req.body.tags.split(",");
            for (i = 0; i < searchTags.length; i++) {
                searchTags[i] = searchTags[i].trim().toLowerCase();
            }
            let tagsFiltered = new Set(searchTags);

            //need to test!!!!
            // find all the bottles that contain ALL the specified tags
            currBottles.find({ tags: { $all: tagsFiltered } }).exec().then(filteredBottles => {
                currBottles = filteredBottles;
            })
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).send(currBottles);

    }).catch(err => {
        res.send(404).send({ error: "no ocean was found with the name " + req.params.name + ": " + err });
    })
});

//delete an ocean
router.delete("/ocean/:name", (req, res) => {
    Oceans.findOneAndDelete({ "name": req.params.name, }, (err, response) => {

        /* let qPayLoad = {};
        qPayLoad.type = 'course-delete';
        qPayLoad.channel = response;
        ch.sendToQueue(
            "rabbitmq",
            new Buffer.from(JSON.stringify(qPayLoad)),
            { persistent: true }
        ); */

        res.status(200).send({ message: "ocean " + req.params.name + " was sucessfully deleted" });
    }).catch(err => {
        res.status(400).send({ error: "couldn't delete ocean named " + req.params.name })
    });
});

//TODO: Get all the oceans that the current is in
module.exports = router;