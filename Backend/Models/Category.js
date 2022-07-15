const { Schema, model } = require('mongoose');

const categorySchema = Schema({
    title: { type: String, require: true },
    desc: { type: String},
},
    { timestamps: true }
);

module.exports = model('category', categorySchema);