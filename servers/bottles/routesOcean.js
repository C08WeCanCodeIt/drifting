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
/* router.get("/ocean/:name", (req, res) => {
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
}); */

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

//TODO: Get all the oceans that the current is in
module.exports = router;



// get everything inside a specific ocean
router.get("/ocean/:name", (req, res) => {
    let currURL = req.url.trim();
    Oceans.findOne({ "name": req.params.name }).exec().then(currOcean => {

        //get all the current tags
        Tags.find({ "ocean": currOcean.name }).exec().then(tag => {

            //no query tag or has empty query ie "/ocean/:name?tags="
            if (currURL.indexOf("=") == -1 || currURL.indexOf("=") == req.url.length - 1) {
                Bottles.find({ "ocean": currOcean.name, "isPublic": true }).exec().then(bottle => {
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
                console.log("THIS HAS TAGS");
                //gets all the bottles with tags specified
                //let searchTags = req.body.tags.split(",");
                //for (i = 0; i < searchTags.length; i++) {
                //    searchTags[i] = searchTags[i].trim().toLowerCase();
                //}
                //let tempSet = new Set(searchTags);
                //let tagsFiltered = Array.from(tempSet);
                //let queryTags = convertTagQuery(req.url, res.params.name);
                //console.log(queryTags);

                //, tags: { $all: convertTagQuery(req.url) }
                convertTagQuery(req.url, function (queryTags) {
                    console.log("HERE I AMMMMMMMMMMMMMM", queryTags);

                    Bottles.find({ "ocean": currOcean.name, "isPublic": true }).exec().then(filteredBottle => {

                        let result = {
                            ocean: currOcean.name,
                            tags: tag,
                            filteredBy: queryTags,
                            bottles: filteredBottle
                        }

                        res.setHeader("Content-Type", "application/json");
                        res.status(200).send(result);
                        //return res.setHeader("Content-Type", "application/json").status(200).send(result);

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


/* function convertTagQuery(url) {
    //https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams
    //https://stackoverflow.com/questions/6912584/how-to-get-get-query-string-variables-in-express-js-on-node-js    
    //let url_parts = url.parse(req.url, true);
    //let query = url_parts.query;
    let query = url.substring(url.indexOf("?tags=") + "?tags=".length)

    //query = query.replace("%20", " ");
    //newTags = newTags.toLowerCase().split("%2C")
    //let params = (new URL(url)).searchParams;
    //let query = params.get('tags'); 


    let newTags = query.toLowerCase().split(",")
    for (i = 0; i < newTags.length; i++) {
        newTags[i] = newTags[i].trim();
    }
    let tempSet = new Set(newTags);
    let tagsFiltered = Array.from(tempSet);
    console.log(tagsFiltered);
    return tagsFiltered;
} */

function convertTagQuery(url, callback) {
    let query = url.substring(url.indexOf("?tags=") + "?tags=".length);

    let newTags = query.toLowerCase().split(",")
    for (i = 0; i < newTags.length; i++) {
        newTags[i] = newTags[i].trim();
    }
    let tempSet = new Set(newTags);
    let tagsFiltered = Array.from(tempSet);
    console.log(tagsFiltered);

    return callback(tagsFiltered);
}
