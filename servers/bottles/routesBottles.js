const express = require('express');
const Oceans = require('./models/ocean');

const router = express.Router();
const fetch = require("node-fetch");

////////////////////////// /bottles ENDPOINT ROUTERS //////////////////////////

// create a bottle in the ocean
router.post("/ocean/:name", (req, res) => {
    if (!req.body.body || req.body.body.length === 0) {
        res.status(403).send({ error: "Cannot posts an empty bottle" });
    }

    if (!isPublic && (!req.body.tags || !req.body.tags.length === 0)) {
        res.status(403).send({ error: "Public Posts cannot have no tags" });
    }

    // searching mongo to find ocean with given name
    Oceans.findOne({ "name": req.params.name }).exec().then(ocean => {
        if (!ocean) {
            return res.status(404).send({ error: "Ocean named " + req.params.name + " was not found" });
        }

        //go through each tag in the req body
        // make post request to make all the tags
        // if the post is public, increase the tag count
        let inputTags = req.body.tags.split(",");
        for (i = 0; i < inputTags.length; i++) {
            inputTags[i] = inputTags[i].trim().toLowerCase();
        }
        let tagsFiltered = new Set(inputTags);


        tagsFiltered.forEach(function (t) {
            let tagCheck = ocean.tags.filter(tag => tag.tagName == t.tagName);

            if (tagCheck.length != 0) {
                let newNag = {
                    tagName: tagCheck[0].tagName,
                    tagCount: 0,
                    tagLastUpdate: Date.now(),
                };

                ocean.tags.push(newTag);
            }
        });

        // create a new bottle
        // make it so people can only edit on their personal page ????
        let bottle = {
            //creator: user,
            body: req.body.body,
            tags: req.body.tags,
            createdAt: Date.now(),
            isPublic: req.body.isPublic
        };


        // save the bottle in the specific ocean
        ocean.bottles.push(bottle);
        ocean.save().then(() => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).send(bottle);
        });
    });
}).catch(err => {
    res.status(400).send({ error: "bottle couldn't be posted: " + err });
});

// update the bottle contents
router.patch("/ocean/:name/bottles/:id", (req, res) => {
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


        if (req.body.tags && req.body.tags.length != 0) {
            let newTags = req.body.tags.split(",");
            for (i = 0; i < newTags.length; i++) {
                newTags[i] = newTags[i].trim().toLowerCase();
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
                    currTag = bottle[0].tags.filter(tag => tag.tagName == t.tagName);
                    if (currTag.tagCount != 0) {
                        currTag.tagCount -= 1
                    }
                });

                tagsFiltered.forEach(function (t) {
                    //go through all the new tags
                    // update the counts of all the tags
                    // update the last update time

                    // if new tag: non-existent tag:
                    // > create a new tag and update the count
                    currTag = bottle[0].tags.filter(tag => tag.tagName == t.tagName);
                    if (currTag.tagCount != 0) {
                        currTag.tagCount += 1
                        currTag.tagLastUpdate = Date.now()
                    }
                });
            }
            // updating the tags
            bottle[0].tags = tagsFiltered;
        }

        ocean.save().then(() => {
            return res.status(200).send(bottle[0]);
        });

    }).catch(err => {
        return res.status(400).send({ error: "Unable to update the bottle" });
    });
});

// deleting a bottle
router.delete("ocean/:name/bottles/:id", (req, res) => {
    Oceans.findOne({ "name": req.params.name }).exec().then(ocean => {

        if (!ocean) { // did not find a ocean with given name
            return res.status(404).send({ error: "ocean with given name was not found" })
        }

        // check if there is a bottle with that id
        let bottle = ocean.bottles.filter(b => b.__id == req.params.id);
        if (bottle.length == 0) {
            return res.status(400).send({ error: "No bottle found with that id" });
        }
        // check if you are a moderator account or that user



        if (bottle.isPublic) {
            //delete post count for that specific tag
            bottle.tags.forEach(function (t) {
                currTag = bottle[0].tags.filter(tag => tag.tagName == t.tagName)
                if (currTag.tagCount != 0) {
                    currTag.tagCount -= 1
                }
            });
        }

        // delete the bottle
        let originalLenth = ocean.bottles.length;
        ocean.bottles = ocean.bottles.filter(bottle => bottle.__id != req.params.id); //filter out bottles that match the id

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