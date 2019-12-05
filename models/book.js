const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema ({
    title: {type: String, required: true },
    author: { type: String, required: true },
    image: String,
    description: String,
    published: Number
});

module.exports = mongoose.model('Book', bookSchema);