// @ts-nocheck
const express = require('express');

const Oceans = require('./models/ocean');
const Bottles = require('./models/bottle');
const Tags = require('./models/tag');

const router = express.Router();
const fetch = require("node-fetch");

////////////////////////// /ocean ENDPOINT ROUTERS //////////////////////////
// Creating an Ocean
// Deleting an Ocean
// Posting to an Ocean
// Fetch Request for creating tags

//create an ocean
router.post("/ocean", (req, res) => {
    /*     Oceans.find({ "name": req.body.name.toLowerCase() }).exec().then(ocean => {
            if (ocean) {
                return res.status(400).send({ error: "Ocean with the name " + req.body.name.toLowerCase() + " already exists " + ocean.name });
            } */

    Oceans.create({
        name: req.body.name.toLowerCase()
    }).then(ocean => {
        //insert rabbitMQ stuff
        ocean.save().then(() => {
            res.setHeader("Content-Type", "application/json");
            res.status(201).send(ocean);
        }).catch(err => {
            console.log(err);
        });

    }).catch(err => {
        res.status(400).send({ error: "couldn't create a ocean: " + err });
    });
    /*     }); */
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
    Oceans.findOne({ "name": req.params.name }).exec().then(currOcean => {

        //get all the current tags
        Tags.find({ "ocean": currOcean.name }).exec().then(tag => {

            if (!req.body.tags || req.body.tags.length == 0) {
                Bottles.find({ "ocean": currOcean.name, "isPublic": true }).exec().then(bottle => {

                    let result = {
                        ocean: currOcean.name,
                        tags: tag,
                        bottles: bottle
                    }

                    res.setHeader("Content-Type", "application/json");
                    res.status(200).send(result);
                }).catch(err => {
                    console.log("NO TAGS ERROR", err);
                    res.send(500).send({ error: "couldn't get bottles from current ocean: " + err });
                });
            } else {
                //gets all the bottles with tags specified
                let searchTags = req.body.tags.split(",");
                for (i = 0; i < searchTags.length; i++) {
                    searchTags[i] = searchTags[i].trim().toLowerCase();
                }
                let tempSet = new Set(searchTags);
                let tagsFiltered = Array.from(tempSet);

                Bottles.find({ tags: { $all: tagsFiltered } }).exec().then(filteredBottle => {

                    let result = {
                        ocean: currOcean.name,
                        tags: tag,
                        filteredBy: tagsFiltered,
                        bottles: filteredBottle
                    }

                    res.setHeader("Content-Type", "application/json");
                    res.status(200).send(result);


                }).catch(err => {
                    console.log("YES TAGS ERROR", err);
                    res.send(500).send({ error: "couldn't get bottles from current ocean: " + err });
                });
            }
        }).catch(err => {
            res.send(500).send({ error: "couldn't get bottles from current ocean: " + err });
        });
    }).catch(err => {
        res.send(404).send({ error: "no ocean was found with the name " + req.params.name + ": " + err });
    });
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
        Bottles.deleteMany({ "ocean": req.params.name }, (err, res) => {
        }).catch(err => {
            res.send(400).send({ error: "Unable to delete the bottles in ocean" + req.params.name + ": " + err });
        });

        Tags.deleteMany({ "ocean": req.params.name }, (err, res) => {
        }).catch(err => {
            res.send(400).send({ error: "Unable to delete the tags in ocean" + req.params.name + ": " + err });
        });;

        res.status(200).send({ message: "ocean " + req.params.name + " was sucessfully deleted" });
    }).catch(err => {
        res.status(400).send({ error: "couldn't delete ocean named " + req.params.name })
    });
});

//TODO: Get all the oceans that the current is in
module.exports = router;