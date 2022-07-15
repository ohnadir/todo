const { Schema, model } = require('mongoose')
const mongoose = require('mongoose');

const todoSchema = Schema({
    title: { type: String, required: true},
    desc: { type: String},
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }
},
    { timestamps: true }

)

module.exports = model('todo', todoSchema);