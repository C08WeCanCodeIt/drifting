const express = require('express');
const Oceans = require('./models/ocean');
const Tags = require('./models/tag')
const Bottles = require('./models/bottle');

const router = express.Router();
const fetch = require("node-fetch");

//create a tag (for a specific ocean)
//delete tag

module.exports = router;

router.post("/ocean/:name/tags", (req, res) => {
    Oceans.findOne({ "name": req.params.name }).exec().then(ocean => {
        if (!ocean) { //check if ocean exists
            return res.status(404).send({ error: "Ocean named " + req.params.name + " was not found" });
        }

        Tags.findOne({ "name": tag, "ocean": ocean.name }).exec().then(tag => {
            if (!tag) {
                Tags.create({
                    ocean: req.params.name,
                    name: req.body.name,
                    count: 0,
                    lastUpdated: Date.now()
                }).then(newTag => {
                    newTag.save().then(() => {
                        res.setHeader("Content-Type", "application/json");
                        res.status(200).send({ messsage: "Created new tag: " + req.body.name });
                    });
                }).catch(err => {
                    res.status(400).send({ error: "couldn't create a new tag: " + err });
                });
            }
        });
    }).catch(err => {
        res.status(400).send({ error: "Error finding ocean: " + err });
    });
});

//get all the tags in an ocean
//not really needed tho
router.get("/ocean/:name/tags", (req, res) => {
    Tags.find({ "ocean": req.params.name }).sort({ "count": -1 }).exec().then(tags => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(tags);

    }).catch(err => {
        res.status(400).send({ error: "Error" + err });
    })

    /*     Oceans.findOne({ "name": req.params.name }).exec().then(ocean => {
            if (!ocean) {
                return res.status(404).send({ error: "Ocean named " + req.params.name + " was not found" });
            }
            res.setHeader("Content-Type", "application/json");
            res.status(200).send(ocean.tags);
        }); */
});


//delete a tag
// 1. find the ocean
// 2. find all the posts with that tag
// 3. fetch request so all the posts get updated
router.delete("/ocean/:name/tags/:tagName", (req, res) => {
    Tags.findOneAndDelete({ "ocean": req.params.name, "name": req.params.tagName }, (err, response) => {
        Bottles.find({ "ocean": req.params.name, "tags": { $all: req.params.tagName } }).sort({ "createdAt": -1 }).exec().then(filteredBottles => {

            // deletes tags from all the bottles
            filteredBottles.forEach(function (bot) {
                bot.tags = bot.tags.filter(tag => tag !== req.params.tagName);
                bot.save();
            });


            res.status(200).send({ message: "tag " + req.params.tagName + " was sucessfully deleted" });
        }).catch(err => {
            res.status(400).send({ error: "Error removing tags from posts with the tag" + req.params.tagName + ": " + err });
        });

    });
});