const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema = new Schema({
    title: {
        type: String,
        required: [true, 'must provide title'],
        trim: true
    },
    body:{
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Note', notesSchema);