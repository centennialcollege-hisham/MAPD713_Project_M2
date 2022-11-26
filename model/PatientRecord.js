let mongoose = require('mongoose');

let patientModel =  mongoose.Schema({
    title: String,
});

module.exports = mongoose.model('tests', patientModel);