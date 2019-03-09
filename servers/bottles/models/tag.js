const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
    ocean: string,
    name: string,
    count: Number,
    body: [],
    lastUpdated: {type: Date}
});

const Tag = mongoose.model('tag', TagSchema);

module.exports = Tag;