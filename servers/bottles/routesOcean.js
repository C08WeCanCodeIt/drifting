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
            res.status(400).send({ error: "Unable to delete the bottles in ocean" + req.params.name + ": " + err });
        });

        Tags.deleteMany({ "ocean": req.params.name }, (err, res) => {
        }).catch(err => {
            res.staus(400).send({ error: "Unable to delete the tags in ocean" + req.params.name + ": " + err });
        });;

        res.status(200).send({ message: "ocean " + req.params.name + " was sucessfully deleted" });
    }).catch(err => {
        res.status(400).send({ error: "couldn't delete ocean named " + req.params.name })
    });
});


// get everything inside a specific ocean
router.get("/ocean/:name", (req, res) => {
    let currURL = req.url.trim();
    Oceans.findOne({ "name": req.params.name }).exec().then(currOcean => {

        //get all the current tags
        Tags.find({ "ocean": currOcean.name }).sort({"lastUpdated": -1}).exec().then(tag => {

            //no query tag or has empty query ie "/ocean/:name?tags="
            if (currURL.indexOf("?tags=") == -1 || currURL.indexOf("=") == req.url.length - 1) {
                Bottles.find({ "ocean": currOcean.name, "isPublic": true }).sort({"createdAt": -1}).exec().then(bottle => {
                    let result = {
                        ocean: currOcean.name,
                        tags: tag,
                        bottles: bottle
                    }

                    res.setHeader("Content-Type", "application/json");
                    res.status(200).send(result);
                }).catch(err => {
                    res.sendStatus(500).send({ error: "couldn't get bottles from current ocean: " + err });
                });
            } else {
                // gets all the bottles with tags specified
                // asynch stuff:
                // gets all the tags to filter by first
                // filters through the tags
                convertTagQuery(req.url, function (queryTags) {
                    Bottles.find({ "ocean": currOcean.name, "isPublic": true, "tags": { $all: queryTags} }).sort({"createdAt": -1}).exec().then(filteredBottle => {

                        let result = {
                            ocean: currOcean.name,
                            tags: tag,
                            filteredBy: queryTags,
                            bottles: filteredBottle
                        }

                        res.setHeader("Content-Type", "application/json");
                        res.status(200).send(result);

                    }).catch(err => {
                        return res.sendStatus(500).send({ error: "couldn't get bottles from current ocean: " + err });
                    });
                })

            }
        }).catch(err => {
            res.sendStatus(500).send({ error: "couldn't get bottles from current ocean: " + err });
        });
    }).catch(err => {
        res.sendStatus(404).send({ error: "no ocean was found with the name " + req.params.name + ": " + err });
    });
});

//TODO: Get all the oceans that the current is in
module.exports = router;


//gets all the query parameters from the request
function convertTagQuery(url, callback) {
    let query = url.substring(url.indexOf("?tags=") + "?tags=".length);
    
    //replace %20 with spaces
    if (query.indexOf("%20") != -1) {
        query = query.replace("%20", " ");
    }

    let newTags = query.toLowerCase().split(",")
    for (i = 0; i < newTags.length; i++) {
        newTags[i] = newTags[i].trim();
    }
    let tempSet = new Set(newTags);
    let tagsFiltered = Array.from(tempSet);

    return callback(tagsFiltered);
}
