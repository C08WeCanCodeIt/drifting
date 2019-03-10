const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
    ocean: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    count: { type: Number },
    lastUpdated: { type: Date }
});

const Tag = mongoose.model('tag', TagSchema);

module.exports = Tag;