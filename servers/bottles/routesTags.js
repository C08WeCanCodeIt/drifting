const express = require('express');
const Oceans = require('./models/ocean');
const Tags = require('./models/tag')

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
                    newTag.save().then(()=> {
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

    /*      Oceans.findOne({ "name": req.params.name }).exec().then(ocean => {
            if (!ocean) {
                return res.status(404).send({ error: "Ocean named " + req.params.name + " was not found" });
            }
            tagName = req.body.name;
           
            // create a new tag
            // make it so people can only edit on their personal page ????
            let tag = {
                name: tagName.toLowerCase().trim(),
                count: 0,
                lastUpdate: Date.now(),
            };
    
            // save the bottle in the specific ocean
            ocean.tags.push(tag);
            ocean.save().then(() => {
                res.setHeader("Content-Type", "application/json");
                res.status(200).send({ messsage: "Created new tag: " + req.body.name });
            });
        }).catch(err => {
            res.status(400).send({ error: "could not create new tag: " + err });
        });  */
});

//get all the tags in an ocean
//not really needed tho
router.get("/ocean/:name/tags", (req, res) => {
    Tags.find({"ocean" : req.params.name}).exec().then(tags => {
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
// DON'T KNOW WHAT TO DO WITH POSTS THAT HAVE THAT ONLY 1 TAG???
router.delete("/ocean/:name/tags/:tagName", (req, res) => {
    /*     Oceans.findOne({ "name": req.params.name }).exec().then(ocean => {
            if (!ocean) {
                return res.status(404).send({ error: "Ocean named " + req.params.name + " was not found" });
            }
            res.setHeader("Content-Type", "application/json");
            res.status(200).send(ocean.tags);
        }); */
    Tags.findOneAndDelete({"ocean": req.params.name, "name": req.params.tagName}, (err, response) => {
        res.status(200).send({ message: "tag " + req.params.nameName + " was sucessfully deleted" });
    });
});