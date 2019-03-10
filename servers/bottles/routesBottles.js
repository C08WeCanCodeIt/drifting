const express = require('express');
const Oceans = require('./models/ocean');
const Bottles = require('./models/bottle');
const Tags = require('./models/tag');
//const ObjectID = require('mongodb').ObjectID;

const router = express.Router();
const fetch = require("node-fetch");

////////////////////////// /bottles ENDPOINT ROUTERS //////////////////////////

// create a bottle in the ocean
router.post("/ocean/:name", (req, res) => {
    if (!req.body.body || req.body.body.length === 0) {
        res.status(403).send({ error: "Cannot posts an empty bottle" });
    }

    if (!req.body.isPublic && (!req.body.tags || !req.body.tags.length === 0)) {
        res.status(403).send({ error: "Public Posts cannot have no tags" });
    }

    // searching mongo to find ocean with given name
    Oceans.findOne({ "name": req.params.name.toLowerCase() }).exec().then(ocean => {
        if (!ocean) {
            return res.status(404).send({ error: "Ocean named " + req.params.name + " was not found" });
        }

        //go through each tag in the req body
        // make post request to make all the tags
        // if the post is public, increase the tag count

        let inputTags = req.body.tags
        inputTags = inputTags.toLowerCase().split(",");
        for (i = 0; i < inputTags.length; i++) {
            inputTags[i] = inputTags[i].trim();
        }
        let tempSet = new Set(inputTags);
        let tagsFiltered = Array.from(tempSet);

        tagsFiltered.forEach(function (t) {
            //let tagCheck = ocean.tags.filter(tag => tag.name == t);

            Tags.findOne({"ocean" : req.params.name.toLowerCase(), "name": t}).exec().then(tag => {
                postCount = 0;
                if (req.body.isPublic) {
                    postCount = 1;
                }

                if (!tag) { //tag never existed
                    Tags.create({
                        ocean: req.params.name,
                        name: t,
                        count: postCount,
                        lastUpdated: Date.now()
                    }).then(newTag => {
                        newTag.save();
                    }).catch(err => {
                        res.status(400).send({ error: "couldn't create a new tag: " + err });
                    });
                } else {
                    if (req.body.isPublic) { //only update counds if it's public
                        tag[0].count = tag[0].count + 1;
                        tag[0].lastUpdated = Date.now()
                        tag.save();
                    }
                }
            });
            
            /* if (tagCheck && tagCheck.length != 0) {

                tagCheck[0].count = tagCheck[0].count + 1;
                tagCheck[0].lastUpdate = Date.now();

                console.log(tagCheck[0].count);

            } else {
                let newTag = {
                    name: t,
                    count: 1,
                    lastUpdate: Date.now(),
                };

                ocean.tags.push(newTag);
            } */
        });

        // create a new bottle
        // make it so people can only edit on their personal page ????
        /*         let bottle = {
                    //creator: user,
                    _id: new ObjectID(),
                    emotion: req.body.emotion,
                    exercise: req.body.exercise,
                    body: req.body.body,
                    tags: tagsFiltered,
                    createdAt: Date.now(),
                    isPublic: req.body.isPublic
                }; */

        Bottles.create({
            ocean: req.params.name.toLowerCase(),
            emotion: req.body.emotion,
            exercise: req.body.exercise,
            body: req.body.body,
            tags: tagsFiltered,
            createdAt: Date.now(),
            isPublic: req.body.isPublic
        }).then(bottle => {
            bottle.save().then(() => {
                res.setHeader("Content-Type", "application/json");
                res.status(200).send(bottle);
            });
        }).catch(err => {
            res.status(400).send({ error: "Unable to create bottle: " + err });;
        });;


        // save the bottle in the specific ocean
        //ocean.bottles.push(bottle);

/*         ocean.save().then(() => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).send(bottle);
        }).catch(err => {
            res.status(400).send({ error: "Unable to save post" + err });;
        }); */
    }).catch(err => {
        res.status(400).send({ error: "Unable to post bottle in the ocean: " + err });;
    })
});

// update the bottle contents
router.patch("/ocean/:name/:id", (req, res) => {
    //get the xuser stuff

    Oceans.findOne({ "name": req.params.name }).then(ocean => {
        if (!ocean) {
            return res.status(404).send({ error: "Ocean named " + req.params.name + " was not found" });
        }

        let bottle = ocean.bottles.filter(bottle => bottle.__id == req.params.id);

        // check if you wrote the bottle

        if (!bottle) {
            return res.status(404).send({ error: "Bottle with given id was not found" });
        }


        // cannot have empty
        if (req.body.body && req.body.body.length != 0) {
            bottle[0].body = req.body.body;
        }

        let newTags = req.body.tags;
        newTags = newTags.toLowerCase().split(",")
        for (i = 0; i < newTags.length; i++) {
            newTags[i] = newTags[i].trim();
        }
        let tagsFiltered = new Set(newTags);

        if (bottle.isPublic) {

            // assumption: all tags are already existing
            // old tags == existing tags
            // remove all the old tags
            oldTags = bottle[0].tags;
            oldTags.forEach(function (t) {
                // go through each of the tag in the original
                // decrease the count for all the tags
                currTag = ocean.tags.filter(tag => tag.name == t);
                if (currTag[0].count != 0) {
                    currTag[0].count -= 1
                }
            });

            tagsFiltered.forEach(function (t) {
                //go through all the new tags
                // update the counts of all the tags
                // update the last update time

                // if new tag: non-existent tag:
                // > create a new tag and update the count
                currTag = ocean.tags.filter(tag => tag.name == t);
                currTag[0].count += 1
                currTag[0].lastUpdate = Date.now()
            });
        }
        // updating the tags
        bottle[0].tags = tagsFiltered;


        ocean.save().then(() => {
            return res.status(200).send(bottle[0]);
        });

    }).catch(err => {
        return res.status(400).send({ error: "Unable to update the bottle" });
    });
});

// deleting a bottle
router.delete("/ocean/:name/:id", (req, res) => {
    //return res.status(200).send({ message: "HERE I AM"});
    Oceans.findOne({ "name": req.params.name }).exec().then(ocean => {

        if (!ocean) { // did not find a ocean with given name
            return res.status(404).send({ error: "ocean with given name was not found" })
        }

        // check if there is a bottle with that id
        let bottle = ocean.bottles.filter(b => b._id == req.params.id);
        if (bottle.length == 0) {
            return res.status(400).send({ error: "No bottle found with that id" });
        }
        // check if you are a moderator account or that user

        if (bottle.isPublic) {
            //delete post count for that specific tag
            bottle.tags.forEach(function (t) {
                currTag = ocean.tags.filter(tag => tag.name == t.name)
                if (currTag && currTag[0].count != 0) {
                    currTag[0].count -= 1
                }
            });
        }

        // delete the bottle
        let originalLength = ocean.bottles.length;
        ocean.bottles = ocean.bottles.filter(bottle => bottle._id != req.params.id); //filter out bottles that match the id

        // bottle was deleted
        if (originalLength != ocean.bottles.length) {
            ocean.save().then(() => {
                return res.status(200).send({ message: "bottle was sucessfully deleted" });
            });
        }

    }).catch(err => {
        return res.status(400).send({ error: "Unable to delete bottle: " + err });
    });
});

//TODO: Get all the routers that the current user posted

module.exports = router;

