const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OceanSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    bottles: [],
    tags: []
});

const Ocean = mongoose.model('ocean', OceanSchema);

module.exports = Ocean;

/* OVERALL TAGS IN THE OCEAN 
tags: [{
    tagName: {
        type: String,
    },
    tagCount: {
        type: Number,
    },
    tagLastUpdate: {
        type: Date
    }
}] */

//OVERALL STRUCTURE OF A BOTTLE
/* {
    creator: {
        type: {
            id: {
                type: Number
            },
            username: String,
        }
    },
    body: {
        type: String,
            required: true
    },
    createdAt: {
        type: Date
    },
    editedAt: {
        type: Date
    },
    isPublic: {
        type: Boolean,
            required: true
    },
    tags: [{
        tag: String
    }]
} */