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
    reportedCount: {
        type: Number,
        default: 0,
        select: false
    },
    creatorID: {
        type: Number,
        select: false
    },
    createdAt: { type: Date },
    editedAt: { type: Date }
});

const Bottle = mongoose.model('bottle', BottleSchema);

BottleSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.creatorID;
    return obj;
}

module.exports = Bottle;



