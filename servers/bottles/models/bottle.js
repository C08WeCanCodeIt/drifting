const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BottleSchema = new Schema({
    ocean: {type: String},
    emotion: { type: String }, //convert string to number javascript
    exercise: { type: String },
    body: [],
    tags: [],
    isPublic: {
        type: Boolean,
        default: false
    },
    createdAt: { type: Date },
    editedAt: { type: Date }
});

const Bottle = mongoose.model('bottle', BottleSchema);

module.exports = Bottle;