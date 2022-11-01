let mongoose = require('mongoose');

let patientModel =  mongoose.Schema({
    name: String,
    address: String,
    birthdate: String,
    gender: String,
    phone: String,
    photo: String
},{
    collection: "patients"
});

module.exports = mongoose.model('Patient', patientModel);