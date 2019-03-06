const express = require('express');
const Oceans = require('./models/ocean');

const router = express.Router();
const fetch = require("node-fetch");

//create a tag (for a specific ocean)
//increase tagcount by 1
//decrease tagcount by 1
//delete tag

module.exports = router;

router.post("/ocean/:name/tags", (req, res) => {
    Oceans.findOne({ "name" : req.params.name}).exec().then(ocean => {
        if (!ocean) {
            return res.status(404).send({error : "Ocean named " + req.params.name + " was not found"});
        }

        // create a new tag
        // make it so people can only edit on their personal page ????
        let tag = {
            tagName: req.body.tagName,
            tagCount: 0,
            tagLastUpdate: Date.now(),
        };

        // save the bottle in the specific ocean
        ocean.tags.push(tag);
        ocean.save().then(() => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).send({messsage: "Created new tag: " + req.body.tagName});
        });
    });

}).catch(err => {
    res.status(400).send({error: "could not create new tag: " + err});
});