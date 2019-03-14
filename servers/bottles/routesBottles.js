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
    //if (!req.body.body || req.body.body.length === 0) {
    //    res.status(403).send({ error: "Cannot posts an empty bottle" });
    //}

    //if (!req.body.isPublic && (!req.body.tags || !req.body.tags.length === 0)) {
    //    res.status(403).send({ error: "Public Posts cannot have no tags" });
    //}

    // searching mongo to find ocean with given name
    Oceans.findOne({ "name": req.params.name.toLowerCase() }).exec().then(ocean => {
        if (!ocean) {
            return res.status(404).send({ error: "Ocean named " + req.params.name + " was not found" });
        }

        //go through each tag in the req body
        // make post request to make all the tags
        // if the post is public, increase the tag count

        // cleaning the tags
        // all lowercase
        // no repeated tags, 
        // no leading/trailing whitespace
        let inputTags = req.body.tags
        inputTags = inputTags.toLowerCase().split(",");
        for (i = 0; i < inputTags.length; i++) {
            inputTags[i] = inputTags[i].trim();
        }
        let tempSet = new Set(inputTags);
        let tagsFiltered = Array.from(tempSet);

        tagsFiltered.forEach(function (t) {
            Tags.findOne({ "ocean": req.params.name.toLowerCase(), "name": t }).exec().then(tag => {
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
                        tag.count = tag.count + 1;
                        tag.lastUpdated = Date.now()
                        tag.save();
                    }
                }
            });
        });

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

    }).catch(err => {
        res.status(400).send({ error: "Unable to post bottle in the ocean: " + err });;
    })
});

// update the bottle contents
router.patch("/ocean/:name/bottle/:id", (req, res) => {
    if ((!req.body.body || req.body.length == 0) && (!req.body.tags || req.body.tags.length == 0)) {
        return res.status(400).send({ error: "Cannot have empty tags or empty body" + err });
    }

    //get the xuser stuff
    Bottles.findOne({ "ocean": req.params.name, "_id": req.params.id }).then(bottle => {
        if (!bottle) {
            return res.status(404).send({ error: "Bottle with given id was not found" });
        }

        //TODO: CHECK WHO WROTE THE BOTTLE

        let newTags = req.body.tags;
        newTags = newTags.toLowerCase().split(",")
        for (i = 0; i < newTags.length; i++) {
            newTags[i] = newTags[i].trim();
        }
        let tempSet = new Set(newTags);
        let tagsFiltered = Array.from(tempSet);

        // assumption: all tags are already existing
        // old tags == existing tags
        // remove all the old tags

        // delete the counts for PUBLIC posts
        oldTags = bottle.tags;
        if (bottle.isPublic) {
            oldTags.forEach(function (t) {
                Tags.findOne({ "name": t }).exec().then(tag => {
                    if (tag) {
                        if (tag.count != 0) {
                            tag.count = tag.count - 1;
                        }
                        tag.save();
                    }
                });
            });
        }

        // adds all the new tags from the post
        tagsFiltered.forEach(function (t) {
            Tags.findOne({ "name": t }).exec().then(tag => {
                if (tag) { // tag exists and it's public post
                    if (tag.isPublic) {
                        tag.count = tag.count + 1;
                        tag.lastUpdated = Date.now()
                        tag.save();
                    }

                } else {
                    // tag doesn't exist so creates a new tag
                    // if it's private, don't increase count 
                    let postCount = 0;
                    if (bottle.isPublic) {
                        postCount = 1;
                    }

                    Tags.create({
                        ocean: req.params.name,
                        name: t,
                        count: postCount,
                        lastUpdated: Date.now()
                    }).then(newTag => {
                        newTag.save();
                    }).catch(err => {
                        return res.status(400).send({ error: "couldn't create a new tag: " + err });
                    });
                }
            });
        });

        // updating the tags, body, and update date
        bottle.tags = tagsFiltered;
        bottle.body = req.body.body;
        bottle.lastUpdated = Date.now();

        // sending the updated bottle
        bottle.save().then(() => {
            return res.status(201).send(bottle);
        });
    }).catch(err => {
        return res.status(400).send({ error: "Error updating bottle with ID " + req.params.id + ": " + err });
    });

});

// deleting a bottle
router.delete("/ocean/:name/bottle/:id", (req, res) => {

    // finds the bottle and deletes it
    Bottles.findOneAndDelete({ "_id": req.params.id }, (err, response) => {
        // TODO:
        // CHECK IF YOU ARE A MODERATOR/ADMIN/OR CREATOR OF THE BOTTLE

        // response = orignal bottle with all it's info
        if (response && response !== null) {
            let currTags = response.tags;

            // decrease the counts for all the tags if bottle was public
            if (response.isPublic) {
                currTags.forEach(function (t) {
                    Tags.findOne({ "name": t }).exec().then(tag => {
                        if (tag) {
                            if (tag.count != 0) {
                                tag.count -= 1;
                            }
                            tag.lastUpdated = Date.now();
                            tag.save();
                        }
                    });
                });
            }
        }
        return res.status(200).send({ message: "Bottle with ID " + req.params.id + " was sucessfully deleted " });
    }).catch(err => {
        return res.status(400).send({ error: "Error deleting bottle with ID " + req.params.id + ": " + err });
    });
});

//TODO: Get all the routers that the current user posted

module.exports = router;

