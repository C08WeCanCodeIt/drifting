const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BottleSchema = new Schema({
    ocean: string,
    emotion: Number, //convert string to number javascript
    exercise: Number,
    body: [],
    tags: [],
    isPublic: boolean,
    createdAt: {type: Date},
    editedAt: {type: Date}
});

const Bottle = mongoose.model('bottle', BottleSchema);

module.exports = Bottle;

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

/*
let bottle = {
    //creator: user,
    emotion: int (-2, -1, 0, 1, 2)
    exercise: 1 (EP)
    body: [{int (question number), string}]
    tags: [string],
    createdAt: Date.now(),
    isPublic: boolean
};

*/